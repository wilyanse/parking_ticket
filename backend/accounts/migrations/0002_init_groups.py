from django.db import migrations

def create_default_groups_with_permissions(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Permission = apps.get_model('auth', 'Permission')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    # Create groups
    admin_group, _ = Group.objects.get_or_create(name='admin')
    user_group, _ = Group.objects.get_or_create(name='user')

    # ParkingLocation permissions
    parking_ct = ContentType.objects.get(app_label='parking', model='parkinglocation')
    parking_permissions = Permission.objects.filter(content_type=parking_ct)
    admin_group.permissions.set(parking_permissions)
    user_group.permissions.set(parking_permissions.filter(codename__startswith='view_'))

    # ParkingSlot permissions
    slot_ct = ContentType.objects.get(app_label='parking', model='parkingslot')
    slot_permissions = Permission.objects.filter(content_type=slot_ct)
    admin_group.permissions.add(*slot_permissions)
    user_group.permissions.add(*slot_permissions.filter(codename__startswith='view_'))

    # Reservation permissions
    reservation_ct = ContentType.objects.get(app_label='parking', model='reservation')
    reservation_permissions = Permission.objects.filter(content_type=reservation_ct)
    admin_group.permissions.add(*reservation_permissions)
    user_group.permissions.add(*reservation_permissions.filter(codename__in=['add_reservation', 'view_reservation']))

    # User management permissions
    user_ct = ContentType.objects.get(app_label='auth', model='user')
    user_permissions = Permission.objects.filter(content_type=user_ct)
    admin_group.permissions.add(*user_permissions)

class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('parking', '0001_initial'),
        ('accounts', '0001_initial'),  # depends on your initial accounts migration
    ]

    operations = [
        migrations.RunPython(create_default_groups_with_permissions),
    ]