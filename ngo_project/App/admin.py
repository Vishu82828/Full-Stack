from django.contrib import admin

# Register your models here.
from .models import UserForm

class UserFormAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'status')
    list_filter = ('status',)
    actions = ['approve_forms', 'reject_forms']

    def approve_forms(self, request, queryset):
        queryset.update(status='approved')

    def reject_forms(self, request, queryset):
        queryset.update(status='rejected')

    approve_forms.short_description = "Approve selected forms"
    reject_forms.short_description = "Reject selected forms"

admin.site.register(UserForm, UserFormAdmin)
