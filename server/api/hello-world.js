export default defineEventHandler(async (event) => {
    try {
        const response = await fetch("http://127.0.0.1:3010/GOairways/API/routes/active", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return { error: 'Error fetching data' };
        }

        const data = await response.json();
        return { message: 'Data fetched successfully', data };
    } catch (error) {
        return { error: 'Error fetching data', details: error.message };
    }
});
