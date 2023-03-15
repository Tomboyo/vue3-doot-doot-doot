<!--
    The primary site navigation, as a tab-group of links.
-->

<script setup>
import { ref } from 'vue';
import { useShelf } from './shelf.js'

const tabs = [{
    title: "Foo",
    panel: [{
        href: "#foo/foo",
        title: "Foo Foo"
    }, {
        href: "#foo/bar",
        title: "Foo Bar"
    }]
}, {
    title: "Bar",
    panel: [{
        href: "#bar/foo",
        title: "Bar Foo"
    }, {
        href: "#bar/bar",
        title: "Bar Bar"
    }, {
        href: "#bar/baz",
        title: "Bar Baz"
    }]
}, {
    title: "Baz",
    panel: [{
        href: "#baz/foo",
        title: "Baz Foo"
    }, {
        href: "#baz/bar",
        title: "Baz Bar"
    }]
}]

const domNav = ref(null)
const domTabs = ref(null)
const domPanels = ref(null)

const {
    focused: focusedTab,
    selected: selectedTab,
    select: selectTab,
    clear: clearTab
} = useShelf(domTabs)

const onNavFocusOut = (event) => {
    if (event.relatedTarget === null || !domNav.value.contains(event.relatedTarget)) {
        clearTab()
    }
}

</script>

<template>
    <div ref="domNav"
         class="nav"
         @mouseleave="clearTab"
         @focusout="onNavFocusOut">
        <div ref="domTabs"
             role="tabdata"
             aria-label="Navigation Tabs">
            <button v-for="tab, i in tabs"
                    @mouseover="selectTab(i)"
                    :id="'tab-' + i"
                    role="tab"
                    class="tab"
                    :class="selectedTab === i ? 'active' : false"
                    :aria-selected="selectedTab === i ? 'true' : 'false'"
                    :tabindex="focusedTab === i ? 0 : -1"
                    :aria-controls="'panel-' + i">{{ tab.title }}</button>
        </div>
        <div ref="domPanels"
             class="tabpanels"
             :class="selectedTab === null ? 'furl' : 'unfurl'">
            <div v-for="tab, i in tabs"
                 :id="'panel-' + i"
                 role="tabpanel"
                 class="tabpanel"
                 :tabindex="-1"
                 :aria-labelledby="'tab-' + i">
                <a v-for="link in tab.panel"
                   v-show="selectedTab === i"
                   class="link"
                   :href="link.href">{{ link.title }}</a>
            </div>
            <!-- Spacer to ensure the furl transition is smooth and links are hidden from the dom when their tab is not active. -->
            <div class="tabpanel"
                 v-show="selectedTab === null">
                <div class="link"
                     role="presentation"
                     tabindex="-1">&#8203;</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav {
    background-color: var(--bg-back-color);
    box-shadow: inset 0em 0.35em 0.25em -0.25em black;
}

.tabpanels {
    transition: all 0.2s ease-out;
    background-color: var(--bg-back-color);
}

.tabpanel {
    position: relative
}

.furl {
    max-height: 0;
    overflow: hidden;
}

.unfurl {
    /* The expected height of the content. Larger works; too much larger messes
       with the transition animation. */
    max-height: 3rem;
}

.tab,
.link {
    display: inline-block;
    padding: 0.5em;
    color: var(--text-color);
    border: 1px solid #ffffff00;
    font-weight: bold;
    transition: all 0.2s ease-out;
}

.tab {
    background-color: unset;
    font: unset;
}

.link {
    text-decoration: unset;
}

.tab.active {
    background-color: var(--bg-color)
}

.tab:focus,
.tab:hover,
.link:focus,
.link:hover {
    background-color: var(--bg-color);
    color: var(--text-focus-color);
    border-left-color: var(--bg-color-front);
}
</style>
