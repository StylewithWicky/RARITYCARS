from typing import Optional, List, TYPE_CHECKING
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from .Vehicle import VehicleRead


if TYPE_CHECKING:
    from .Vehicle import Vehicle
    from .Route import Route


class BookingBase(SQLModel):
    customer_name: str
    start_date: str
    end_date: str
    total_price: Optional[float] = 0.0
    vehicle_id: int = Field(foreign_key="vehicle.id")
    route_id: Optional[int] = Field(default=None, foreign_key="route.id")
    status: str = Field(default="pending")  # pending, confirmed, completed, cancelled
    pickup_location: str  
    dropoff_location: str
    include_chauffeur: bool = False
class BookingCreate(BookingBase):
    pass 


class BookingRead(BookingBase):
    id: int
class BookingReadWithVehicle(BookingRead):
    vehicle: Optional["VehicleRead"] = None

class Booking(BookingBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    vehicle: "Vehicle" = Relationship(back_populates="bookings")
    route: Optional["Route"] = Relationship(back_populates="bookings")