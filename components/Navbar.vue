<script setup>

</script>
<template>
    <div class="wrapper">
        <div class="navbar">
            <div class="logo-wrapper">
                <img src="public/biglogo.svg" alt="logo-GOairways">
            </div>
            <div class="buttons">
                <button class="button">Inicie Sesión o regístrese <img width="40px" style="padding-left: 10px !important;" src="public/account_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt=""></button>
                <button class="button">Español <img width="40px" style="padding-left: 10px !important;" src="public/public_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt=""></button>
            </div>
        </div>
    </div>
</template>
<style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Lexend+Exa:wght@100..900&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap');

    .buttons {
        display: flex;
        width: 400px;
        justify-content: space-between;
    }

    .button {
        font-family: roboto;
        border: none;
        border-radius: 0.5rem;
        background-color: #e03131;
        color: white;
        font-size: 1.1rem;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 4rem !important;
        background-color: #e03131;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo-wrapper {
        width: 270px;
    }

    .logo-wrapper img {
        width: 100%;
    }
</style>

