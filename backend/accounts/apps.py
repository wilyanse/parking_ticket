from django.apps import AppConfig
from django.db.models.signals import post_migrate

class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'


    def ready(self):
        from. import signals
        from .signals import create_default_groups_with_permissions
        post_migrate.connect(create_default_groups_with_permissions, sender=self)