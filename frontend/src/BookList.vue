<script setup>
import PaginatedTable from './PaginatedTable.vue'
const books = [
    {
        id: '1',
        author: 'Bloch',
        title: 'Effective Java'
    },
    {
        id: '2',
        author: 'Evil Hat',
        title: 'Fate Core System'
    },
    {
        id: '3',
        author: 'Peter M. Senge',
        title: 'The Fifth Discipline'
    }];

const getPageData = (pageNumber, perPage) => {
    let start = perPage * pageNumber
    let end = start + perPage
    let hasNext = end < books.length ? true : false
    let hasPrevious = start > 0 ? true : false
    return { hasNext, hasPrevious, data: books.slice(start, end) }
}
const rowHeaders = ["id", "author", "title"]
const rowValues = (book) => [book.id, book.author, book.title]
</script>

<template>
    <PaginatedTable :getPageData="getPageData" :rowHeaders="rowHeaders" :rowValues="rowValues" />
</template>
