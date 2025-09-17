from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import SessionLocal, engine, Base
from models import Playground, Slot, Booking
from pydantic import BaseModel

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Schemas
class SlotSchema(BaseModel):
    id: int
    time: str
    booked: bool
    class Config:
        orm_mode = True

class BookingRequest(BaseModel):
    playground_id: int
    slot_id: int
    user_email: str

# Routes
@app.get("/playgrounds")
def get_playgrounds(db: Session = Depends(get_db)):
    return db.query(Playground).all()

@app.get("/playgrounds/{playground_id}/slots", response_model=List[SlotSchema])
def get_slots(playground_id: int, db: Session = Depends(get_db)):
    return db.query(Slot).filter(Slot.playground_id == playground_id).all()

@app.post("/book-slot")
def book_slot(booking: BookingRequest, db: Session = Depends(get_db)):
    slot = db.query(Slot).filter(Slot.id == booking.slot_id, Slot.playground_id == booking.playground_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    if slot.booked:
        raise HTTPException(status_code=400, detail="Slot already booked")
    slot.booked = True
    new_booking = Booking(playground_id=booking.playground_id, slot_id=booking.slot_id, user_email=booking.user_email)
    db.add(new_booking)
    db.commit()
    return {"message": "Slot booked successfully"}
