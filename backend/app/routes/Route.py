from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database.database import get_session
from app.models.Route import Route, RouteCreate, RouteRead
from typing import List

router = APIRouter(prefix="/routes", tags=["Routes"])

@router.post("/", response_model=RouteRead, status_code=status.HTTP_201_CREATED)
def create_route(route_in: RouteCreate, session: Session = Depends(get_session)):
    db_route = Route.model_validate(route_in)
    session.add(db_route)
    session.commit()
    session.refresh(db_route)
    return db_route

@router.get("/", response_model=List[RouteRead])
def read_all_routes(session: Session = Depends(get_session)):
    return session.exec(select(Route)).all()

@router.get("/{route_id}", response_model=RouteRead)
def read_single_route(route_id: int, session: Session = Depends(get_session)):
    db_route = session.get(Route, route_id)
    if not db_route:
        raise HTTPException(status_code=404, detail="Route not found")
    return db_route

@router.delete("/{route_id}")
def delete_route(route_id: int, session: Session = Depends(get_session)):
    db_route = session.get(Route, route_id)
    if not db_route:
        raise HTTPException(status_code=404, detail="Route not found")
    session.delete(db_route)
    session.commit()
    return {"message": "Route has been deleted successfully."}