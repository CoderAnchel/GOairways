<script setup>
    import { useToast } from "vue-toastification";

    useHead({
        title: 'Login',
        meta: [
            {
                name: 'description',
                content: 'Login to the system'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'public/passkey_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg' }
        ]
    })

    const login = useLoginStore()

    const toast = useToast();

    function mostrarNotificacionNoPIN() {
        toast.error("Send PIN to your email first!");
    }

    async function sendPin(DNI, password) {
        if (!DNI || !password) {
            toast.error("Please fill all the fields");
            return;
        }

        let response = generatePin(DNI, password);

        toast.warning("Sending PIN to your email...");

        try {
            response = await response;
            if (response) {
                login.PIN_isActive = true;
                toast.success("PIN sent to your email!");
            } else {
                toast.error("Error sending PIN");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function loginFunc(DNI, password, PIN) {
        if (!DNI || !password || !PIN) {
            toast.error("Please fill all the fields");
            return;
        }

        let response = useLoginNUXT(DNI, password, PIN);

        toast.warning("Logging in...");

        try {
            response = await response;
            if (!response) {
                toast.error("Error logging in");
                console.log(response);
            } else {
                toast.success("Logged in!");
                console.log(response);
                localStorage.setItem('token', response.token);
            }
        } catch (error) {
            console.log(error);
        }
    }

</script>
<template>
    <div class="login-container">
        <div class="login">
            <img style="display: flex; justify-self: flex-end; padding: 10px; margin-bottom: 0 !important;" src="public/form-log.svg" alt="">
            <div class="form" style="margin-top: 0 !important;">
                <div class="form-group">
                    <label for="email">DNI <img src="public/id_card_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt=""></label>
                    <input type="email" id="email" class="form-control" v-model="login.DNI"/>
                </div>
                <div class="form-group">
                    <label for="password">Password <img src="public/password_24dp_000000_FILL0_wght400_GRAD0_opsz24 (1).svg" alt=""></label>
                    <input type="password" id="password" class="form-control" v-model="login.Password"/>
                </div>

                <div v-if="!login.PIN_isActive" class="form-group">
                    <label for="password">PIN <img src="public/pin_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt=""></label>
                    <input type="text" id="password" class="form-control" :value="login.inactiveValue"/>
                </div>

                <div v-if="login.PIN_isActive" class="form-group">
                    <label style="color: #333333 !important;" for="password">PIN <img src="public/pin_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt=""></label>
                    <input type="password" id="password" class="form-control" v-model="login.PIN"/>
                </div>
                <button @click="sendPin(login.DNI, login.Password)" class="btn btn-primary">Send PIN</button>
                <button @click="mostrarNotificacionNoPIN" v-if="!login.PIN_isActive" type="submit" class="btn btn-primary">Login</button>
                <button @click="loginFunc(login.DNI, login.Password, login.PIN)" v-if="login.PIN_isActive" type="submit" class="btn btn-primary">Login</button>
            </div>
        </div>
    </div>
</template>
<style scoped>

    .form button:hover {
        cursor: pointer;
        background:  #ffffff;
        color: #e03131;
        border: 1px solid #e03131;
        transition: all 0.3s;
    }

    .form {
        padding: 20px;
    }

    .form-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }

    .form img {
        margin-left: 10px;
    }

    .form label {
        font-size: 20px;
        font-weight: 300;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }

    .form input {
        padding: 10px;
        font-size: 20px;
        border: 0.5px solid #d1d1d1;
        border-radius: 5px;
        font-weight: 300;
        font-size: 18px;
        outline: none;
        color: #333333;
    }

    .form button {
        padding: 10px;
        font-size: 20px;
        border: none;
        border-radius: 5px;
        background-color: #e03131;
        color: #ffffff;
        width: 100%;
        margin-bottom: 15px;
        border: 1px solid #ffffff;
        font-weight: 300;
    }

    .login-container {
        height: 95vh;
        width: 100%;
        background-image: url("public/blue-hour-romance.jpg");
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333333 !important
    }

    .login {
        width: 400px;
        height: 510px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
</style>
