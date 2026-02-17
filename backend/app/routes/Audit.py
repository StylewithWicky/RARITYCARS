from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select, desc
from app.database.database import get_session
from app.models.AuditLog import AuditLog, AuditLogRead
from typing import List

router = APIRouter(prefix="/mkuru/audit", tags=["Security"])

@router.get("/logs", response_model=List[AuditLogRead])
def get_audit_logs(
    offset: int = 0,
    limit: int = Query(default=100, lte=100),
    session: Session = Depends(get_session)
):
    
    statement = select(AuditLog).order_by(desc(AuditLog.timestamp)).offset(offset).limit(limit)
    results = session.exec(statement).all()
    return results