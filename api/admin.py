from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser, Job, Organization


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active', 'is_partner')
    list_filter = ('email', 'is_staff', 'is_active', 'is_partner')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_partner')})
        )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'is_partner')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    model = Job
    list_display = ('title', 'category', 'org', 'owner')
    list_filter = (['title', 'category', 'org', 'owner'])
    pass


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'org_url')
    list_filter = (['name'])
    pass


# @admin.register(Partner)
# class PartnerAdmin(admin.ModelAdmin):
#     list_display = ('user', 'org')
#     list_filter = (['user'])
#     pass