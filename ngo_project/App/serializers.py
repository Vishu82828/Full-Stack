from rest_framework import serializers
from .models import NGO, Volunteer, UserForm

class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = '__all__'

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'

class UserFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserForm
        fields = '__all__'
