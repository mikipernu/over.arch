from sqlalchemy import Column, DateTime, func, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Guest(Base):
    __tablename__ = "guests"

    guest_id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, nullable=False, default=func.now())
    modified_at = Column(
        DateTime, nullable=False, default=func.now(), onupdate=func.now()
    )
    email = Column(String(255), nullable=False)
    name = Column(String(255), nullable=True)
    person_id = Column(Integer, nullable=True,)
    visitation_location_id = Column(Integer)
