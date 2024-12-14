<script setup>
    useHead({
        link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon2.svg' }
        ]
    })
</script>
<template>
    <div>
        <Navbar />
        <slot />
    </div>
</template>
