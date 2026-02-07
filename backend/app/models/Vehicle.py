from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .Booking import Booking


class VehicleBase(SQLModel):
    brand: str
    model: str
    year: int
    category: str  
    daily_rate: float
    image_url: str
    slug: str


class Vehicle(VehicleBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
   
    bookings: List["Booking"] = Relationship(back_populates="vehicle")

class VehicleCreate(VehicleBase):
    pass


class VehicleRead(VehicleBase):
    id: int