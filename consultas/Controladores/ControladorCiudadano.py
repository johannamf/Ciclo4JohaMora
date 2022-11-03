from Repositorios.RepositorioCiudadano import RepositorioCiudadano
from Modelos.Ciudadano import Ciudadano
class ControladorCiudadano():
    def __init__(self):
        self.repositorioCiudadano = RepositorioCiudadano()

    def index(self):
        return self.repositorioCiudadano.findAll()

    def create(self,infoCiudadano):
        nuevoCiudadano=Ciudadano(infoCiudadano)
        return self.repositorioCiudadano.save(nuevoCiudadano)

    def show(self,id):
        elCiudadano=Ciudadano(self.repositorioCiudadano.findById(id))
        return elCiudadano.__dict__

    def update(self,id,infoCiudadano):
        ciudadanoActual = Ciudadano(self.repositorioCiudadano.findById(id))
        ciudadanoActual.cedula = infoCiudadano["cedula"]
        ciudadanoActual.nombre = infoCiudadano["nombre"]
        ciudadanoActual.apellido = infoCiudadano["apellido"]
        return self.repositorioCiudadano.save(ciudadanoActual)
    
    def delete(self, id):
        return self.repositorioCiudadano.delete(id)
            