<template>
    <h1>Editar Livro</h1>
    <div>
        <form @submit.prevent="saveBook" class="p-grid p-fluid" style="width: 50%; margin: 0 auto;">
            <div class="p-col-12">
                <label for="bookTitle">Título</label>
                <InputText required type="text" id="bookTitle" v-model="bookTitle" />
            </div>
            <div class="p-col-12">
                <label for="synopsis">Sinopse</label>
                <Textarea required id="synopsis" rows="5" cols="30" v-model="synopsis"></Textarea>
            </div>
            <div class="p-col-12 p-md-6">
                <label for="isbn">ISBN</label>
                <InputText required type="text" id="isbn" v-model="isbn" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="year">Ano</label>
                <InputText required type="text" id="year" v-model="year" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="edition">Edição</label>
                <InputText required type="text" id="edition" v-model="edition" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="numberOfPages">Número de Páginas</label>
                <InputText required type="text" id="numberOfPages" v-model="numberOfPages" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="height">Altura</label>
                <InputText required type="text" id="height" v-model="height" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="width">Largura</label>
                <InputText required type="text" id="width" v-model="width" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="depth">Profundidade</label>
                <InputText required type="text" id="depth" v-model="depth" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="weight">Peso</label>
                <InputText required type="text" id="weight" v-model="weight" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="author">Autor</label>
                <InputText required type="text" id="author" v-model="author" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="category">Categoria</label>
                <Dropdown required id="category" v-model="category" :options="categories" optionLabel="name" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="publisher">Editora</label>
                <InputText required type="text" id="publisher" v-model="publisher" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="acquisitionValue">Valor de Aquisição</label>
                <InputText required type="text" id="acquisitionValue" v-model="acquisitionValue" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="pricingGroup">Grupo de Preço</label>
                <Dropdown required id="pricingGroup" v-model="pricingGroup" :options="pricingGroups"
                    optionLabel="name" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="quantity">Quantidade</label>
                <InputText required type="number" id="quantity" v-model="quantity" />
            </div>
            <div class="p-col-12 p-md-6">
                <label for="status">Status</label>
                <Checkbox v-model="status" :binary="true" />
            </div>
            <div class="p-col-12 py-2">
                <Button type="submit" class="my-2">Salvar</Button>
                <Button type="button" severity="danger" @click="goBack()">Cancelar</Button>
            </div>

            <Dialog v-model:visible="visible" modal header="Justificar troca de Status" :style="{ width: '25rem' }">
                <div class="flex align-items-center gap-3 mb-3">
                    <label class="font-semibold w-6rem">Justificativa</label>
                    <Dropdown class="flex-auto" :options="reasons" optionLabel="name" v-model="reason" required />
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
                    <Button type="button" label="Salvar" @click="saveJustification"></Button>
                </div>
            </Dialog>

        </form>
    </div>


    <Toast />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { useToast } from 'primevue/usetoast';

const toast = useToast();

const router = useRouter();

const book = ref();
const books = ref(JSON.parse(localStorage.getItem('books')) || []);

const visible = ref(false);

const bookTitle = ref();
const synopsis = ref();
const bookCode = ref();
const isbn = ref();
const year = ref();
const edition = ref();
const numberOfPages = ref();
const height = ref();
const width = ref();
const depth = ref();
const weight = ref();
const author = ref();
const category = ref();
const publisher = ref();
const acquisitionValue = ref();
const pricingGroup = ref();
const barcode = ref();
const quantity = ref();
const status = ref();
const reason = ref();

const reasons = ref([
    { id: 1, name: "Troca de status" },
    { id: 2, name: "Baixa Venda" }
]);

const pricingGroups = ref([
    { id: 1, name: "R$ 29,90 - R$ 44,90" },
    { id: 2, name: "R$ 45,00 - R$ 59,90" },
    { id: 3, name: "R$ 60,00 - R$ 74,90" },
    { id: 4, name: "R$ 75,00 - R$ 89,90" },
    { id: 5, name: "R$ 90,00 - R$ 104,90" },
    { id: 6, name: "R$ 105,00 - R$ 119,90" },
    { id: 7, name: "R$ 120,00 - R$ 134,90" },
    { id: 8, name: "R$ 135,00 - R$ 149,90" },
    { id: 9, name: "R$ 150,00 - R$ 164,90" },
    { id: 10, name: "R$ 165,00 - R$ 179,90" },
    { id: 11, name: "R$ 180,00 - R$ 194,90" },
    { id: 12, name: "R$ 195,00 - R$ 209,90" },
    { id: 13, name: "R$ 210,00 - R$ 224,90" },
    { id: 14, name: "R$ 225,00 - R$ 239,90" },
    { id: 15, name: "R$ 240,00 - R$ 254,90" },
    { id: 16, name: "R$ 255,00 - R$ 269,90" },
    { id: 17, name: "R$ 270,00 - R$ 284,90" },
    { id: 18, name: "R$ 285,00 - R$ 299,90" },
    { id: 19, name: "R$ 300,00 - R$ 314,90" },
    { id: 20, name: "R$ 315,00 - R$ 329,90" },
    { id: 21, name: "R$ 330,00 - R$ 344,90" }
]);

