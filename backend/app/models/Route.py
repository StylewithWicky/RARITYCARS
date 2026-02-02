from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from .Booking import Booking
  
class Route(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str  
    start_location: str
    end_location: str
    distance_km: int
    bookings: List["Booking"] = Relationship(back_populates="route")