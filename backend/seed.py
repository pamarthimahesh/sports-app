from sqlalchemy.orm import Session
from database import SessionLocal, Base, engine
from models import Playground, Slot

Base.metadata.create_all(bind=engine)
db: Session = SessionLocal()

# Clear tables
db.query(Slot).delete()
db.query(Playground).delete()
db.commit()

# Sample playgrounds and slots
playgrounds = [
    {"name": "City Sports Arena", "location": "Hyderabad", "sport": "Football"},
    {"name": "Green Valley Courts", "location": "Chennai", "sport": "Tennis"},
    {"name": "Metro Badminton Hall", "location": "Delhi", "sport": "Badminton"},
]

for pg in playgrounds:
    playground = Playground(name=pg["name"], location=pg["location"], sport=pg["sport"])
    db.add(playground)
    db.commit()
    for i in range(1, 5):
        slot = Slot(time=f"{8+i}:00 AM - {9+i}:00 AM", booked=False, playground_id=playground.id)
        db.add(slot)
    db.commit()

db.close()
print("✅ Database seeded successfully!")
