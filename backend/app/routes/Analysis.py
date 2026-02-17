from fastapi import APIRouter
from sqlmodel import Session, select, func, extract, desc, cast, Date
from app.database.database import engine 
from app.models.Vehicle import Vehicle
from app.models.Booking import Booking
from app.models.Analysis import AnalyticsResponse
from datetime import date

router = APIRouter( tags=["Analytics"])

@router.get("/real-time", response_model=AnalyticsResponse)
def get_fleet_analytics():
    with Session(engine) as session:
        today = date.today()

        total_rev = session.exec(select(func.sum(Booking.total_price))).first() or 0
        
        active_count = session.exec(
            select(func.count(Booking.id)).where(
                cast(Booking.start_date, Date) <= today,
                cast(Booking.end_date, Date) >= today
            )
        ).first() or 0
        
        total_v = session.exec(select(func.count(Vehicle.id))).first() or 1
        util_rate = round((active_count / total_v) * 100, 1)

        
        rank_query = (
            select(
                Vehicle.brand, Vehicle.model,
                func.count(Booking.id).label("booking_count"),
                func.sum(Booking.total_price).label("total_revenue")
            )
            .join(Booking, Booking.vehicle_id == Vehicle.id, isouter=True)
            .group_by(Vehicle.id)
            .order_by(desc("booking_count"))
        )
        rank_results = session.exec(rank_query).all()
        
        ranking_list = [{
            "name": f"{r.brand} {r.model}",
            "booking_count": r.booking_count,
            "total_revenue": float(r.total_revenue or 0),
            "utilization": round((r.booking_count / 30) * 100, 1)
        } for r in rank_results]

       
        monthly_stats = session.exec(
            select(
                extract('month', cast(Booking.start_date, Date)).label("month_num"),
                func.sum(Booking.total_price).label("revenue")
            )
            .group_by("month_num")
            .order_by("month_num")
        ).all()

        months_map = {1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 
                      7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"}

        formatted_chart = [
            {"month": months_map.get(int(m.month_num)), "revenue": float(m.revenue or 0)} 
            for m in monthly_stats if m.month_num
        ]

        
        top_car = max(ranking_list, key=lambda x: x['total_revenue']) if ranking_list else None

        return {
            "total_revenue_overall": float(total_rev),
            "active_rentals_count": int(active_count),
            "fleet_utilization": util_rate,  
            "top_earner_name": top_car['name'] if top_car else "None",
            "top_earner_revenue": top_car['total_revenue'] if top_car else 0,
            "peak_month": max(formatted_chart, key=lambda x: x['revenue'])['month'] if formatted_chart else "N/A",
            "chart_data": formatted_chart,
            "ranking_list": ranking_list
        }