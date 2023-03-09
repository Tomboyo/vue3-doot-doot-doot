<script setup>
import { ref } from 'vue'
const props = defineProps(['menu'])

const isMenuOpen = ref(false)
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value
</script>

<template>
    <div>
        <button class="menu-item-main" @click="toggleMenu" title="Show/Hide Menu">Menu</button>
        <div class="submenu" :class="isMenuOpen ? 'submenu-open' : ''">
            <a class="menu-item-minor" v-for="option in menu" :href="option.href">{{ option.title }}</a>
        </div>
    </div>
</template>

<style scoped>
.menu-item-main {
    background-color: #d7feff;
    padding: 0.5rem;
    font-size: 1rem;
    border: 0;
}

.submenu {
    background-color: #d7feff;
    padding: 0 0.5rem;
    max-height: 0;
    overflow: hidden;
    transition: all 0.15s ease-out;
}

.submenu-open {
    padding: 0.25rem 0.5rem;
    max-height: 100rem;
}


.menu-item-minor {
    padding-right: 0.5rem;
}

/* 
.menu-item-minor-show {
    transition: max-height 0.2s ease-out;
    max-height: 100rem;
}

.menu-item-minor-hide {
    transition: max-height 0.2s ease-in;
    max-height: 0rem;
} */
</style>
