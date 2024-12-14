<script setup>
defineProps({
    id: String,
    name: String,
    value: String,
})
</script>
<template>
    <span class="date">
        <input type="checkbox" :id="id" :name="name" :value="value" style="margin-right: 20px;">
        <label for="monday">{{ name  }}</label>
    </span>
</template>
