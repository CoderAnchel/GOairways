import { ref } from 'vue'
import { useFetch } from '#app'

// NEEDS OWN GATEWAY ⚠️
export async function checkPlate(plate) {
    try {
        const response = await fetch("http://127.0.0.1:3010/GOairways/API/aviones/check/matricula/" +  plate, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return false
        }

        const data = await response.json()
        return data.available;
    } catch(err) {
        console.log("Error checking plate: ", err)
        return false
    }
}

export const useAirport = () => {
    const airports = ref([])
    const error = ref(null)
    const loading = ref(false)

    const { data, pending, error: fetchError } = useFetch("http://localhost:3000/api/gateway/airports")

    if (fetchError.value) {
        error.value = fetchError.value
    }

    if (pending.value) {
        loading.value = true
    }

    if (data.value) {
        airports.value = data.value
        loading.value = false
    }

    return {
        airports,
        error,
        loading,
    }
}


// NEEDS OWN GATEWAY ⚠️
export const usePlane = (id) => {
    const avion = ref([])
    const error = ref(null)
    const loading = ref(false)

    const { data, pending, error: fetchError } = useFetch("http://127.0.0.1:3010/GOairways/API/aviones/" + id)

    if (fetchError.value) {
        error.value = fetchError.value
    }

    if (pending.value) {
        loading.value = true
    }

    if (data.value) {
        avion.value = data.value
        loading.value = false
    }

    return {
        avion,
        error,
        loading,
    }
}

export const getModelNameById = (models, modelo_id) => {
    if (!models || !Array.isArray(models.value)) {
        return 'Unknown Model';
    }
    const model = models.value.find(model => model.id === modelo_id);
    return model ? model.modelo : 'Unknown Model';
}

export const useModels = () => {
    const models = ref([])
    const error = ref(null)
    const loading = ref(false)

    const { data, pending, error: fetchError } = useFetch("http://localhost:3000/api/gateway/models")

    if (fetchError.value) {
        error.value = fetchError.value
    }

    if (pending.value) {
        loading.value = true
    }

    if (data.value) {
        models.value = data.value
        loading.value = false
    }

    return {
        models,
        error,
        loading,
    }
}

export const usePlanes = () => {
    const planes = ref([])
    const error = ref(null)
    const loading = ref(false)

    const { data, pending, error: fetchError } = useFetch("http://localhost:3000/api/gateway/planes")

    if (fetchError.value) {
        error.value = fetchError.value
    }

    if (pending.value) {
        loading.value = true
    }

    if (data.value) {
        planes.value = data.value
        loading.value = false
    }

    return {
        planes,
        error,
        loading,
    }
}

export const useInactiveRoutes = () => {
    const routes = ref([])
    const error = ref(null)
    const loading = ref(false)

    const { data, pending, error: fetchError } = useFetch("http://localhost:3000/api/gateway/inactiveRoutes")

    if (fetchError.value) {
        error.value = fetchError.value
    }

    if (pending.value) {
        loading.value = true
    }

    if (data.value) {
        routes.value = data.value
        loading.value = false
    }

    return {
        routes,
        error,
        loading,
    }
}

export const crossRoutesData = (routes, airports) => {
    return routes.value.map(route => {
        const origin = airports.value.find(airport => airport.id === route.origen)
        const destination = airports.value.find(airport => airport.id === route.destino)
        return {
            ...route,
            origin: origin ? origin.nombre : route.origen,
            destination: destination ? destination.nombre : route.destino,
        }
    })
}

export const crossPlanesData = (planes, models) => {
    return planes.value.map(plane => {
        const model = models.value.find(model => model.id === plane.modelo_id)
        return {
            ...plane,
            model: model ? model.modelo : plane.modelo_id,
        }
    })
}

// NEEDS OWN GATEWAY ⚠️
export const acceptRoute = async (route) => {
    const response = await fetch("http://127.0.0.1:3010/GOairways/API/routes/accept/" + route.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Error accepting route')
    }

    return await response.json()
}

export const usePdfReciver = () => {
    const pdf = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const { data, pending, error: fetchError } = useFetch("http://127.0.0.1:3020/api/pdf/pdf")

    if (fetchError.value) {
        error.value = fetchError.value
    }

    if (pending.value) {
        loading.value = true
    }

    if (data.value) {
        pdf.value = data.value
        loading.value = false
    }

    return {
        pdf,
        error,
        loading,
    }
}

export async function downloadPdf() {
    const response = await fetch('http://127.0.0.1:3020/api/pdf/pdf', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


export async function generatePdf(route) {
    const response = await fetch('http://127.0.0.1:3020/api/pdf/generate-pdf',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(route),
    })

    if (!response.ok) {
        throw new Error('Error generating PDF')
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'route.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}


export async function createRoute(route) {
    const response = await fetch('http://127.0.0.1:3010/GOairways/API/routes/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(route),
    });

    if (!response.ok) {
        throw new Error('Error creating route');
    }

    return await response.json();
}
