from django.db import migrations

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0001_initial'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('parking', '0001_initial'),
    ]

    operations = [
        # No group/permission logic here!
    ]