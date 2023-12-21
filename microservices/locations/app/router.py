from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .schemas import LocationCreate, Location, PaginatedResponse
from .crud import (
    get_locations,
    get_location_by_id,
    create_location,
    update_location,
    delete_location,
)
from .auth import get_current_user
from .db_engine import get_db

# router = APIRouter(prefix="/locations-api")
router = APIRouter(prefix="")


@router.post("/locations/", response_model=Location)
def create_location_endpoint(
    location: LocationCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    return create_location(db, location)


@router.get("/locations/", response_model=PaginatedResponse[Location])
def read_locations_endpoint(
    offset: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    total, locations = get_locations(db, offset=offset, limit=limit)
    return {"total": total, "items": locations, "offset": offset, "limit": limit}


@router.get("/locations/{location_id}", response_model=Location)
def read_location_endpoint(
    location_id: int, db: Session = Depends(get_db), _: dict = Depends(get_current_user)
):
    location = get_location_by_id(db, location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return location


@router.put("/locations/{location_id}", response_model=Location)
def update_location_endpoint(
    location_id: int,
    location_data: LocationCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    location = update_location(db, location_id, location_data)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return location


@router.delete("/locations/{location_id}")
def delete_location_endpoint(
    location_id: int, db: Session = Depends(get_db), _: dict = Depends(get_current_user)
):
    location = delete_location(db, location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return {"message": "Location deleted successfully"}
