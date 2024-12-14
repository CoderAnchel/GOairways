export default defineEventHandler(async (event) => {
    try {
        const response = await fetch("http://localhost:3000/api/sendCookie", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: 'Juan',
                apellido: 'Perez',
                email: '',
                rol: 'admin',
            }),
        });

        if (!response.ok) {
            return { error: 'Error testing' };
        }

        const data = await response.json();
        return { message: 'test succesfull', data };
    } catch (error) {
        return { error: 'Error fetching data', details: error.message };
    }
});
