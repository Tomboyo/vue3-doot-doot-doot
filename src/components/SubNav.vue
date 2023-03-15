<script>
import LinkList from './LinkList.vue'

/** A navigation bar for content in the current page (e.g. links to headers). */
export default {
    props: {
        /**
         * An array of link objects `{ href: String, title: String }` and
         * arbitrarily nested lists of link objects to render as a nvaigation
         * bar.
         */
        data: {
            required: true
        }
    },
    components: {
        LinkList
    }
}
</script>

<template>
    <div>
        <nav class="container">
            <LinkList :data="data" />
        </nav>
    </div>
</template>

<style scoped>
.container :deep(ul) {
    padding-left: 1.5em;
}

.container :deep(a) {
    text-decoration: unset;
    color: var(--text-color);
    transition: all 0.2s ease-out;
}

.container :deep(a):hover,
.container :deep(a):focus {
    color: var(--text-focus-color)
}
</style>
