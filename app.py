from flask import Flask, request, jsonify, session
from db import db, Usuario, criar_tabelas_teste

# Inicializa o app Flask
app = Flask(__name__)
app.secret_key = "chave-secreta"  # necessário para usar session

# Rota da API de login
@app.route("/api/login", methods=["POST"])
def login_usuario():
    dados = request.json
    email = dados.get("email")
    senha = dados.get("senha")

    usuario = Usuario.get_or_none(Usuario.email == email, Usuario.senha == senha)
    if usuario:
        session["usuario_id"] = usuario.id
        return jsonify({"mensagem": "Login bem-sucedido", "usuario_id": usuario.id}), 200
    else:
        return jsonify({"erro": "Email ou senha inválidos"}), 401

# Iniciar servidor
if __name__ == '__main__':
    db.connect()
    db.create_tables([Usuario])
    criar_tabelas_teste()
    app.run(debug=True)
