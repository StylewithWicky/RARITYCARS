from fastapi import APIRouter, Depends
from sqlmodel import Session,select, SQLModel, Field
from app.database.database import get_session
from datetime import datetime
from typing import List

class Inquiry(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str
    type: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

router = APIRouter( tags=["Inquiries"])

@router.post("")
def create_inquiry(inquiry: Inquiry, session: Session = Depends(get_session)):
    session.add(inquiry)
    session.commit()
    session.refresh(inquiry)
    return {"status": "success", "data": inquiry}


@router.get("/all", response_model=List[Inquiry])
def get_all_inquiries(session: Session = Depends(get_session)):
    statement = select(Inquiry).order_by(Inquiry.created_at.desc())
    return session.exec(statement).all()