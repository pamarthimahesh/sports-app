from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from database import SessionLocal
from models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.json
    db = SessionLocal()
    if db.query(User).filter_by(username=data["username"]).first():
        return jsonify({"error": "User already exists"}), 400
    user = User(
        username=data["username"],
        password=generate_password_hash(data["password"])
    )
    db.add(user)
    db.commit()
    return jsonify({"message": "User created successfully"})

@auth_bp.post("/login")
def login():
    data = request.json
    db = SessionLocal()
    user = db.query(User).filter_by(username=data["username"]).first()
    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401
    token = create_access_token(identity={"id": user.id, "username": user.username})
    return jsonify({"access_token": token})
