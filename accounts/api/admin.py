from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User, Organization
from django.contrib import admin


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
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


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'org_url')
    list_filter = (['name'])
    pass