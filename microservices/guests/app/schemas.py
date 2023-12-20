from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional, Generic, TypeVar, List

T = TypeVar("T")


class GuestBase(BaseModel):
    email: str
    name: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


class GuestCreate(GuestBase):
    pass


class Guest(GuestBase):
    guest_id: int
    created_at: datetime
    modified_at: datetime


class PaginatedResponse(BaseModel, Generic[T]):
    total: int
    limit: int
    offset: int
    items: List[T]
