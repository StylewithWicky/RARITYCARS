from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlmodel import Session, select, func
from app.database.database import get_session
from app.database.database import engine
from app.models.Vehicle import Vehicle, VehicleCreate, VehicleRead  
from typing import List
import re

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




@router.post("/", response_model=VehicleRead, status_code=201)
def create_vehicle(vehicle_data: VehicleCreate, session: Session = Depends(get_session)):
    db_vehicle = Vehicle.model_validate(vehicle_data)
    
    
    base_slug = f"{db_vehicle.brand}-{db_vehicle.model}".lower().strip()
    
    clean_slug = re.sub(r'[^a-z0-9]+', '-', base_slug)
    
   
    db_vehicle.slug = clean_slug

    session.add(db_vehicle)
    session.commit()
    session.refresh(db_vehicle)
    return db_vehicle