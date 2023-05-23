from django.urls import path

from . import views

app_name = 'wedding_card'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('message', views.MessageView.as_view(), name='message'),
]
