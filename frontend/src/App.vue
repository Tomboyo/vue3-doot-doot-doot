<script setup>
import { computed, ref, reactive } from "vue"
const books = [
  {
    author: 'Bloch',
    title: 'Effective Java'
  },
  {
    author: 'Evil Hat',
    title: 'Fate Core System'
  }];

const selectedAuthor = ref(false);
const currentBook = computed(() => books.find(book => book.author === selectedAuthor.value))
</script>

<template>
  <header>
    <h1>Books</h1>
  </header>

  <main>
    <select v-model="selectedAuthor">
      <option disabled>Please select an author</option>
      <option v-for="book in books" :value="book.author">{{ book.author }}</option>
    </select>
    <div v-if="selectedAuthor">{{ currentBook.title }}, by {{ currentBook.author }}</div>
  </main>
</template>

<style scoped>
</style>
