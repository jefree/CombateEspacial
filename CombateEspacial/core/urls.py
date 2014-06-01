from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('core.views',
    # Examples:
    # url(r'^$', 'apps.views.home', name='home'),
    # url(r'^apps/', include('apps.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
	#url(r'^$', 'index'),
	url(r'^$', 'index'),
	url(r'^ingresar/(?P<error>[a-z]+)/$', 'ingresar'),
	url(r'^registrarse/(?P<error>[a-z]+)/$', 'registrar'),
	url(r'^insertarJugador/$', 'insertarJugador'),
	url(r'^validarJugador/$', 'validarJugador'),
	url(r'^abandonar/$', 'abandonar'),
	url(r'^abandonarForzado/(?P<idJugador>[a-z]+)/(?P<idSala>.+)/$', 'abandonarForzado'),
	url(r'^infoUsuario/(?P<aviso>[a-z]+)/$', 'verInfoUsuario'),
	url(r'^salas/instrucciones/$', 'instrucciones'),
	url(r'^salas/(?P<aviso>[a-z]+)/$', 'salas'),
	url(r'^editarInfo/(?P<aviso>[a-z]+)/$', 'editarInfo'),
	url(r'^cambiarInfo/$', 'cambiarInfo'),
	url(r'^records/$', 'verRecords'),
	url(r'^conectarASala/$', 'conectar'),
	url(r'^regresar/(?P<puntos>[0-9]+)/(?P<tiempo>[0-9]+)/(?P<aciertos>[0-9]+)/(?P<idSala>.+)/(?P<aviso>[a-z]+)/$', 'regresar'),
	url(r'^conectarASala/validarJuego/(?P<idJugador>[a-z]+)/$', 'validarJuegoEnSala'),
	url(r'^nuevaContrasena/(?P<aviso>[a-z]+)/$', 'nuevaContrasena'),
	url(r'^recuperarContrasena/$', 'recuperar'),
	url(r'^salas/actualizarSalas/$', 'actualizarSalas'),
)

