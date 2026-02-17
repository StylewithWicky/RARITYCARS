import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlmodel import Session, select, func
from app.database.database import get_session
from app.models.Vehicle import Vehicle, VehicleRead  
import os
from typing import List
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

cloudinary.config( 
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
    api_key = os.getenv("CLOUDINARY_API_KEY"), 
    api_secret = os.getenv("CLOUDINARY_API_SECRET"),
    secure = True
)

router = APIRouter(tags=["Vehicles"])

@router.get("/", response_model=List[Vehicle])
def read_vehicles(session: Session = Depends(get_session)):
    return session.exec(select(Vehicle)).all()

@router.get("/{slug}")
def get_vehicle_by_slug(slug: str, session: Session = Depends(get_session)):
    statement = select(Vehicle).where(func.lower(Vehicle.slug) == slug.lower())
    vehicle = session.exec(statement).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.post("/upload")
async def create_vehicle(
    brand: str = Form(...),
    model: str = Form(...),
    year: int = Form(...),
    daily_rate: float = Form(...),
    category: str = Form(...),
    file: UploadFile = File(...),
    session: Session = Depends(get_session)
):
    upload_result = cloudinary.uploader.upload(
        file.file, 
        folder="rarity_fleet"
    )
    
    image_url = upload_result.get("secure_url")

   
    generated_slug = f"{brand}-{model}-{year}".lower().replace(" ", "-")
  
    db_vehicle = Vehicle(
        brand=brand,
        model=model,
        year=year,
        category=category,
        daily_rate=daily_rate,
        image_url=image_url,
        slug=generated_slug
    )
    session.add(db_vehicle)
    session.commit()
    session.refresh(db_vehicle)
    return db_vehicle


@router.put("/{slug}")
def update_vehicle(slug: str, updated_data: dict, session: Session = Depends(get_session)):
    db_vehicle = session.exec(select(Vehicle).where(Vehicle.slug == slug)).first()
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    for key, value in updated_data.items():
        if hasattr(db_vehicle, key):
            setattr(db_vehicle, key, value)
    
    session.add(db_vehicle)
    session.commit()
    session.refresh(db_vehicle)
    return db_vehicle


@router.delete("/{slug}")
def delete_vehicle(slug: str, session: Session = Depends(get_session)):
    db_vehicle = session.exec(select(Vehicle).where(Vehicle.slug == slug)).first()
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
        
    session.delete(db_vehicle)
    session.commit()
    return {"message": f"Vehicle {slug} removed"}