<script setup>
import { computed, ref } from 'vue';
const nav = [{
    title: "Foo",
    subnav: [{
        href: "#foo/foo",
        title: "Foo Foo"
    }, {
        href: "#foo/bar",
        title: "Foo Bar"
    }]
}, {
    title: "Bar",
    subnav: [{
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
    subnav: [{
        href: "#baz/foo",
        title: "Baz Foo"
    }, {
        href: "#baz/bar",
        title: "Baz Bar"
    }]
}]

const active = ref(null);
// const setActive = (id) => active.value = active.value == id ? null : id
const setActive = (id) => active.value = id
const tabindex = (i) => {
    let preceding = nav.slice(0, i)
    return preceding.length + preceding.reduce((acc, e) => acc + e.subnav.length, 0) + 1
}
const subTabindex = (i, j) => tabindex(i) + j + 1
const navContainer = ref(null)
const furl = event => {
    if (!navContainer.value.contains(event.relatedTarget)) {
        active.value = null
    }
}
</script>

<!--
    This is a collection of anchors grouped into tabs, only one of which is
    visible at a time. Tabs are arranged in the tab-bar, and their nested
    anchors are arranged below them in the anchor-bar. The anchor bar is hidden
    by default but "unfurls" beneath the tab-bar when tab groups are active,
    and "furls" again when no tab groups are active.

    The "furl" transition relies on the max-width property of the anchor-bar
    changing between 0 (furled) and a number at least as large as the expected
    height of its contents (unfurled). The visibility of all anchors is "hidden"
    unless their tab group is active. We need a "spacer" in the anchor-bar to
    make sure the height of the anchor-bar doesn't become 0 when all anchors are
    hidden, since this breaks the furl transition: the height would change from
    auto to 0, which transitions don't support. The spacer is zero-width but
    otherwise styled the same as other anchors so that its height is exactly
    the same as other anchors.
-->
<template>
    <div>
        <div ref="navContainer"
             @focusout="furl"
             @mouseleave="furl">
            <div id="tab-bar">
                <button v-for="group, i in nav"
                        class="nav-item"
                        @focusin="setActive(i)"
                        @mouseenter="setActive(i)"
                        :tabindex="tabindex(i)"> {{ group.title }} </button>
            </div>
            <div class="anchor-bar"
                 :class="active === null ? '' : 'unfurl'">
                <a id="spacer"
                   class="nav-item">u{200B}</a>
                <template v-for="group, i in nav">
                    <a v-for="link, j in group.subnav"
                       class="nav-item"
                       :href="link.href"
                       :tabindex="subTabindex(i, j)"
                       v-show="active === i"> {{ link.title }} </a>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
#tab-bar {
    background-color: var(--bg-back-color);
    box-shadow: inset 0em 0.35em 0.25em -0.25em black;
}

.anchor-bar {
    max-height: 0;
    transition: all 0.2s ease-out;
    overflow: hidden;
    background-color: var(--bg-back-color);
}

.unfurl {
    /* The expected height of the content. Larger works; too much larger messes
       with the transition animation. */
    max-height: 3rem;
}

.nav-item {
    border: unset;
    background-color: unset;
    font: unset;
    text-decoration: unset;
    outline: unset;

    display: inline-block;
    padding: 0.5em;
    color: var(--text-color);
    border: 1px solid #ffffff00;
    font-weight: bold;
    transition: all 0.2s ease-out;
}

.nav-item:hover,
.nav-item:focus {
    background-color: var(--bg-color);
    color: var(--text-focus-color);
    font-weight: bold;

    border-left-color: var(--bg-color-front);
}

#spacer {
    visibility: hidden;
    padding-left: 0;
    padding-right: 0;
    inline-size: 0;
}
</style>
