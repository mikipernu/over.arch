import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base
from app.crud import create_location, get_locations, get_location_by_id, update_location, delete_location
from app.schemas import LocationCreate

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


def test_create_location(db_session):
    """
    Test that a location can be created with all of its attributes.
    """
    location_create = LocationCreate(name="Location #1", zipcode="15100", address="Kuusela")
    location = create_location(db_session, location_create)
    assert location.name == "Location #1"

def test_get_locations(db_session):
    """
    Test that all locations can be fetched from the db.
    """
    total, locations = get_locations(db_session)
    assert total > 0
    assert len(locations) > 0
    assert locations[0].name == "Location #1"

def test_get_location_by_id(db_session):
    """
    Test that a specific location can be fetched from the db with its id.
    """
    location_create = LocationCreate(name="Location #1", address="Kuusela")
    new_location = create_location(db_session, location_create)

    location = get_location_by_id(db_session, new_location.location_id)
    assert location.name == "Location #1"

def test_update_location(db_session):
    """
    Test that a specific location can be updated from the db with its id.
    """
    location_create =  LocationCreate(name="Location #1", address="Kuusela")
    new_location = create_location(db_session, location_create)

    updated_data = LocationCreate(name="Kuuselankoski")
    updated_location = update_location(db_session, new_location.location_id, updated_data)
    assert updated_location.name == "Kuuselankoski"

def test_delete_location(db_session):
    """
    Test that a specific location can be deleted from the db with its id.
    """
    location_create = LocationCreate(name="Location #1", address="Kuusela")
    new_location = create_location(db_session, location_create)

    deleted_location = delete_location(db_session, new_location.location_id)
    assert deleted_location is not None

    location = get_location_by_id(db_session, new_location.location_id)
    assert location is None