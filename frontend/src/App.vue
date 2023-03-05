<script setup>
import { computed, ref } from 'vue'
import BookSearch from './BookSearch.vue'
import BookList from './BookList.vue'
import NavigationMenu from './NavigationMenu.vue'

const routes = [
    {
        href: '#',
        title: 'Home',
        component: null
    }, {
        href: '#booksearch',
        title: 'Book Search',
        component: BookSearch
    }, {
        href: '#booklist',
        title: 'Book List',
        component: BookList
    }]

const locationHash = ref(window.location.hash)
window.addEventListener('hashchange', _ => locationHash.value = window.location.hash)

const currentRoute = computed(() => routes.find(route => route.href === locationHash.value) || routes[0])
</script>

<template>
    <div class="centering-container">
        <div class="content">
            <div class="two-column">
                <header class="left">
                    <NavigationMenu :menu="routes" />
                </header>

                <main class="right">
                    <div>
                        <h1>{{ currentRoute.title }}</h1>
                        <hr />
                        <component :is="currentRoute.component" />
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 35rem) {
    .centering-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
}

@media (max-width: 35rem) {
    .centering-container {
        width: 100%;
    }
}

.content {
    width: 100%;
    max-width: 35rem;
}

.two-column {
    display: flex;
    flex-direction: row;
    justify-content: left;
}

.left {
    padding-right: 1rem;
    margin-right: 1rem;
    border-right: 1px solid #999;
    flex-shrink: 0;
}
</style>
