# parking/views.py
from rest_framework import viewsets
from .models import ParkingLocation, ParkingSlot, Reservation
from .serializers import ParkingLocationSerializer, ParkingSlotSerializer, ReservationSerializer

class ParkingLocationViewSet(viewsets.ModelViewSet):
    queryset = ParkingLocation.objects.all()
    serializer_class = ParkingLocationSerializer

class ParkingSlotViewSet(viewsets.ModelViewSet):
    queryset = ParkingSlot.objects.all()
    serializer_class = ParkingSlotSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def perform_create(self, serializer):
        # Custom logic can be added here if needed
        serializer.save(user=self.request.user)  # Assuming the user is authenticated