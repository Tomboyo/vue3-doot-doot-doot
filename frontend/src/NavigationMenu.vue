<script setup>
import { ref } from 'vue'
const props = defineProps(['menu'])

const isMenuOpen = ref(false)
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value
</script>

<template>
    <div>
        <button class="menu-toggle" @click="toggleMenu" title="Show/Hide menu">☰</button>
        <a class="menu-item" v-show="isMenuOpen" v-for="option in menu" :href="option.href">{{ option.title }}</a>
    </div>
</template>

<style scoped>
.menu-item {
    display: block;
}
</style>
