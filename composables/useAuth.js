import { toast } from "sonner";
import { useToast } from "vue-toastification";

export const generatePin = async (DNI, password) => {
    const response = await fetch("http://127.0.0.1:3010/GOairways/API/auth/generatePIN", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dni: DNI,
            password: password,
        }),
        credentials: "include",
    })

    if (response.status === 200) {
        return true;
    }

    return false;
}

export const useLogin = async (DNI, password, PIN) => {
    const response = await fetch("http://127.0.0.1:3010/GOairways/API/auth/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            DNI: DNI,
            Password: password,
            PIN: parseInt(PIN),
        }),
        credentials: "include",
    })

    if (!response.ok) {
        return false
    }

    return response.json();
}
export const useLoginNUXT = async (DNI, password, PIN) => {
    const response = await fetch("http://localhost:3000/api/sendCookie",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dni: DNI,
            password: password,
            pin: parseInt(PIN),
        }),
    })

    if (!response.ok) {
        return false
    }

    return response.json();
}
