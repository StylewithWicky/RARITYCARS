from sqlmodel import SQLModel, Field
from typing import Optional
from pydantic import BaseModel

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hashed_password: str
    full_name: Optional[str] = None
    role: str = Field(default="customer") 
    is_active: bool = Field(default=True)
    
class LoginRequest(BaseModel):
    username: str
    password: str