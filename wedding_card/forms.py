from django import forms

from wedding_card.models import Message


class CreateMessageForm(forms.ModelForm):

    class Meta:
        model = Message
        readonly_fields = ['uploaded_at']
        fields = ['name', 'message']
