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
    
    @action(detail=False, methods=['get'], url_path='by_user')
    def by_user(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"detail": "user_id is required"}, status=400)
        locations = ParkingLocation.objects.filter(user_id=user_id)
        serializer = self.get_serializer(locations, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def create_slot(self, request, pk=None):
        location = self.get_object()
        serializer = ParkingSlotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(parking_location=location)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    @action(detail=True, methods=['delete'], url_path='delete_slot')
    def delete_slot(self, request, pk=None):
        location = self.get_object()
        latest_slot = location.slots.order_by('-id').first()
        if not latest_slot:
            return Response({"detail": "No slots to delete for this location."}, status=404)
        latest_slot.delete()
        return Response({"detail": "Latest slot deleted successfully."}, status=204)

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

    @action(detail=False, methods=['get'], url_path='by_user')
    def by_user(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"detail": "user_id is required"}, status=400)
        reservations = Reservation.objects.filter(user_id=user_id)
        serializer = self.get_serializer(reservations, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='by_owner')
    def by_owner(self, request):
        """
        Returns all reservations for locations owned by a specific user.
        Usage: /api/reservations/by_owner/?owner_id=USER_ID
        """
        owner_id = request.query_params.get('owner_id')
        if not owner_id:
            return Response({"detail": "owner_id is required"}, status=400)
        reservations = Reservation.objects.filter(parking_location__user_id=owner_id)
        data = []
        for reservation in reservations:
            serialized = self.get_serializer(reservation).data
            serialized['parking_location'] = reservation.parking_location.name
            serialized['username'] = reservation.user.username if reservation.user else None
            data.append(serialized)
        return Response(data)