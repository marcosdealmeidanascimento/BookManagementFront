<script setup>
import { ref, onBeforeMount } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import apiClient from './helpers/axios';

const books = ref([]);

const getBooks = () => {
  apiClient.get('/books/all')
    .then(response => {
      books.value = response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const bookData = {
  "bookTitle": "BookTitleBookTitle",
  "synopsis": "SynopsisSynopsisAA",
  "isbn": "ISBNAha",
  "year": 10,
  "edition": "Edition",
  "numberOfPages": "123",
  "height": 10,
  "width": 10,
  "depth": 10,
  "weight": 10,
  "price": 10.10
};

const createBook = () => {
  apiClient.post('/books', bookData).then(() => getBooks());
};

onBeforeMount(() => {
  getBooks();
});

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <Button label="Create Book" @click="createBook" />
    </div>
    <DataTable :value="books" class="dt">
      <Column field="bookTitle" header="Name" class="column" />
    </DataTable>
  </header>
</template>

<style scoped>
.meme {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
