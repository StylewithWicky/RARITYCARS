from sqlmodel import Session
from app.models.AuditLog import AuditLog
from datetime import datetime

def log_action(session: Session, action: str, user: str, target: str, details: str):
 
    try:
        new_log = AuditLog(
            action=action.upper(),
            user=user,
            target=target,
            details=details,
            timestamp=datetime.utcnow()
        )
        session.add(new_log)
        session.commit()
       
    except Exception as e:
        
        print(f"CRITICAL: Failed to write audit log: {e}")
        session.rollback()