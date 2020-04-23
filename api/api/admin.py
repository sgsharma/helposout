from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser, Job, Organization, Partner


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active', 'is_partner', 'is_applicant')
    list_filter = ('email', 'is_staff', 'is_active', 'is_partner', 'is_applicant')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_partner', 'is_applicant')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'is_partner', 'is_applicant')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    model = Job
    list_display = ('title', 'category', 'org', 'posted_by')
    list_filter = (['title', 'category', 'org', 'posted_by'])
    pass


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'org_url')
    list_filter = (['name'])
    pass


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('user', 'org')
    list_filter = (['user'])
    pass