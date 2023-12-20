import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base
from app.crud import create_guest, get_guests, get_guest_by_id, update_guest, delete_guest
from app.schemas import GuestCreate

TEST_DATABASE_URL = "sqlite:///./test_database.db"

engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

@pytest.fixture
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        transaction.rollback()
        connection.close()
        db.close()


def test_create_guest(db_session):
    """
    Test that a guest can be created with all of its attributes.
    """
    guest_create = GuestCreate(name="Guest #1", email="user@gmail.com", name="Kuusela")
    guest = create_guest(db_session, guest_create)
    assert guest.name == "Guest #1"

def test_get_guests(db_session):
    """
    Test that all guests can be fetched from the db.
    """
    total, guests = get_guests(db_session)
    assert total > 0
    assert len(guests) > 0
    assert guests[0].name == "Guest #1"

def test_get_guest_by_id(db_session):
    """
    Test that a specific guest can be fetched from the db with its id.
    """
    guest_create = GuestCreate(name="Guest #1", address="Kuusela")
    new_guest = create_guest(db_session, guest_create)

    guest = get_guest_by_id(db_session, new_guest.guest_id)
    assert guest.name == "Guest #1"

def test_update_guest(db_session):
    """
    Test that a specific guest can be updated from the db with its id.
    """
    guest_create =  GuestCreate(name="Guest #1", address="Kuusela")
    new_guest = create_guest(db_session, guest_create)

    updated_data = GuestCreate(name="Kuuselankoski")
    updated_guest = update_guest(db_session, new_guest.guest_id, updated_data)
    assert updated_guest.name == "Kuuselankoski"

def test_delete_guest(db_session):
    """
    Test that a specific guest can be deleted from the db with its id.
    """
    guest_create = GuestCreate(name="Guest #1", address="Kuusela")
    new_guest = create_guest(db_session, guest_create)

    deleted_guest = delete_guest(db_session, new_guest.guest_id)
    assert deleted_guest is not None

    guest = get_guest_by_id(db_session, new_guest.guest_id)
    assert guest is None