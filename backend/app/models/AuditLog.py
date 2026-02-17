from sqlmodel import SQLModel,Field
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class AuditLog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    action: str  
    user: str    
    target: str  
    details: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class AuditLogRead(BaseModel):
    id: int
    action: str
    user: str
    target: str
    details: str
    timestamp: datetime

    class Config:
        from_attributes = True