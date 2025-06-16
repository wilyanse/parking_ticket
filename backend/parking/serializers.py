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
        read_only_fields = ['parking_location']

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

    def validate(self, data):
        # Only run this validation when creating a new reservation (not updating)
        if self.instance is None:
            if data['start_time'] >= data['end_time']:
                raise serializers.ValidationError("Start time must be before end time.")
        return data