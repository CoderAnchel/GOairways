export default defineEventHandler(async (event) => {
    try {
        const cookieHeader = event.node.req.headers.cookie || '';

        const response = await fetch("http://localhost:3000/api/reciveCookie", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieHeader,
            },
        });

        if (!response.ok) {
            return { error: 'Error reading cookie' };
        }

        const data = await response.json();
        return { message: 'Cookie read successful', data };
    } catch (error) {
        return { error: 'Error fetching data', details: error.message };
    }
});
