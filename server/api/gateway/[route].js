export default defineEventHandler(async (event) => {
    const { res } = event.node;

    try {
        const {route} = event.context.params;

        const cookieHeader = event.node.req.headers.cookie || '';

        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
            const [name, value] = cookie.trim().split('=');
            acc[name] = value;
            return acc;
        }, {});

        const token = cookies.AuthToken

        const data = {
            dni: "hola",
            password: "adios",
            pin: 45
        }

        switch(route) {
            case 'testPINIA':
                const call = await apiCallGet("http://127.0.0.1:3010/GOairways/API/pruebaJWT",token)

                return { message:  call, token: token}
            case 'test2PINIA':
                return { message: 'test2' }
            case 'airports':
                const call2 = await apiCallGet("http://127.0.0.1:3010/GOairways/API/aereopuertos", token)

                return call2
            case 'planes':
                const call3 = await apiCallGet("http://127.0.0.1:3010/GOairways/API/aviones", token)

                return call3
            case 'models':
                const call4 = await apiCallGet("http://127.0.0.1:3010/GOairways/API/modelos/find/null", token)

                return call4
            case 'inactiveRoutes':
                const call5 = await apiCallGet("http://127.0.0.1:3010/GOairways/API/routes/inactive", token)

                return call5
            default:
                return { error: 'invalid route' }
        }

    } catch (error) {
        return { error: 'Parametros ausentes' };
    }
});

async function apiCallGet(route, token) {
    const response = await fetch(route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
        },
    })

    const jsonResponse = await response.json();
    console.log(jsonResponse)
    return jsonResponse;
}
