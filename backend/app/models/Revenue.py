from pydantic import BaseModel
from typing import List, Optional


class RevenuePoint(BaseModel):
    month: str
    revenue: float


class RevenueSummary(BaseModel):
    total_cars: int
    available_now: int
    active_bookings: int
    total_revenue_kes: float
    revenue_history: List[RevenuePoint]
    top_performing_category: str