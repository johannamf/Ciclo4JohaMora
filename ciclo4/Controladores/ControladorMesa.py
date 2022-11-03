from Repositorios.RepositorioMesa import RepositorioMesa
from Modelos.Mesa import Mesa
from Repositorios.RepositorioCandidato import RepositorioCandidato
from Modelos.Candidato import Candidato

class ControladorMesa():
    def __init__(self):
        self.repositorioMesa = RepositorioMesa()
        self.repositorioCandidato = RepositorioCandidato()

    def index(self):
        return self.repositorioMesa.findAll()

    def create(self, infoMesa):
        nuevoMesa = Mesa(infoMesa)
        id_candidato = infoMesa["id_candidato_ganador"]
        elCandidato = Candidato(self.repositorioCandidato.findById(id_candidato))
        nuevoMesa.id_candidato_ganador = elCandidato
        return self.repositorioMesa.save(nuevoMesa)

    def show(self, id):
        elMesa = Mesa(self.repositorioMesa.findById(id))
        return elMesa.__dict__

    def update(self, id, infoMesa):
        mesaActual = Mesa(self.repositorioMesa.findById(id))
        mesaActual.numero = infoMesa["numero"]
        mesaActual.cantidad_inscritos = infoMesa["cantidad_inscritos"]
        mesaActual.total_votos = infoMesa["total_votos"]
        id_candidato = infoMesa["id_candidato_ganador"]
        elCandidato = Candidato(self.repositorioCandidato.findById(id_candidato))
        mesaActual.id_candidato_ganador = elCandidato
        mesaActual.cant_votos_ganador = infoMesa["cant_votos_inscritos"]

        return self.repositorioMesa.save(mesaActual)

    def delete(self, id):
        return self.repositorioMesa.delete(id)
