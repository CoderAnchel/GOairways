<script setup>
    useHead({
        title: 'Welcome',
        meta: [
            {
                name: 'description',
                content: 'Welcome to the system'
            }
        ],
    })
</script>
<template>
    <div class="welcome-container">
        <div style="display: flex; justify-content: center; height: 10%; align-items: center;">
            <h1 style="font-weight: 500 !important; font-size: 50px;">Welcome Back, Anchel!</h1>
        </div>
        <div style="display: flex; justify-content: center;  height: 80%;">
            <div style="display: flex; justify-content: center; align-items: center;">
                <div class="wall-wrapper">
                    <h2 style="font-weight: 400; font-size: 20px;">Worker Portal</h2>

                    <div class="wall">

                    </div>
                </div>

                <div class="wall-wrapper">
                    <h2 style="font-weight: 400; font-size: 20px;">Admin HUB</h2>

                    <div class="wall2">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .welcome-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: #e03131;
        color: #ffffff;
    }

    .wall-wrapper {
        margin:  60px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wall:hover{
        cursor: pointer;
        filter: blur(2px);
        transition: all 0.5s;
    }

    .wall2:hover:hover{
        cursor: pointer;
        filter: blur(2px);
        transition: all 0.5s;
    }


    .wall {
        margin-top: 20px;
        width: 20vw;
        min-height: 60vh !important;
        height: 60vh !important;
        background-image: url("public/LH-Wallpaper-Mobil-13.jpg");
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        border-radius: 30px;
        border: 2px solid #ffffff;
    }

    .wall2 {
        margin-top: 20px;
        width: 20vw;
        min-height: 60vh !important;
        height: 60vh !important;
        background-image: url("public/LH-Wallpaper-Mobil-41.jpg");
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        border-radius: 30px;
        border: 2px solid #ffffff;
    }
</style>
