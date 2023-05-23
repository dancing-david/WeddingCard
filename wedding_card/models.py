from django.db import models

# Create your models here.


class BaseModel(models.Model):
    objects = models.Manager()

    class Meta:
        abstract = True


class Message(BaseModel):
    name = models.CharField(max_length=10, verbose_name='이름')
    message = models.TextField(verbose_name='메세지')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'message'
        verbose_name = '메세지'
        verbose_name_plural = '메세지'
