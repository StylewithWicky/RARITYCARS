from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
if TYPE_CHECKING:
    from .Vehicle import Vehicle
    from .Route import Route
  
class Booking(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_name: str
    start_date: str
    end_date: str
    total_price: float
    
    vehicle_id: int = Field(foreign_key="vehicle.id")
    vehicle: Vehicle = Relationship(back_populates="bookings")
    
    route_id: Optional[int] = Field(default=None, foreign_key="route.id")
    route:Route=Relationship(back_populates="bookings")