const categories = ref([
    { id: 1, name: "Ficção Científica" },
    { id: 2, name: "Romance" },
    { id: 3, name: "Fantasia" },
    { id: 4, name: "Mistério" },
    { id: 5, name: "Não Ficção" },
    { id: 6, name: "Terror" },
    { id: 7, name: "História" },
    { id: 8, name: "Policial" },
    { id: 9, name: "Aventura" },
    { id: 10, name: "Autoajuda" },
    { id: 11, name: "Biografia" },
    { id: 12, name: "Clássico" },
    { id: 13, name: "Comédia" },
    { id: 14, name: "Conto" },
    { id: 15, name: "Culinária" },
    { id: 16, name: "Drama" },
    { id: 17, name: "Educação" },
    { id: 18, name: "Espiritualidade" },
    { id: 19, name: "Esporte" },
    { id: 20, name: "Família e Relacionamentos" },
    { id: 21, name: "Ficção" }
]);

const getOneBookById = (id) => {
    book.value = JSON.parse(localStorage.getItem('books')).find(book => book.id == id);
    bookTitle.value = book.value.title;
    synopsis.value = book.value.synopsis;
    isbn.value = book.value.isbn;
    year.value = book.value.year;
    edition.value = book.value.edition;
    numberOfPages.value = book.value.numberOfPages;
    height.value = book.value.height;
    width.value = book.value.width;
    depth.value = book.value.depth;
    weight.value = book.value.weight;
    author.value = book.value.author;
    category.value = book.value.category;
    publisher.value = book.value.publisher;
    acquisitionValue.value = book.value.acquisitionValue;
    pricingGroup.value = book.value.pricingGroup;
    quantity.value = book.value.quantity;
    status.value = book.value.status;

};

const saveBook = () => {
    const payload = {
        id: book.value.id,
        title: bookTitle.value,
        bookCode: book.value.bookCode,
        synopsis: synopsis.value,
        isbn: isbn.value,
        year: year.value,
        edition: edition.value,
        numberOfPages: numberOfPages.value,
        height: height.value,
        width: width.value,
        depth: depth.value,
        weight: weight.value,
        author: author.value,
        category: category.value,
        publisher: publisher.value,
        acquisitionValue: acquisitionValue.value,
        pricingGroup: pricingGroup.value,
        barcode: book.value.barcode,
        quantity: quantity.value,
        status: status.value
    };

    if (status.value != book.value.status) {
        visible.value = true;
    } else {
        const index = books.value.findIndex(item => item.id == book.value.id);
        books.value[index] = payload;

        localStorage.setItem('books', JSON.stringify(books.value));

        toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro cadastrado com sucesso' });
        setTimeout(() => {
            router.push({ name: 'bookIndex' });
        }, 1500);
    }
};

const saveJustification = () => {
    const justification = {
        bookId: book.value.id,
        reason: reason.value
    };

    const justifications = JSON.parse(localStorage.getItem('justifications')) || [];
    justifications.push(justification);
    localStorage.setItem('justifications', JSON.stringify(justifications));

    const payload = {
        id: book.value.id,
        title: bookTitle.value,
        bookCode: book.value.bookCode,
        synopsis: synopsis.value,
        isbn: isbn.value,
        year: year.value,
        edition: edition.value,
        numberOfPages: numberOfPages.value,
        height: height.value,
        width: width.value,
        depth: depth.value,
        weight: weight.value,
        author: author.value,
        category: category.value,
        publisher: publisher.value,
        acquisitionValue: acquisitionValue.value,
        pricingGroup: pricingGroup.value,
        barcode: book.value.barcode,
        quantity: quantity.value,
        status: status.value
    };

    const index = books.value.findIndex(item => item.id == book.value.id);
    books.value[index] = payload;

    localStorage.setItem('books', JSON.stringify(books.value));

    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro cadastrado com sucesso' });
    setTimeout(() => {
        router.push({ name: 'bookIndex' });
    }, 1500);
};

const goBack = () => {
    router.go(-1);
};

onBeforeMount(() => {
    getOneBookById(router.currentRoute.value.params.id);
});

</script>