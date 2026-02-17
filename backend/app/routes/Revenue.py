from fastapi import APIRouter, Depends
from datetime import datetime, timedelta
from app.models.Revenue import RevenueSummary

router = APIRouter()

@router.get("/mkuru/revenue-report", response_model=RevenueSummary)
async def get_revenue_report():
   
    
   
    mock_db_data = [
        {"period": "Oct", "amount": 420000},
        {"period": "Nov", "amount": 380000},
        {"period": "Dec", "amount": 650000},
        {"period": "Jan", "amount": 510000},
    ]
    
    total = sum(item["amount"] for item in mock_db_data)
    

    current_month = mock_db_data[-1]["amount"]
    previous_month = mock_db_data[-2]["amount"]
    growth = ((current_month - previous_month) / previous_month) * 100

    return {
        "total_revenue": total,
        "growth_rate": round(growth, 2),
        "chart_data": mock_db_data
    }