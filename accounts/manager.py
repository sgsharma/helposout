from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _

from django.core.exceptions import ValidationError

from . import models


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **kwargs):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        if 'first_name' not in kwargs:
            raise ValueError(_('Please provide a first name'))
        if 'last_name' not in kwargs:
            raise ValueError(_('Please provide a last name'))
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        kwargs.setdefault('is_partner', False)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, organization=None, **kwargs):
        """
        Create and save a SuperUser with the given email and password.
        """
        if not organization:
            organization = models.Organization(
                name="default",
                org_url="http://helposout.com/"
            )
            try:
                org = models.Organization.objects.get(name='default') 
            except:
                try:
                    organization.full_clean()
                    organization.save()
                except ValidationError as e:
                    raise Exception(e)
        kwargs['organization'] = organization
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_partner', True)
        kwargs.setdefault('is_active', True)

        if kwargs.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if kwargs.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **kwargs)