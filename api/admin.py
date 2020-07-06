from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Job
# from .models import Job, Organization


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    model = Job
    list_display = ('title', 'category', 'org', 'owner')
    list_filter = (['title', 'category', 'org', 'owner'])
    pass


# @admin.register(Organization)
# class OrganizationAdmin(admin.ModelAdmin):
#     list_display = ('name', 'org_url')
#     list_filter = (['name'])
#     pass


# @admin.register(Partner)
# class PartnerAdmin(admin.ModelAdmin):
#     list_display = ('user', 'org')
#     list_filter = (['user'])
#     pass