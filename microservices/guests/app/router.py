from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .schemas import GuestCreate, Guest, PaginatedResponse
from .crud import (
    get_guests,
    get_guest_by_id,
    create_guest,
    update_guest,
    delete_guest,
)
from .auth import get_current_user
from .db_engine import get_db

# router = APIRouter(prefix="/guests-api")
router = APIRouter(prefix="")


@router.post("/guests/", response_model=Guest)
def create_guest_endpoint(
    guest: GuestCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    return create_guest(db, guest)


@router.get("/guests/", response_model=PaginatedResponse[Guest])
def read_guests_endpoint(
    offset: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    total, guests = get_guests(db, offset=offset, limit=limit)
    return {"total": total, "items": guests, "offset": offset, "limit": limit}


@router.get("/guests/{guest_id}", response_model=Guest)
def read_guest_endpoint(
    guest_id: int, db: Session = Depends(get_db), _: dict = Depends(get_current_user)
):
    guest = get_guest_by_id(db, guest_id)
    if guest is None:
        raise HTTPException(status_code=404, detail="Guest not found")
    return guest


@router.put("/guests/{guest_id}", response_model=Guest)
def update_guest_endpoint(
    guest_id: int,
    guest_data: GuestCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_user),
):
    guest = update_guest(db, guest_id, guest_data)
    if guest is None:
        raise HTTPException(status_code=404, detail="Guest not found")
    return guest


@router.delete("/guests/{guest_id}")
def delete_guest_endpoint(
    guest_id: int, db: Session = Depends(get_db), _: dict = Depends(get_current_user)
):
    guest = delete_guest(db, guest_id)
    if guest is None:
        raise HTTPException(status_code=404, detail="Guest not found")
    return {"message": "Guest deleted successfully"}
