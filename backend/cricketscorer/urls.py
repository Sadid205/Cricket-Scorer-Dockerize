"""
URL configuration for cricketscorer project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('api/v1/admin/', admin.site.urls),
    path('api/v1/teams/',include('team.urls')),
    path('api/v1/player/',include('player.urls')),
    path('api/v1/batsman/',include('batsman.urls')),
    path('api/v1/batting/',include('batting.urls')),
    path('api/v1/bowler/',include('bowler.urls')),
    path('api/v1/bowling/',include('bowling.urls')),
    path('api/v1/extras/',include('extras.urls')),
    path('api/v1/fall_of_wickets/',include('fall_of_wickets.urls')),
    path('api/v1/fielder/',include('fielder.urls')),
    path('api/v1/fielding/',include('fielding.urls')),
    path('api/v1/history/',include('history.urls')),
    path('api/v1/match/',include('match.urls')),
    path('api/v1/over_si/',include('over_si.urls')),
    path('api/v1/over_fi/',include('over_fi.urls')),
    path('api/v1/partnerships/',include('partnerships.urls')),
    path('api/v1/author/',include('author.urls')),
]
