import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from app.database.database import create_db_and_tables, get_session, engine
from app.models.Vehicle import Vehicle
from app.models.User import User 
from app.routes.User import hash_password
from app.routes import (
    Vehicle as vehicle_module,
    Booking as booking_module,
    Route as route_module,
    Analysis as analysis_module,
    Revenue as revenue_module,
    User as auth_module ,
    Inquiry as inquiry_model
    )

@asynccontextmanager
async def lifespan(app: FastAPI):
    
    create_db_and_tables()
    
    
    with Session(engine) as session:
        #
        env_username = os.getenv("ADMIN_USERNAME")
        env_password = os.getenv("ADMIN_PASSWORD")
        env_full_name = os.getenv("ADMIN_FULL_NAME")
        statement = select(User).where(User.username == env_username)
        admin_exists = session.exec(statement).first()
        
        if not admin_exists:
            new_admin = User(
                username=env_username,
                hashed_password=hash_password(env_password),
                full_name=env_full_name,
                role="admin",
                is_active=True
            )
            session.add(new_admin)
            session.commit()
            print("🛡️ Security: Mkuru admin verified/created.")
    
    yield
   

app = FastAPI(title="Rarity Cars API", lifespan=lifespan)


origins = ["http://localhost:5173"]
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

@app.get("/")
def root():
    return {"message": "Rarity Cars API is running with Modular Routes!"}




app.include_router(vehicle_module.router, prefix="/api/vehicles", tags=["Vehicles"])
app.include_router(booking_module.router, prefix="/api/bookings", tags=["Bookings"])
app.include_router(route_module.router, prefix="/api/routes", tags=["Routes"])
app.include_router(analysis_module.router, prefix="/api/mkuru/analytics", tags=["Analysis"])
app.include_router(revenue_module.router, prefix="/api/revenue", tags=["Revenue"])
app.include_router(auth_module.router, prefix="/api/users", tags=["Authentication"])
app.include_router(inquiry_model.router,prefix="/api/mkuru/inquiry",tags=["Inquiry"])