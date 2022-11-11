from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from waitress import serve
import datetime
import requests
import re

from flask_jwt_extended import create_access_token, verify_jwt_in_request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
cors = CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Cambiar por el que sea conveniente
jwt = JWTManager(app)


@app.route("/login", methods=["POST"])
def create_token():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/usuarios/validar'
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        user = response.json()
        expires = datetime.timedelta(seconds=60 * 60 * 24)
        access_token = create_access_token(identity=user, expires_delta=expires)
        return jsonify({"token": access_token, "user_id": user["_id"],"correo": user["correo"],"seudonimo": user["seudonimo"]})
    else:
        return jsonify({"msg": "Bad username or password"}), 401


@app.route("/", methods=['GET'])
def test():
    json = {}
    json["message"] = "Server running ..."
    return jsonify(json)


@app.before_request
def before_request_callback():
    endPoint = limpiarURL(request.path)
    excludedRoutes = ["/login"]
    if excludedRoutes.__contains__(request.path):
        print("Ruta excluida: ", request.path)
        pass
    elif verify_jwt_in_request():
        usuario = get_jwt_identity()
        if usuario["rol"] is not None:
            tienePermiso = validarPermiso(endPoint, request.method, usuario["rol"]["_id"])
            if not tienePermiso:
                return jsonify({"message": "Rol no cuenta con permiso o ruta no existe"}), 401
        else:
            return jsonify({"message": "Permission denied: Token jwt no encontrado."}), 401

@app.route("/candidatos",methods=['GET'])
def getCandidatos():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/candidatos'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)
@app.route("/candidatos",methods=['POST'])
def crearCandidatos():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/candidatos'
    response = requests.post(url, headers=headers,json=data)
    json = response.json()
    return jsonify(json)

@app.route("/candidatos/<string:id>",methods=['GET'])
def getCandidato(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/candidatos/'+id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)

@app.route("/candidatos/<string:id>",methods=['PUT'])
def modificarCandidato(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/candidatos/'+id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)
@app.route("/candidatos/<string:id>",methods=['DELETE'])
def eliminarCandidatos(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/candidatos/' + id
    response = requests.delete(url, headers=headers)
    json = response.json()
    return jsonify(json)

@app.route("/mesas",methods=['GET'])
def getMesas():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/mesas'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)
@app.route("/mesas",methods=['POST'])
def crearMesas():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/mesas'
    response = requests.post(url, headers=headers,json=data)
    json = response.json()
    return jsonify(json)
@app.route("/mesas/<string:id>",methods=['GET'])
def getMesa(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/mesas/'+id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)

@app.route("/mesas/<string:id>",methods=['PUT'])
def modificarMesa(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/mesas/'+id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)
@app.route("/mesas/<string:id>",methods=['DELETE'])
def eliminarMesas(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/mesas/' + id
    response = requests.delete(url, headers=headers)
    json = response.json()
    return jsonify(json)

@app.route("/ciudadanos",methods=['GET'])
def getCiudadanos():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/ciudadanos'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)
@app.route("/ciudadanos",methods=['POST'])
def crearCiudadanos():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/ciudadanos'
    response = requests.post(url, headers=headers,json=data)
    json = response.json()
    return jsonify(json)
@app.route("/ciudadanos/<string:id>",methods=['GET'])
def getCiudadano(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/ciudadanos/'+id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)
@app.route("/ciudadanos/<string:id>",methods=['PUT'])
def modificarCiudadano(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/ciudadanos/'+id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)
@app.route("/ciudadanos/<string:id>",methods=['DELETE'])
def eliminarCiudadanos(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/ciudadanos/' + id
    response = requests.delete(url, headers=headers)
    json = response.json()
    return jsonify(json)

@app.route("/partidos",methods=['GET'])
def getPartidos():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/partidos'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)
@app.route("/partidos",methods=['POST'])
def crearPartidos():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/partidos'
    response = requests.post(url, headers=headers,json=data)
    json = response.json()
    return jsonify(json)
@app.route("/partidos/<string:id>",methods=['GET'])
def getPartido(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/partidos/'+id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)
@app.route("/partidos/<string:id>",methods=['PUT'])
def modificarPartido(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/partidos/'+id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)
@app.route("/partidos/<string:id>",methods=['DELETE'])
def eliminarPartidos(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-electoral"] + '/partidos/' + id
    response = requests.delete(url, headers=headers)
    json = response.json()
    return jsonify(json)





def loadFileConfig():
    with open('config.json') as f:
        data = json.load(f)
    return data


def limpiarURL(url):
    partes = request.path.split("/")
    for laParte in partes:
        if re.search('\\d', laParte):
            url = url.replace(laParte, "?")
            print(url + "\n")
    return url
def validarPermiso(endPoint, metodo, idRol):
    url = dataConfig["url-backend-security"] + "/permisos-roles/validar-permiso/rol/" + str(idRol)
    tienePermiso = False
    headers = {"Content-Type": "application/json; charset=utf-8"}
    body = {
        "url": endPoint,
        "metodo": metodo
    }
    response = requests.get(url, json=body, headers=headers)
    try:
        data = response.json()
        if ("_id" in data):
            tienePermiso = True
    except:
        pass
    return tienePermiso


if __name__ == '__main__':
    dataConfig = loadFileConfig()
    print("Server running : " + "http://" + dataConfig["url-backend"] + ":" + str(dataConfig["port"]))
    serve(app, host=dataConfig["url-backend"], port=dataConfig["port"])
