class Route {
    constructor(origen_id, destino_id, duracion_minutos, distancia, frequencia_dia, frequencia_semana) {
        this.origen_id = origen_id
        this.destino_id = destino_id
        this.duracion_minutos = duracion_minutos
        this.distancia = distancia
        this.frequencia_dia = frequencia_dia
        this.frequencia_semana = frequencia_semana
    }
}

class Horario {
    constructor(ruta_id, hora_salida, hora_llegada, dia_semana) {
        this.ruta_id = ruta_id
        this.hora_salida = hora_salida
        this.hora_llegada = hora_llegada
        this.dia_semana = dia_semana
    }
}
