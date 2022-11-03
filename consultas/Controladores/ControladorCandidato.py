from Repositorios.RepositorioCandidato import RepositorioCandidato
from Modelos.Candidato import Candidato
from Repositorios.RepositorioPartido import RepositorioPartido
from Modelos.Partido import Partido

class ControladorCandidato():
    def __init__(self):
        self.repositorioCandidato = RepositorioCandidato()
        self.repositorioPartido = RepositorioPartido()

    def index(self):
        return self.repositorioCandidato.findAll()

    def create(self, infoCandidato):
        nuevoCandidato = Candidato(infoCandidato)
        id_partido = infoCandidato["id_partido"]
        elPartido = Partido(self.repositorioPartido.findById(id_partido))
        nuevoCandidato.id_partido = elPartido
        return self.repositorioCandidato.save(nuevoCandidato)

    def show(self, id):
        elCandidato = Candidato(self.repositorioCandidato.findById(id))
        return elCandidato.__dict__

    def update(self, id, infoCandidato):
        candidatoActual = Candidato(self.repositorioCandidato.findById(id))
        candidatoActual.cedula = infoCandidato["cedula"]
        candidatoActual.nombre = infoCandidato["nombre"]
        candidatoActual.apellido = infoCandidato["apellido"]
        candidatoActual.numero_resolucion = infoCandidato["numero_resolucion"]
        id_partido = infoCandidato["id_partido"]
        elPartido = Partido(self.repositorioPartifo.findById(id_partido))
        candidatoActual.id_partido = elPartido
        return self.repositorioCandidato.save(candidatoActual)

    def delete(self, id):
        return self.repositorioCandidato.delete(id)