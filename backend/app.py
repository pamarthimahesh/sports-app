from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User, Playground, Booking
from datetime import datetime, timedelta

app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Playground Smart Booking API running"}

# Get all users
@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# Get all playgrounds
@app.get("/playgrounds")
def get_playgrounds(db: Session = Depends(get_db)):
    return db.query(Playground).all()

# Get all bookings
@app.get("/bookings")
def get_bookings(db: Session = Depends(get_db)):
    return db.query(Booking).all()

# Create a booking
@app.post("/bookings")
def create_booking(user_id: int, playground_id: int, db: Session = Depends(get_db)):
    booking = Booking(
        user_id=user_id,
        playground_id=playground_id,
        start_time=datetime.now(),
        end_time=datetime.now() + timedelta(hours=2)
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking
