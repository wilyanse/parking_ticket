# parking/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import ParkingLocation, ParkingSlot, Reservation
from .serializers import ParkingLocationSerializer, ParkingSlotSerializer, ReservationSerializer

class ParkingLocationViewSet(viewsets.ModelViewSet):
    queryset = ParkingLocation.objects.all()
    serializer_class = ParkingLocationSerializer

    def get_permissions(self):
        # Define allowed groups per action
        if self.action in ['list', 'retrieve']:
            self.allowed_groups = ['admin', 'user']
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.allowed_groups = ['admin']
        return super().get_permissions()
    
    @action(detail=True, methods=['get'])
    def slots(self, request, pk=None):

        location = self.get_object()
        slots = location.slots.all()
        serializer = ParkingSlotSerializer(slots, many=True)
        return Response(serializer.data)

class ParkingSlotViewSet(viewsets.ModelViewSet):
    queryset = ParkingSlot.objects.all()
    serializer_class = ParkingSlotSerializer

    def get_permissions(self):
        # Define allowed groups per action
        if self.action in ['list', 'retrieve', 'partial_update']:
            self.allowed_groups = ['admin', 'user']
        elif self.action in ['create', 'update', 'destroy']:
            self.allowed_groups = ['admin']
        return super().get_permissions()

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def perform_create(self, serializer):
        # Custom logic can be added here if needed
        serializer.save(user=self.request.user)  # Assuming the user is authenticated