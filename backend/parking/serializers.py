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

            # Check for overlapping reservations for the same parking slot
            slot = data['parking_slot']
            start = data['start_time']
            end = data['end_time']
            overlapping = Reservation.objects.filter(
                parking_slot=slot,
                start_time__lt=end,
                end_time__gt=start
            ).exists()
            if overlapping:
                raise serializers.ValidationError("This parking slot is already reserved for the selected time range.")
        return data