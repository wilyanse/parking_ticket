from django.db import migrations

def create_default_groups_with_permissions(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Permission = apps.get_model('auth', 'Permission')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    # Create groups
    admin_group, _ = Group.objects.get_or_create(name='admin')
    user_group, _ = Group.objects.get_or_create(name='user')

    # Example: give admin full access to the ParkingLocation model
    parking_ct = ContentType.objects.get(app_label='parking', model='parkinglocation')
    parking_permissions = Permission.objects.filter(content_type=parking_ct)
    admin_group.permissions.set(parking_permissions)

    # Give users only 'view' permission to ParkingLocation
    view_parking = parking_permissions.filter(codename__startswith='view_')
    user_group.permissions.set(view_parking)

    # You can repeat this for other models like ParkingSlot, Reservation, etc.
    slot_ct = ContentType.objects.get(app_label='parking', model='parkingslot')
    slot_permissions = Permission.objects.filter(content_type=slot_ct)
    admin_group.permissions.add(*slot_permissions)
    user_group.permissions.add(*slot_permissions.filter(codename__startswith='view_'))

    # Reservation: users can add/view their own reservations, admin has all
    reservation_ct = ContentType.objects.get(app_label='parking', model='reservation')
    reservation_permissions = Permission.objects.filter(content_type=reservation_ct)
    admin_group.permissions.add(*reservation_permissions)
    user_group.permissions.add(*reservation_permissions.filter(codename__in=['add_reservation', 'view_reservation']))

    # Add permissions for user management
    user_ct = ContentType.objects.get(app_label='auth', model='user')
    user_permissions = Permission.objects.filter(content_type=user_ct)

    # Give full user management to admins
    admin_group.permissions.add(*user_permissions)

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0001_initial'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('parking', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_groups_with_permissions),
    ]
