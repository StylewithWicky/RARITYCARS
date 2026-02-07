import os
from sqlmodel import create_engine, SQLModel, Session
from dotenv import load_dotenv,find_dotenv
from app.models import Booking, Vehicle, Route  

load_dotenv(find_dotenv())


DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session