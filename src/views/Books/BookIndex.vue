<template>
    <DataTable :value="books">
        <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Livros</span>
                <router-link to="/books/create" class="p-button p-button-primary p-button-rounded p-button-raised">Adicionar Livro</router-link>
            </div>
        </template>
        <Column field="bookCode" header="Código do Livro"></Column>
        <Column field="title" header="Título"></Column>
        <Column field="author" header="Autor"></Column>
        <Column header="Categoria">
            <template #body="slotProps">
                {{ slotProps.data.category.name }}
            </template>
        </Column>
        <Column field="publisher" header="Editora"></Column>
        <Column field="acquisitionValue" header="Valor de aquisição"></Column>
        <Column header="Grupo de precificação">
            <template #body="slotProps">
                {{ slotProps.data.pricingGroup.name }}
            </template>
        </Column>
        <Column field="quantity" header="Quantidade" />
        <Column header="Status">
            <template #body="slotProps">
                <Checkbox v-model="slotProps.data.status" disabled></Checkbox>
            </template>
        </Column>
        <Column header="Ações">
            <template #body="slotProps">
                <div class="flex gap-2">
                    <router-link :to="{ name: 'bookEdit', params: { id: slotProps.data.id } }" class="p-button p-button-primary p-button-rounded p-button-raised">Editar</router-link>
                    <Button type="button" label="Excluir" icon="pi pi-trash" class="p-button-danger p-button-rounded" @click="deleteBook(slotProps.data.id)"></Button>
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const books = ref([]);

const getBooks = () => {
    books.value = JSON.parse(localStorage.getItem('books')) || [];
}

const deleteBook = (id) => {
    const booksList = JSON.parse(localStorage.getItem('books')) || [];
    const newBooksList = booksList.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(newBooksList));
    getBooks();
}

onBeforeMount(() => {
    getBooks();
})

</script>