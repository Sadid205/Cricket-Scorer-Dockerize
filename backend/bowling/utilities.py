from django.apps import apps


def get_player():
    Player = apps.get_model('player','Player')
    return Player
    
def get_team():
    Team = apps.get_model('team','Team')
    return Team
    