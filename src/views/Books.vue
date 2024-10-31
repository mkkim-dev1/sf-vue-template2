<!-- src/views/Books.vue -->
<template>
  <div class="books-container">
    <h1 class="title">Books</h1>

    <!-- 등록 버튼 -->
     <div style="width: 100%; display: flex; justify-content: flex-end; padding: 0.5rem;">
        <Button
          @click="openAddDialog"
          label="Add New Book"
          class="p-button-primary mb-3"
        />
     </div>

    <!-- 책 리스트 -->
    <DataTable
      :value="books"
      responsiveLayout="scroll"
      class="p-datatable-custom"
    >
      <Column field="id" header="ID" style="width: 50px; text-align: center" />
      <Column field="title" header="Title" style="width: 200px" />
      <Column field="author" header="Author" style="width: 150px" />
      <Column header="Actions" style="width: 150px; text-align: center">
        <template #body="slotProps">
          <Button
            @click="openEditDialog(slotProps.data)"
            label="Edit"
            class="p-button-success p-mr-2"
          />
          <Button
            @click="openDeleteDialog(slotProps.data.id)"
            label="Delete"
            class="p-button-danger"
          />
        </template>
      </Column>
    </DataTable>

    <!-- Book Dialog -->
    <BookDialog ref="bookDialog" @save="handleSave" @cancel="cancelAction" />

    <!-- 삭제 확인 다이얼로그 -->
    <Dialog
      header="Confirm Deletion"
      v-model:visible="deleteDialogVisible"
      modal
    >
      <p>Are you sure you want to delete this book?</p>
      <div class="dialog-buttons">
        <Button @click="deleteBook" label="Yes" class="p-button-danger" />
        <Button
          @click="closeDeleteDialog"
          label="No"
          class="p-button-secondary"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, Ref, VueElement } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import BookDialog from "../components/BookDialog.vue";
import { BooksComms, Book } from "@/comms/books";

const comms = inject<BooksComms>("comms");

const books = ref<Book[]>([]);

const deleteDialogVisible = ref(false);
const bookIdToDelete = ref<number | null>(null);
const bookDialog = ref() as Ref<InstanceType<typeof BookDialog>>;

onMounted(() => {  
  updateList();
});

async function updateList() {
  let res = await comms?.list();
  if (res?.success) {
    books.value.splice(0, books.value.length, ...res.content);
  }
  console.log(books.value);
}

function openAddDialog() {
  bookDialog.value.open(false, { id: 0, title: "", author: ""});
}

function openEditDialog(book: Book) {
  bookDialog.value.open(true, { ...book });
}

async function handleSave({ isEdit, book }: { isEdit: boolean; book: Book }) {
  if (isEdit) {
    await comms?.update(book);
    await updateList();
    // const index = books.value.findIndex((b) => b.id === book.id);
    // if (index !== -1) books.value[index] = { ...book };
  } else {
    const newId = books.value.length
      ? books.value[books.value.length - 1].id + 1
      : 1;
    await comms?.create({ ...book, id: newId });
    await updateList();
    // books.value.push({ ...book, id: newId });
  }
}

function cancelAction() {
  return;
}

function openDeleteDialog(bookId: number) {
  bookIdToDelete.value = bookId;
  deleteDialogVisible.value = true;
}

async function deleteBook() {
  if (bookIdToDelete.value) {
    await comms?.delete(bookIdToDelete.value);
    await updateList();
  }
  // books.value = books.value.filter((book) => book.id !== bookIdToDelete.value);
  deleteDialogVisible.value = false;
}

function closeDeleteDialog() {
  deleteDialogVisible.value = false;
}
</script>

<style scoped>
.books-container {
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.p-datatable-custom {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.p-datatable-custom .p-datatable-thead > tr > th {
  background-color: #007ad9;
  color: #ffffff;
  text-align: center;
  border: none;
}

.p-datatable-custom .p-datatable-tbody > tr:hover {
  background-color: #e8f4fd;
}

.p-datatable-custom .p-datatable-tbody > tr > td {
  text-align: center;
}

.dialog-buttons {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>
