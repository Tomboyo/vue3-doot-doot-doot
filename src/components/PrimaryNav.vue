<script setup>
import { computed, ref } from 'vue';
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

const focusedTab = ref(0)

const activeTabPanel = ref(null)
const isActiveTabPanel = (i) => activeTabPanel.value === i

const isTabNavigable = (tab) => tab === focusedTab.value

const onNavMouseLeave = (_event) => activeTabPanel.value = null
const onNavFocusOut = (event) => {
    if (event.relatedTarget === null || !domNav.value.contains(event.relatedTarget)) {
        activeTabPanel.value = null
    }
}

const onTabMouseOver = (i) => activeTabPanel.value = i
const onTabKeydown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        if (event.key === 'ArrowRight') {
            focusedTab.value++
            if (focusedTab.value == tabs.length) {
                focusedTab.value = 0
            }
        } else {
            focusedTab.value--
            if (focusedTab.value < 0) {
                focusedTab.value = tabs.length - 1
            }
        }

        domTabs.value.children[focusedTab.value].focus()
    } else if (event.key === 'Enter') {
        activeTabPanel.value = focusedTab.value
    }
}
</script>

<!--
    An accessible, keyboard-navigable tabgroup of anchors.

    A tab bar holds all tab labels, and below it a panel holds the content of
    the tab panel. The tab panels contain several anchors each. A given panel of
    anchors is only visible if its tab is active. Otherwise, the entire panel is
    hidden. If no tab is active, only the tabs themselves are visible.

    When a tab is activated (by clicking or using the keyboard), the appropriate
    panel unfurls below the tab bar. When it is deactivated (such as because the
    nav lost focus), the panel furls back up.

    Anchors are hidden when their panel is hidden so that the user cannot tab to
    a hidden anchor. (We could choose to tabindex=-1 these anchors instead, but
    it triggers accessibility warnings for hidden anchors.)

    Because the sudden invisibility of anchors would change the width of the
    active panel from auto to 0 when the panel is about to close, the transition
    (based on max-height) would stop working. We currently use a "spacer" panel
    that becomes visible only when all other tab panels are hidden, which is
    then furled up. The anchor text still disappears suddenly, but the furl
    animation is smooth.
-->
<template>
    <div ref="domNav"
         class="nav"
         @mouseleave="onNavMouseLeave"
         @focusout="onNavFocusOut">
        <div ref="domTabs"
             role="tabdata"
             aria-label="Navigation Tabs"
             @keydown="onTabKeydown">
            <button v-for="tab, i in tabs"
                    @mouseover="onTabMouseOver(i)"
                    @mousedown="event => event.preventDefault()"
                    :id="'tab-' + i"
                    role="tab"
                    class="tab"
                    :class="isActiveTabPanel(i) ? 'active' : false"
                    :aria-selected="isActiveTabPanel(i)"
                    :tabindex="isTabNavigable(i) ? 0 : -1"
                    :aria-controls="'panel-' + i">{{ tab.title }}</button>
        </div>
        <div ref="domPanels"
             class="tabpanels"
             :class="isActiveTabPanel(null) ? 'furl' : 'unfurl'">
            <div v-for="tab, i in tabs"
                 :id="'panel-' + i"
                 role="tabpanel"
                 class="tabpanel"
                 :tabindex="-1"
                 :aria-labelledby="'tab-' + i">
                <!-- :tabindex="isActiveTabPanel(i) ? 0 : -1" -->
                <a v-for="link in tab.panel"
                   v-show="isActiveTabPanel(i)"
                   class="link"
                   :href="link.href">{{ link.title }}</a>
            </div>
            <!-- Spacer to ensure the furl transition is smooth and links are
                             hidden from the dom when their tab is not active. -->
            <div class="tabpanel"
                 v-show="isActiveTabPanel(null)">
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
    outline: unset;
    background-color: var(--bg-color);
    color: var(--text-focus-color);
    border-left-color: var(--bg-color-front);
}
</style>
