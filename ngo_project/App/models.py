from django.db import models

class NGO(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    founded_date = models.DateField()

    def __str__(self):
        return self.name

class Volunteer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    ngo = models.ForeignKey(NGO, on_delete=models.CASCADE, related_name='volunteers')

    def __str__(self):
        return self.name

STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
]

class UserForm(models.Model):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=200)
    birth_date = models.DateField()
    address = models.TextField()
    qualification = models.CharField(max_length=200)
    passport_photo = models.ImageField(upload_to='photos/')
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return self.first_name
