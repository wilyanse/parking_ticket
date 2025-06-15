from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import ParkingLocation, ParkingSlot, Reservation
from .serializers import ParkingLocationSerializer, ParkingSlotSerializer, ReservationSerializer

class ParkingLocationViewSet(viewsets.ModelViewSet):
    queryset = ParkingLocation.objects.all()
    serializer_class = ParkingLocationSerializer

    def get_permissions(self):
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
    
    @action(detail=True, methods=['get'])
    def reservations(self, request, pk=None):
        location = self.get_object()
        reservations = Reservation.objects.filter(parking_location=location)
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)

class ParkingSlotViewSet(viewsets.ModelViewSet):
    queryset = ParkingSlot.objects.all()
    serializer_class = ParkingSlotSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'partial_update']:
            self.allowed_groups = ['admin', 'user']
        elif self.action in ['create', 'update', 'destroy']:
            self.allowed_groups = ['admin']
        return super().get_permissions()
    
    @action(detail=True, methods=['get'])
    def reservations(self, request, pk=None):
        slot = self.get_object()
        reservations = slot.reservations.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Assuming the user is authenticated