from sqlmodel import SQLModel
from typing import List, Optional, Dict
from datetime import date

class CarRank(SQLModel):
    name: str
    booking_count: int
    total_revenue: float
    utilization: float

class ChartPoint(SQLModel):
    month: str
    revenue: float

class CalendarEvent(SQLModel):
    start_date: date
    end_date: date
    status: str
    client_name: Optional[str] = None

class AnalyticsResponse(SQLModel):
    top_earner_name: str
    top_earner_revenue: float
    peak_month: str
    fleet_utilization: float
    chart_data: List[ChartPoint]
    ranking_list: List[CarRank]  