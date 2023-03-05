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
const containerClass = computed(() => selectedAuthor.value ? "ok" : "error")
</script>

<template>
  <div>
    <div class="container" :class="containerClass">
      <select v-model="selectedAuthor">
        <option disabled>Please select an author</option>
        <option v-for="book in books" :value="book.author">{{ book.author }}</option>
      </select>
      <div v-if="!selectedAuthor">Author is required.</div>
      <div v-if="selectedAuthor">{{ currentBook.title }}, by {{ currentBook.author }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
}

.ok {
  background-color: rgb(160, 221, 68);
}

.error {
  background-color: crimson;
}
</style>
