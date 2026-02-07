from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database.database import engine
from app.models.Vehicle import Vehicle
from typing import List

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"]
)

def get_session():
    with Session(engine) as session:
        yield session

@router.get("/vehicles/{slug}")
def get_vehicle_by_slug(slug: str, session: Session = Depends(get_session)):
    statement = select(Vehicle).where(Vehicle.slug == slug)
    vehicle = session.exec(statement).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.get("/", response_model=List[Vehicle])
def read_vehicles(session: Session = Depends(get_session)):
    return session.exec(select(Vehicle)).all()

@router.get("/{vehicle_id}", response_model=Vehicle)
def read_vehicle(vehicle_id: int, session: Session = Depends(get_session)):
    vehicle = session.get(Vehicle, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.post("/", response_model=Vehicle, status_code=status.HTTP_201_CREATED)
def create_vehicle(vehicle: Vehicle, session: Session = Depends(get_session)):
    session.add(vehicle)
    session.commit()
    session.refresh(vehicle)
    return vehicle