from datetime import datetime
from pydantic import BaseModel, ConfigDict
from typing import Optional, Generic, TypeVar, List

T = TypeVar("T")


class LocationBase(BaseModel):
    name: str
    zipcode: Optional[str] = None
    address: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


class LocationCreate(LocationBase):
    pass


class Location(LocationBase):
    location_id: int
    created_at: datetime
    modified_at: Optional[datetime] = None


class PaginatedResponse(BaseModel, Generic[T]):
    total: int
    limit: int
    offset: int
    items: List[T]
