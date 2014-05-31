# Create your views here.

import random

from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth import  authenticate, login, logout
from django.contrib.auth.decorators import login_required
from core.models import * 

def index(request):
	return render(request, 'core/index.html')
	
def registrar(request, error):
	
	data = {'error': error}
	return render(request, 'core/registrar.html', data)

def ingresar(request, error):
	
	if request.user.is_authenticated():
		request.session.set_expiry(0)
		return redirect('core.views.verInfoUsuario', aviso='none')
		
	data = {'error':error,}	
	return render(request, 'core/ingresar.html', data)

def validarJugador(request):
	
	u = authenticate(username=request.POST['txtNick'], password=request.POST['txtContra'])
		
	if u is not None:
		
		try:
									
			login(request, u)
			
			return redirect('core.views.verInfoUsuario', aviso='none')
		
		except Jugador.DoesNotExist:
			return redirect('core.views.ingresar', error='error')
	
	return redirect('core.views.ingresar', error='error')

def insertarJugador(request):
	
	try:
		u = User.objects.get(username = request.POST['txtNick'])
		return redirect('core.views.registrar', error='nickexiste')
		
	except User.DoesNotExist:
		
		u = User.objects.create_user(request.POST['txtNick'], '', request.POST['txtContra'])
		
		u.first_name = request.POST['txtNombre']
		u.last_name = request.POST['txtApellido']
		u.save()
			
		u = authenticate(username=request.POST['txtNick'], password=request.POST['txtContra'])
		
		j = Jugador()
	
		j.genero = request.POST['slcGenero']
		j.frase = request.POST['txtFrase']
		j.user = u
		j.save()
		
		login(request, j.user)
		
		return redirect('core.views.verInfoUsuario', aviso='none')

@login_required(login_url='/core/ingresar/none/')
def verInfoUsuario(request, aviso):
	
	j = Jugador.objects.get(user__username = request.user.username)
	
	return render(request, 'core/infoUsuario.html', {'aviso':aviso, 'jugador':j})

@login_required(login_url='/core/ingresar/none/')
def abandonar(request):
	
	j = Jugador.objects.get(user__username = request.user.username)
	
	j.save()
	
	logout(request)
	request.session.flush()
	
	return render(request, 'core/finSesion.html')

def abandonarForzado(request, idJugador, idSala):
	
	abandonar(request)
		
	j = Jugador.objects.get(user__username = idJugador)
		
	if (j.enSala):
		
		j.enSala = False
		
		sala = Sala.objects.get(nombre = idSala)
		sala.numero_jugadores -= 1
		
		sala.save()
		j.save()
			
	return HttpResponse()

@login_required(login_url='/core/ingresar/none/')
def salas(request, aviso):
	
	salas = Sala.objects.all()
	
	return render(request, 'core/salas.html', {'salas':salas, 'aviso':aviso})

@login_required(login_url='/core/ingresar/none/')		
def instrucciones(request):
	return render(request, 'core/instrucciones.html')

@login_required(login_url='/core/ingresar/none/')
def editarInfo(request, aviso):
	
	j = Jugador.objects.get(user__username = request.user.username)
	return render(request, 'core/editarInfo.html', {'jugador':j,'aviso':aviso, })

@login_required(login_url='/core/ingresar/none/')
def cambiarInfo(request):
	
	u = User.objects.get(username = request.user.username) 

	if (u.check_password(request.POST['txtContraA'])):
		
		u.set_password(request.POST['txtContraN'])

		u.save()
	
		return redirect('core.views.verInfoUsuario', aviso='infoactualizada')

	else:
		return redirect('core.views.editarInfo', aviso='contranovalida')

def verRecords(request):
	
	records = Jugador.objects.all().order_by('-puntaje')[:10]

	return render(request, 'core/records.html', {'records':records, })

@login_required(login_url='/core/ingresar/none/')
def conectar(request):
	
	idSala = request.POST['sala']
	idNave = request.POST['nave']
	
	sala = Sala.objects.get(nombre = idSala)
	
	if sala.numero_jugadores < sala.maximo_jugadores:
		
		j = Jugador.objects.get(user__username = request.user.username)
		
		if not j.enSala:
			 
			
			sala.numero_jugadores += 1;
			sala.save()
			
			j.enSala = True
			j.save()
			
			return render(request, 'core/juego.html', {'idSala':idSala, 'idNave':idNave, 'jugador': j})
		else:
			return redirect('core.views.salas', aviso='yaensala')
	else:
		return redirect('core.views.salas', aviso='salallena')
		
def regresar(request, puntos, tiempo, aciertos, idSala, aviso):
	
	j = Jugador.objects.get(user__username = request.user.username)
	puntos = int(puntos)
	
	if(puntos != 0):
		
		j.puntaje += puntos
		
		r = RegistroPartida(nickJ = j, tiempo = tiempo, puntaje=puntos)
		r.save()
	
	if(j.enSala):
		
		sala = Sala.objects.get(nombre = idSala)
		sala.numero_jugadores -= 1
		sala.save()
		
		j.enSala = False
	
	j.save()
	
	return redirect('core.views.salas', aviso=aviso)

def validarJuegoEnSala(request, idJugador):
			
	respuesta = ''
	
	if(request.is_ajax()):
		
		j = Jugador.objects.get(user__username = idJugador)
		
		if j.enSala:
			respuesta = 'True'
		else:
			respuesta = 'False'
			
	
	return HttpResponse(respuesta)

def nuevaContrasena(request, aviso):
	return render(request, 'core/recuperarContrasena.html', {'aviso':aviso })

def recuperar(request):
	
	j = Jugador.objects.get(user__username = request.POST['txtUsuario'])
	
	if (j.frase == request.POST['txtFrase']):
		
		nuevo = str(random.randint(10000, 999999))
		j.user.set_password(nuevo)
		j.save()
		j.user.save()
		
		aviso = nuevo
		
		return render(request, 'core/exitoRecuperar.html', {'aviso':nuevo})
	
	return redirect('core.views.nuevaContrasena', aviso='error')
	
def actualizarSalas(request):
	
	salas = Sala.objects.all()
	
	data = ''
	
	for s in salas:
		
		if(s.numero_jugadores < s.maximo_jugadores):
			data += str(s.numero_jugadores) + ' '
		else:
			data += str(-1) + ' '
		
	return HttpResponse(data)
