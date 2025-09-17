from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Playground(Base):
    __tablename__ = "playgrounds"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    location = Column(String(100))
    sport = Column(String(50))
    slots = relationship("Slot", back_populates="playground")

class Slot(Base):
    __tablename__ = "slots"
    id = Column(Integer, primary_key=True, index=True)
    time = Column(String(50))
    booked = Column(Boolean, default=False)
    playground_id = Column(Integer, ForeignKey("playgrounds.id"))
    playground = relationship("Playground", back_populates="slots")

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    playground_id = Column(Integer, ForeignKey("playgrounds.id"))
    slot_id = Column(Integer, ForeignKey("slots.id"))
    user_email = Column(String(100))  # Or user ID if implemented
