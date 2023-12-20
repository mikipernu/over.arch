"""CRUD operations"""

from sqlalchemy.orm import Session
from . import models, schemas


def create_guest(db: Session, guest: schemas.GuestCreate):
    """ "
    Creates a guest and inserts it to the db.
    """
    db_guest = models.Guest(**guest.model_dump())
    db.add(db_guest)
    db.commit()
    db.refresh(db_guest)
    return db_guest


def get_guests(db: Session, offset: int = 0, limit: int = 10):
    """ "
    Fetches all guests from db.
    """
    total = db.query(models.Guest).count()
    guests = (
        db.query(models.Guest)
        .order_by(models.Guest.guest_id)
        .offset(offset)
        .limit(limit)
        .all()
    )
    return total, guests


def get_guest_by_id(db: Session, guest_id: int):
    """ "
    Fetches a single guest from db by id.
    """
    return (
        db.query(models.Guest)
        .filter(models.Guest.guest_id == guest_id)
        .first()
    )


def update_guest(
    db: Session, guest_id: int, guest_data: schemas.GuestCreate
):
    """ "
    Updates a single guest in db by id if it exists.
    """
    db_guest = (
        db.query(models.Guest)
        .filter(models.Guest.guest_id == guest_id)
        .first()
    )
    if db_guest:
        update_data = guest_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_guest, key, value)
        db.add(db_guest)
        db.commit()
        db.refresh(db_guest)
    return db_guest


def delete_guest(db: Session, guest_id: int):
    """ "
    Deletes a single guest from db by id if it exists.
    """
    db_guest = (
        db.query(models.Guest)
        .filter(models.Guest.guest_id == guest_id)
        .first()
    )
    if db_guest:
        db.delete(db_guest)
        db.commit()
        return db_guest
    return None
