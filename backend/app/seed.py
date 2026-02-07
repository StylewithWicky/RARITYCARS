from sqlmodel import Session
from app.database.database import engine
from app.models.Vehicle import Vehicle
def seed_data():
    cars = [
        Vehicle(
            brand="Porsche", 
            model="911 GT3 RS", 
            year=2024, 
            category="Sport", 
            daily_rate=950.0, 
            image_url="https://example.com/gt3.jpg"
        ),
        Vehicle(
            brand="Lamborghini", 
            model="Huracán Sterrato", 
            year=2023, 
            category="Supercar", 
            daily_rate=1200.0, 
            image_url="https://example.com/sterrato.jpg"
        ),
        Vehicle(
            brand="Rolls-Royce", 
            model="Spectre", 
            year=2024, 
            category="Luxury", 
            daily_rate=2500.0, 
            image_url="https://example.com/spectre.jpg"
        )
    ]

    with Session(engine) as session:
        print("Adding luxury fleet...")
        for car in cars:
            session.add(car)
        session.commit()
        print("Successfully seeded raritycars_db! 🏎️💨")

if __name__ == "__main__":
    seed_data()