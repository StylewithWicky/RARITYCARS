from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, and_
from app.database.database import get_session
from app.models.Booking import Booking, BookingCreate, BookingRead
from app.models.Vehicle import Vehicle
from datetime import timedelta
from typing import List

router = APIRouter( tags=["Bookings"])

@router.post("/", response_model=BookingRead, status_code=status.HTTP_201_CREATED)
def create_booking(
    booking_in: BookingCreate, 
    session: Session = Depends(get_session),
    ignore_buffer: bool = Query(False, description="Admin override")
):
    vehicle = session.get(Vehicle, booking_in.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    
    buffer_days = timedelta(days=0 if ignore_buffer else 1)
    overlap_query = select(Booking).where(
        and_(
            Booking.vehicle_id == booking_in.vehicle_id,
            Booking.status != "cancelled",
            Booking.start_date < (booking_in.end_date + buffer_days),
            Booking.end_date > (booking_in.start_date - buffer_days)
        )
    )
    
    if session.exec(overlap_query).first():
        raise HTTPException(status_code=400, detail="Vehicle is unavailable for these dates.")

  
    duration = max((booking_in.end_date - booking_in.start_date).days, 1)
    discount = 0.20 if duration >= 30 else (0.10 if duration >= 7 else 0.0)
    total_price = (duration * vehicle.daily_rate) * (1 - discount)

    db_booking = Booking.model_validate(booking_in)
    db_booking.total_price = total_price
    db_booking.status = "pending"

    session.add(db_booking)
    session.commit()
    session.refresh(db_booking)
    return db_booking

@router.get("/", response_model=List[dict])
def read_all_bookings(session: Session = Depends(get_session)):
    
    statement = select(Booking, Vehicle).join(Vehicle, Booking.vehicle_id == Vehicle.id)
    results = session.exec(statement).all()
    
    enriched = []
    for booking, vehicle in results:
        data = booking.model_dump()
        data["vehicle_brand"] = vehicle.brand
        data["vehicle_model"] = vehicle.model
        enriched.append(data)
    return enriched

@router.patch("/{booking_id}/status", response_model=BookingRead)
def update_booking_status(
    booking_id: int, 
    new_status: str, 
    reason: str = Query(None), 
    session: Session = Depends(get_session)
):
    db_booking = session.get(Booking, booking_id)
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    db_booking.status = new_status.lower()
    
    session.add(db_booking)
    session.commit()
    session.refresh(db_booking)
    return db_booking