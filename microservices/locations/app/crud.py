"""CRUD operations"""

from sqlalchemy.orm import Session
from . import models, schemas


def create_location(db: Session, location: schemas.LocationCreate):
    """ "
    Creates a location and inserts it to the db.
    """
    db_location = models.Location(**location.model_dump())
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location


def get_locations(db: Session, offset: int = 0, limit: int = 10):
    """ "
    Fetches all locations from db.
    """
    total = db.query(models.Location).count()
    locations = (
        db.query(models.Location)
        .order_by(models.Location.location_id)
        .offset(offset)
        .limit(limit)
        .all()
    )
    return total, locations


def get_location_by_id(db: Session, location_id: int):
    """ "
    Fetches a single location from db by id.
    """
    return (
        db.query(models.Location)
        .filter(models.Location.location_id == location_id)
        .first()
    )


def update_location(
    db: Session, location_id: int, location_data: schemas.LocationCreate
):
    """ "
    Updates a single location in db by id if it exists.
    """
    db_location = (
        db.query(models.Location)
        .filter(models.Location.location_id == location_id)
        .first()
    )
    if db_location:
        update_data = location_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_location, key, value)
        db.add(db_location)
        db.commit()
        db.refresh(db_location)
    return db_location


def delete_location(db: Session, location_id: int):
    """ "
    Deletes a single location from db by id if it exists.
    """
    db_location = (
        db.query(models.Location)
        .filter(models.Location.location_id == location_id)
        .first()
    )
    if db_location:
        db.delete(db_location)
        db.commit()
        return db_location
    return None
