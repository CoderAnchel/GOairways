import jwt from 'jsonwebtoken';

const SECRET_KEY = 'estoEsUnSecretoSobreUnaAereolineaMuyBonitaYmuySegura';

export default defineEventHandler(async (event) => {
    const { res } = event.node;

    try {
            const body = await readBody(event);

            const { dni, password, pin } = body;

            const data = {
                dni: dni,
                password: password,
                pin: parseInt(pin)
            }

            const payload = {
                DNI: data.dni,
                password: data.password,
                PIN: data.pin,
            }

            const response = await fetch("http://127.0.0.1:3010/GOairways/API/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    DNI: payload.DNI,
                    Password: payload.password,
                    PIN: payload.PIN,
                }),
                credentials: "include",
            })

            if (!response.ok) {
                console.log("error")
                return false
            }

            if (response.ok) {
                console.log("user verifyed ✅")

                const option = {
                    expiresIn: '1h',
                }

                const token = jwt.sign(payload, SECRET_KEY, option);

                res.setHeader(
                    'Set-Cookie',
                    `AuthToken=${token}; Path=/; HttpOnly; SameSite=Strict`
                );

                return {
                    message: 'JWT has been created and set as a cookie validating on the back!',
                    token, // Devolver el token en la respuesta (solo para desarrollo)
                };
            }
    } catch (error) {
        return { error: 'Error fetching data', details: error.message };
    }
})
