from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
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
        raise HTTPException(status_code=404, detail="Car not found")

   
    try:
       
        date_format = "%Y-%m-%d"
        start = datetime.strptime(booking_in.start_date, date_format)
        end = datetime.strptime(booking_in.end_date, date_format)
    except ValueError:
        raise HTTPException(
            status_code=400, 
            detail="Date format should be YYYY-MM-DD"
        )

    
    duration = (end - start).days
    
    
    if duration <= 0:
      duration = 1
    calculated_total = duration * vehicle.daily_rate
    db_booking = Booking.model_validate(booking_in)
    db_booking.total_price = calculated_total
    db_booking.status = "pending"  

    session.add(db_booking)
    session.commit()
    session.refresh(db_booking)
    return db_booking

@router.get("/", response_model=List[BookingRead])
def read_all_bookings(session: Session = Depends(get_session)):
    """Inarudisha orodha ya bookings zote."""
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