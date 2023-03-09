<script setup>
import { ref } from 'vue'
const props = defineProps(['menu'])

const isMenuOpen = ref(false)
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value
</script>

<template>
    <div>
        <button class="menu-toggle" @click="toggleMenu" title="Show/Hide menu">Menu</button>
        <div class="spacer" v-show="isMenuOpen"></div>
        <a class="menu-item" v-show="isMenuOpen" v-for="option in menu" :href="option.href">{{ option.title }}</a>
    </div>
</template>

<style scoped>
.menu-toggle {
    position: fixed;
    border-radius: 0;
}

.spacer {
    height: 2rem;
}

.menu-item {
    display: block;
    padding-right: 1rem;
    margin-right: 1rem;
}
</style>
