from peewee import *

db = SqliteDatabase('meubanco.db')

class Usuario(Model):
    email = CharField()
    senha = CharField()

    class Meta:
        database = db

    
        
def criar_tabelas_teste():
    if not Usuario.get_or_none(Usuario.email == "usuario.com"):
        Usuario.create(email="usuario.com", senha="1234")