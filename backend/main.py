from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.models import Vehicle
from app.database.database import create_db_and_tables, get_session
from sqlmodel import Session, select
from app.models.Vehicle import Vehicle
from app.routes import Vehicle as vehicle_module
from app.routes import Booking as booking_module
from app.routes import Route as route_module


app = FastAPI(title="Rarity Cars API")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {
        "status": "active",
        "system": "Rarity Cars Backend",
        "environment": "development"
    }
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def root():
    return {"message": "Rarity Cars API is running with Modular Routes!"}

app.include_router(vehicle_module.router)
app.include_router(booking_module.router)
app.include_router(route_module.router)