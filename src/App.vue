<script setup>
import PrimaryNav from './components/PrimaryNav.vue'
import SubNav from './components/SubNav.vue'

const headings = [
    { href: '#h1', title: '1 Heading' },
    [{ href: '#h1.1', title: '1.1 Heading' }],
    { href: '#h2', title: '2 Heading' },
    { href: '#h3', title: '3 Heading' }
]
</script>

<template>
    <header id="header">
        <h1 id="title">WEBSITE</h1>
        <PrimaryNav />
    </header>
    <main>
        <div id="two-column-layout">
            <SubNav class="left-column"
                    :data="headings" />
            <div id="right-column">
                <h1 id="h1">1 Heading</h1>
                <h2 id="h1.1">1.1 Sub-Heading</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                    non lorem bibendum, consectetur mauris non, efficitur nisi.
                    Quisque iaculis, nulla a pharetra posuere, ipsum ante suscipit
                    urna, nec semper orci leo quis ante. Aenean et tellus vitae est
                    congue auctor. Pellentesque sagittis, nisi et commodo bibendum,
                    arcu ante dictum est, in congue dui leo iaculis ante. Fusce
                    finibus odio vel hendrerit faucibus. Maecenas laoreet, nulla ac
                    commodo semper, lacus est rhoncus nunc, sed porta purus leo et
                    ligula. Ut suscipit nunc sed lacus elementum porta. Suspendisse
                    potenti. Curabitur nunc nibh, elementum lobortis purus nec,
                    rutrum porttitor ex. Curabitur ut velit mollis, varius magna at,
                    pretium quam. Vivamus viverra nulla quis nisl auctor interdum
                    vel vitae diam. Phasellus vestibulum consequat magna id egestas.
                    Duis consequat nisl interdum, fringilla purus eget, luctus
                    tortor. Morbi convallis odio non finibus aliquet. Maecenas eu
                    tincidunt arcu. Mauris varius tortor velit, porta feugiat nibh
                    consectetur sit amet.</p>
                <p>Suspendisse potenti. Donec viverra mi vitae ligula consequat, at
                    viverra nunc luctus. Morbi efficitur massa vel congue aliquam.
                    Nam tempus suscipit felis ultrices imperdiet. Integer ut libero
                    lacus. Suspendisse porttitor sed nulla sit amet imperdiet.
                    Quisque et sem vulputate leo aliquet sodales. Nulla facilisi.
                    Etiam eu pretium nunc. Proin pellentesque bibendum dolor. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Nunc viverra
                    lacinia nibh, porta tristique magna congue in. Phasellus
                    pharetra vitae orci non porttitor. Etiam vehicula hendrerit
                    libero, eu consequat enim ornare faucibus. Fusce efficitur,
                    massa ac posuere hendrerit, justo ipsum semper lacus, sed
                    vehicula tellus massa in lectus. Morbi gravida risus ac purus
                    placerat tempor.</p>
                <h1 id="h2">2 Heading</h1>
                <p>Integer eu velit nec erat tincidunt auctor. Nunc a fermentum
                    turpis, id pharetra sapien. Fusce in nisi rhoncus, faucibus elit
                    at, sagittis justo. Curabitur lacinia dui vel accumsan cursus.
                    Aliquam viverra vehicula facilisis. Vivamus nisl lorem, tempus
                    vel velit vitae, efficitur elementum nunc. Pellentesque
                    imperdiet nunc id risus sagittis tristique. Nullam et dui sit
                    amet libero bibendum vestibulum vel vitae eros. Etiam eget nunc
                    lorem. Sed eget vehicula tortor. Ut dapibus enim id orci
                    lobortis lobortis. Nunc lacinia sapien pretium, dignissim sem
                    at, finibus libero. Sed et libero risus. Nunc pellentesque dui
                    mattis nibh fringilla, quis placerat elit accumsan. Nullam
                    eleifend posuere mauris.</p>
                <h1 id="h3">3 Heading</h1>
                <p>Phasellus quis massa fermentum, ultricies nibh sit amet, mollis
                    sem. Sed ut pretium justo. Maecenas euismod lorem metus. Mauris
                    molestie at turpis eu dignissim. Sed quam mi, posuere sit amet
                    risus id, pretium pulvinar urna. Maecenas vestibulum cursus
                    purus, ac pellentesque massa pulvinar eget. In ornare mollis
                    finibus. Pellentesque vitae mi non diam auctor rhoncus. Sed sed
                    efficitur quam. Fusce at velit blandit, sodales tellus sit amet,
                    luctus mi.</p>
            </div>
        </div>
    </main>
</template>

<style scoped>
#title {
    color: var(--text-color);
}

#two-column-layout {
    display: flex;
    margin-top: 1rem;
}

.left-column {
    background-color: var(--bg-back-color);
    box-shadow: inset 0em 0.35em 0.25em -0.25em black;
    margin-right: 1em;
    padding-left: 0.5em;
    padding-right: 1em;
}

#right-column h1,
h2,
h3,
p {
    color: var(--text-color);
}
</style>

<style global>
html {
    --bg-back-color: #00212b;
    --bg-color: #003847;
    --bg-front-color: #839496;
    --bg-focus-color: #cdcdcd;
    --text-color: #93a1a1;
    --text-focus-color: #e2e2e2;

    background-color: var(--bg-color);
}
</style>
