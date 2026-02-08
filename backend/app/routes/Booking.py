from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, and_
from app.database.database import get_session
from app.models.Booking import Booking, BookingCreate, BookingRead
from app.models.Vehicle import Vehicle
from datetime import datetime
from typing import List
import re

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.post("/", response_model=BookingRead, status_code=status.HTTP_201_CREATED)
def create_booking(booking_in: BookingCreate, session: Session = Depends(get_session)):
    
    vehicle = session.get(Vehicle, booking_in.vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

   
    overlap_query = select(Booking).where(
        and_(
            Booking.vehicle_id == booking_in.vehicle_id,
            Booking.start_date < booking_in.end_date,
            Booking.end_date > booking_in.start_date,
            Booking.status != "cancelled"
        )
    )
    existing_overlap = session.exec(overlap_query).first()
    if existing_overlap:
        raise HTTPException(
            status_code=400, 
            detail="This vehicle is already reserved for the selected dates."
        )

    
    duration = (booking_in.end_date - booking_in.start_date).days
    if duration <= 0:
        duration = 1 

   
    base_rate = vehicle.daily_rate
    if duration >= 30:
        discount = 0.20  
    elif duration >= 7:
        discount = 0.10  
    else:
        discount = 0.0

    total_price = (duration * base_rate) * (1 - discount)

   
    db_booking = Booking.model_validate(booking_in)
    db_booking.total_price = total_price
    db_booking.status = "pending"

    
    session.add(db_booking)
    session.commit()
    session.refresh(db_booking)
    return db_booking

@router.get("/", response_model=List[BookingRead])
def read_all_bookings(session: Session = Depends(get_session)):
    """Inarudisha list ya bookings zote."""
    return session.exec(select(Booking)).all()

@router.get("/{booking_id}", response_model=BookingRead)
def read_booking(booking_id: int, session: Session = Depends(get_session)):
    
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.patch("/{booking_id}/status", response_model=BookingRead)
def update_booking_status(booking_id: int, new_status: str, session: Session = Depends(get_session)):
    
    db_booking = session.get(Booking, booking_id)
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    db_booking.status = new_status
    session.add(db_booking)
    session.commit()
    session.refresh(db_booking)
    return db_booking