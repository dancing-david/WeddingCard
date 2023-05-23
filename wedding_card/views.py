from django.forms import model_to_dict
from django.http import JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from wedding_card.forms import CreateMessageForm
from wedding_card.models import Message


# Create your views here.


class IndexView(View):
    template_name = 'wedding_card/index.html'

    def get(self, request):
        messages = Message.objects.all().order_by('-uploaded_at')
        return render(request, self.template_name, context={'messages': messages})


# noinspection PyMethodMayBeStatic
@method_decorator(csrf_exempt, name='dispatch')
class MessageView(View):
    def get(self, request):
        messages = Message.objects.all().order_by('-uploaded_at')
        response = [{'name': message.name, 'message': message.message,
                     'uploaded_at': message.uploaded_at.strftime('%Y-%m-%d %H:%M:%S')} for message in messages]
        return JsonResponse(response, safe=False)

    def post(self, request):
        form = CreateMessageForm(request.POST)
        response = {}
        if form.is_valid():
            message = form.save()
            response = model_to_dict(message)
            response.update({'uploaded_at': message.uploaded_at.strftime('%Y-%m-%d %H:%M:%S')})

        return JsonResponse(response, safe=False)
