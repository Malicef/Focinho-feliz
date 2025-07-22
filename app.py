from flask import Flask, request, jsonify, session
from flask_cors import CORS
from db import db, Usuario, criar_tabelas_teste, Cachorro
import os
from werkzeug.utils import secure_filename


UPLOAD_FOLDER = os.path.join("static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


app = Flask(__name__)
app.secret_key = "chave-secreta" 
CORS(app, supports_credentials=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

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


@app.route("/api/cadastrar-pet", methods=["POST"])
def cadastrar_pet():
    if "usuario_id" not in session:
        return jsonify({"erro": "Usuário não autenticado"}), 401

    nome = request.form.get("nome")
    peso = request.form.get("peso")
    foto = request.files.get("foto")

    if not nome or not peso or not foto:
        return jsonify({"erro": "Todos os campos são obrigatórios"}), 400

    
    filename = secure_filename(foto.filename)
    caminho_foto = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    foto.save(caminho_foto)
    html = f"/static/uploads/{filename}"
    

    Cachorro.create(
        nome=nome,
        peso=float(peso),
        foto=html
    )

    return jsonify({"mensagem": "Pet cadastrado com sucesso"})


@app.route("/api/cachorros", methods=["GET"])
def listar_cachorros():
    cachorros = Cachorro.select()
    lista = []
    for c in cachorros:
        lista.append({
            "nome": c.nome,
            "peso": c.peso,
            "foto": c.foto
        })
    return jsonify(lista)



if __name__ == '__main__':
    db.connect()
    db.create_tables([Usuario, Cachorro])
    criar_tabelas_teste()
    app.run(debug=True)