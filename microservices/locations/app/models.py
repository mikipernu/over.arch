from sqlalchemy import Column, DateTime, func, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Location(Base):
    __tablename__ = "locations"

    location_id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False, default=func.now())
    modified_at = Column(
        DateTime, nullable=False, default=func.now(), onupdate=func.now()
    )
    name = Column(String(255), nullable=False)
    zipcode = Column(String(20))
    address = Column(String(255))
