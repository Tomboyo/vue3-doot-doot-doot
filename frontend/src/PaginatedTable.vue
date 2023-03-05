<script setup>
import { computed, ref } from 'vue'
const props = defineProps(['getPageData', 'rowHeaders', 'rowValues'])

const pageNumber = ref(0)
const perPage = ref(2)

const currentPage = computed(() => props.getPageData(pageNumber.value, perPage.value))

const nextPage = () => {
    if (currentPage.value.hasNext) {
        pageNumber.value++
    }
}
const prevPage = () => {
    if (currentPage.value.hasPrevious) {
        pageNumber.value--
    }
}
</script>

<template>
    <div>
        <div class="buttons">
            <button @click="prevPage" :disabled="!currentPage.hasPrevious">Prev</button>
            {{ pageNumber + 1 }}
            <button @click="nextPage" :disabled="!currentPage.hasNext">Next</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th v-for="header in rowHeaders">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="array in currentPage.data">
                    <td v-for="value in rowValues(array)">{{ value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
}

th {
    text-align: left;
}

th,
td {
    border: 1px solid #999;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.25rem;
}
</style>
