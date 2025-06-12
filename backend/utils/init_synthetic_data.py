# init_synthetic_data.py

import os
import django
import random
from datetime import datetime, timedelta

import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")  # <- replace with your project
django.setup()

from django.contrib.auth import get_user_model
from parking.models import ParkingLocation, ParkingSlot, Reservation

User = get_user_model()

def run():
    print("Initializing synthetic data...")

    # Create superuser
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="admin123"
        )
        print("Superuser 'admin' created with password 'admin123'")
    else:
        print("Superuser 'admin' already exists.")
        
    # Create users
    users = []
    for i in range(5):
        user, _ = User.objects.get_or_create(
            username=f"user{i+1}",
            defaults={
                "email": f"user{i+1}@example.com",
                "is_active": True,
                "password": "$fake$hashed$pass",  # Set manually or use set_password
            }
        )
        users.append(user)

    # Create locations
    locations = []
    for i in range(10):
        location = ParkingLocation.objects.create(
            name=f"Lot {i+1}",
            description="Well-lit secure parking.",
            location=f"Zone {chr(65 + i)}",
            date_created=datetime.now(),
            date_updated=datetime.now(),
        )
        locations.append(location)

    # Create slots
    slots = []
    for location in locations:
        for j in range(10):  # 10 slots per location
            slot = ParkingSlot.objects.create(
                parking_location=location,
                status=random.choice(["available", "occupied"]),
                date_created=datetime.now(),
                date_updated=datetime.now(),
            )
            slots.append(slot)

    # Create reservations
    for _ in range(30):
        user = random.choice(users)
        location = random.choice(locations)
        start = datetime.now() + timedelta(days=random.randint(0, 3))
        end = start + timedelta(hours=2)
        Reservation.objects.create(
            user=user,
            parking_location=location,
            start_time=start,
            end_time=end,
            status=random.choice(["active", "completed", "cancelled"]),
            date_created=datetime.now(),
            date_updated=datetime.now(),
        )

    print("Synthetic data created.")

if __name__ == "__main__":
    run()
