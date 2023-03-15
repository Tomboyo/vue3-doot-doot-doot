<!--
    Renders a list of links or other lists of links into an arbitrarily deep ul
    of other uls and anchors tags.
-->

<script>
/**
 * Renders a list of links as an unordered list, where nested links appear in
 * nested lists.
 * 
 * No components are styled. The caller should provider :deep css for `ul` and
 * `a` tags.
 */
export default {
    props: {
        /**
         * An array of link objects `{ href: String, title: String }` and
         * arbitrarily nested lists of link objects. A list of lists evaluates
         * to a `ul` containing `ul`s.
         */
        data: {
            type: Array
        }
    }
}
</script>

<template>
    <ul>
        <template v-for="element in data">
            <template v-if="Array.isArray(element)">
                <LinkList :data="element" />
            </template>
            <template v-else>
                <li><a href="element.href">{{ element.title }}</a></li>
            </template>
        </template>
    </ul>
</template>
