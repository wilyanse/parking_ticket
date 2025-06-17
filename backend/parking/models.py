import uuid
from django.db import models
from django.conf import settings

# This file contains models for parking locations, slots, and reservations.

# ParkingLocation model represents a physical parking location.
# It includes fields for name, description, location, and timestamps.
class ParkingLocation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='parking_locations')

    def __str__(self):
        return self.name

# ParkingSlot model represents a parking slot within a ParkingLocation.
# It includes fields for status, timestamps, and a foreign key to the ParkingLocation.
class ParkingSlot(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('reserved', 'Reserved'),
        ('unavailable', 'Unavailable'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    parking_location = models.ForeignKey(ParkingLocation, on_delete=models.CASCADE, related_name='slots')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

# This model represents a reservation for a parking slot.
# It includes fields for user, parking location, parking slot, start and end times, status, and timestamps.
class Reservation(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parking_location = models.ForeignKey(ParkingLocation, on_delete=models.CASCADE)
    parking_slot = models.ForeignKey(ParkingSlot, on_delete=models.CASCADE, related_name='reservations')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    # The clean method ensures that the parking slot belongs to the selected parking location.
    def clean(self):
        # Ensure the slot belongs to the location
        if self.parking_slot.parking_location_id != self.parking_location_id:
            from django.core.exceptions import ValidationError
            raise ValidationError("Parking slot does not belong to the selected parking location.")

    # The save method calls clean before saving the instance to ensure validation.
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
