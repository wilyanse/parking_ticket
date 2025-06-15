# parking/serializers.py
from rest_framework import serializers
from .models import ParkingLocation, ParkingSlot, Reservation

class ParkingLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingLocation
        fields = '__all__'

class ParkingSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSlot
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

    def validate(self, data):
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError("Start time must be before end time.")
        return data