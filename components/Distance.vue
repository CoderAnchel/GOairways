<script setup>
defineProps({
    distance: Number,
    tipo: String
})

</script>
<template>
    <div class="distance" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
            <h2 style="font-size: 20px; font-weight: 400">Distance</h2>
            <p style="font-size: 20px; font-weight: 300; margin-top: 10px;">{{ distance }} Km</p>
        </div>
        <span>{{ tipo  }}</span>
    </div>
</template>
<style>
    .distance {
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .distance h2 {
        font-weight: 500;
    }
    .distance p {
        font-weight: 300;
    }
    .distance span {
        font-weight: 300;
    }
</style>
