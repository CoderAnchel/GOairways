import { DateTime } from 'luxon';
//La fórmula Haversine calcula la distancia entre dos puntos sobre la esfera (en este caso, la Tierra), dados sus valores de latitud y longitud. La fórmula es la siguiente:
export function calcularDistancia(lat1, lon1, lat2, lon2) {
    const radioTierra = 6371; // en kilómetros
    const rad = Math.PI / 180; // Factor de conversión de grados a radianes


    // Convertir las latitudes y longitudes de grados a radianes
    const lat1Rad = lat1 * rad;
    const lon1Rad = lon1 * rad;
    const lat2Rad = lat2 * rad;
    const lon2Rad = lon2 * rad;

    // Diferencia entre las latitudes y longitudes
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

     // Aplicar la fórmula Haversine
     const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calcular la distancia
    const distancia = radioTierra * c;

    return parseInt(distancia); // Retorna la distancia en kilómetros
}

export function calcularTiempo(distancia) {
    const tiempo = distancia / 950;
    const horas = Math.floor(tiempo);
    const minutos = Math.round((tiempo - horas) * 60);
    return { horas, minutos };
}
// Función para calcular la hora de llegada
export function calcularHoraLlegada(horaSalida, duracionVuelo, zonaSalida, zonaLlegada) {
    // Convertir la hora de salida a un objeto DateTime con la zona horaria de salida
    const horaSalidaZona = DateTime.fromISO(horaSalida, { zone: zonaSalida });

    // Sumar la duración del vuelo
    const horaLlegadaZonaSalida = horaSalidaZona.plus({ hours: duracionVuelo.horas, minutes: duracionVuelo.minutos });

    // Si las zonas horarias son las mismas, retornar la hora de llegada directamente
    if (zonaSalida === zonaLlegada) {
        return horaLlegadaZonaSalida.toFormat("HH:mm");
    }

    // Convertir la hora de llegada al huso horario del aeropuerto de destino
    const horaLlegadaZonaDestino = horaLlegadaZonaSalida.setZone(zonaLlegada);

    // Formatear el resultado
    return horaLlegadaZonaDestino.toFormat("HH:mm");
}

export function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}
