from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Jugador (models.Model):
	
	user = models.OneToOneField(User)
	genero = models.CharField(max_length=9)
	frase = models.CharField(max_length=32)
	puntaje = models.IntegerField(default=0)
	enSala = models.BooleanField(default = False)
	
	def __unicode__(self):
		return self.user.username

class RegistroPartida(models.Model):
	
	nickJ = models.ForeignKey(Jugador)
	tiempo = models.IntegerField()
	puntaje = models.IntegerField()

class Sala(models.Model):
	
	nombre = models.CharField(max_length=8)
	numero_jugadores = models.PositiveIntegerField()
	maximo_jugadores = models.PositiveIntegerField()
	
	def __unicode__(self):
		return self.nombre + '_' + unicode(self.numero_jugadores)
	
