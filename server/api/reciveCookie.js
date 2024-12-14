export default defineEventHandler((event) => {
    try {
        // Acceder al encabezado de las cookies
        const cookieHeader = event.node.req.headers.cookie || '';

        // Parsear las cookies desde el encabezado
        const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
            const [name, value] = cookie.trim().split('=');
            acc[name] = value;
            return acc;
        }, {});

        console.log('Cookies:', cookies);
        const token = cookies.TestAuthToken;

        if (!token) {
            return {
                error: 'No token found in cookies',
            };
        }

        // Si el token existe, puedes devolverlo (o procesarlo de alguna manera)
        return {
            message: 'Token found in cookies',
            token,  // Aquí puedes devolver el valor del token
        };
    } catch (error) {
        return {
            error: 'Error reading cookies',
            details: error.message,
        };
    }
});
