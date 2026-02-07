from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .Booking import Booking

class RouteBase(SQLModel):
    name: str = Field(index=True)  
    distance_km: float
    description: Optional[str] = None
    base_price: float = 0.0  

class Route(RouteBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    
    bookings: List["Booking"] = Relationship(back_populates="route")

class RouteCreate(RouteBase):
    pass

class RouteRead(RouteBase):
    id: int