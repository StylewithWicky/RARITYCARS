from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlmodel import Session, select, func
from app.database.database import get_session
from app.database.database import engine
from app.models.Vehicle import Vehicle, VehicleCreate, VehicleRead  
from typing import List

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"]
)

@router.get("/", response_model=List[Vehicle])
def read_vehicles(session: Session = Depends(get_session)):
    return session.exec(select(Vehicle)).all()

@router.get("/{slug}")
def get_vehicle_by_slug(slug: str, session: Session = Depends(get_session)):
    statement = select(Vehicle).where(func.lower(Vehicle.slug) == slug.lower())
    vehicle = session.exec(statement).first()
    if not vehicle and slug.isdigit():
        vehicle = session.get(Vehicle, int(slug))

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle




@router.get("/{vehicle_id}", response_model=Vehicle)
def read_vehicle(vehicle_id: int, session: Session = Depends(get_session)):
    vehicle = session.get(Vehicle, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle