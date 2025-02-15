from django.shortcuts import render
from rest_framework import generics
from .models import NGO, Volunteer
from .serializers import NGOSerializer, VolunteerSerializer, UserFormSerializer
from .models import UserForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

class NGOListCreateView(generics.ListCreateAPIView):
    queryset = NGO.objects.all()
    serializer_class = NGOSerializer

class VolunteerListCreateView(generics.ListCreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

 
@api_view(['POST'])
def submit_form(request):
    serializer = UserFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Form submitted successfully!", "status": "pending"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def check_status(request, email):
    try:
        form = UserForm.objects.get(email=email)
        return Response({"status": form.status})
    except UserForm.DoesNotExist:
        return Response({"error": "No form found"}, status=status.HTTP_404_NOT_FOUND)


# payment methods :
import stripe
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

stripe.api_key = "your-stripe-secret-key"  # Replace with your actual Stripe secret key

@csrf_exempt
def donate(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse JSON data from React frontend
            amount = data.get("amount")
            if not amount:
                return JsonResponse({"error": "Amount required"}, status=400)

            # Convert amount to cents (Stripe requires amounts in cents)
            amount_in_cents = int(float(amount) * 100)

            # Create a Stripe Checkout Session
            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price_data": {
                            "currency": "usd",
                            "product_data": {"name": "Donation"},
                            "unit_amount": amount_in_cents,
                        },
                        "quantity": 1,
                    }
                ],
                mode="payment",
                success_url="http://127.0.0.1:3000/success",  # Redirect URL after success
                cancel_url="http://127.0.0.1:3000/cancel",    # Redirect URL if canceled
            )

            return JsonResponse({"payment_url": session.url})  # Send session URL back to React frontend

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)
