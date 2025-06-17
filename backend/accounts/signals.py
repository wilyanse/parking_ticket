from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth import get_user_model

@receiver(post_migrate)
def create_default_groups_with_permissions(sender, **kwargs):
    from django.contrib.auth.models import Group, Permission
    from django.contrib.contenttypes.models import ContentType
    from django.apps import apps

    # Get models safely
    ParkingLocation = apps.get_model('parking', 'ParkingLocation')
    ParkingSlot = apps.get_model('parking', 'ParkingSlot')
    Reservation = apps.get_model('parking', 'Reservation')

    Group = apps.get_model('auth', 'Group')
    Permission = apps.get_model('auth', 'Permission')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    # Create groups
    admin_group, _ = Group.objects.get_or_create(name='admin')
    user_group, _ = Group.objects.get_or_create(name='user')

    # ParkingLocation permissions
    parking_ct = ContentType.objects.get_for_model(ParkingLocation)
    parking_permissions = Permission.objects.filter(content_type=parking_ct)
    admin_group.permissions.set(parking_permissions)
    user_group.permissions.set(parking_permissions.filter(codename__startswith='view_'))

    # ParkingSlot permissions
    slot_ct = ContentType.objects.get_for_model(ParkingSlot)
    slot_permissions = Permission.objects.filter(content_type=slot_ct)
    admin_group.permissions.add(*slot_permissions)
    user_group.permissions.add(*slot_permissions.filter(codename__startswith='view_'))

    # Reservation permissions
    reservation_ct = ContentType.objects.get_for_model(Reservation)
    reservation_permissions = Permission.objects.filter(content_type=reservation_ct)
    admin_group.permissions.add(*reservation_permissions)
    user_group.permissions.add(*reservation_permissions.filter(
        codename__in=['add_reservation', 'view_reservation']
    ))

    # User management permissions
    user_model = get_user_model()
    user_ct = ContentType.objects.get_for_model(user_model)
    user_permissions = Permission.objects.filter(content_type=user_ct)
    admin_group.permissions.add(*user_permissions)
