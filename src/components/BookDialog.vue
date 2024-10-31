<!-- src/components/BookDialog.vue -->
<template>
    <Dialog :header="isEdit ? 'Edit Book' : 'Add New Book'" v-model:visible="visible" modal>
      <div class="book-form">
        <label>Title: <InputText v-model="bookData.title" /></label>
        <label>Author: <InputText v-model="bookData.author" /></label>
        <div class="dialog-buttons">
          <Button @click="confirmAction" :label="isEdit ? 'Save' : 'Add'" class="p-button-primary" />
          <Button @click="cancelAction" label="Cancel" class="p-button-secondary" />
        </div>
      </div>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits, watch, defineExpose } from 'vue';
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import { Book } from '@/comms/books';
    
  // Props and Emit setup
  // const props = defineProps<{
  //   isEdit: boolean;
  //   initialBookData: Book | null;
  // }>();
  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
    (e: 'save', book: {isEdit: boolean, book: Book}): void;
    (e: 'cancel'): void;
  }>();

  const isEdit = ref(false);
  const visible = ref(false);
  
  // Book data handling
  const bookData = ref<Book>({ id: 0, title: '', author: ''});
  
  // watch(
  //   () => props.initialBookData,
  //   (newData) => {
  //     bookData.value = newData ? { ...newData } : { id: 0, title: '', author: '', year: 0 };
  //   },
  //   { immediate: true }
  // );

  function open(edit: boolean, initialBookData: Book) {
    isEdit.value = edit;
    bookData.value = {...initialBookData};
    visible.value = true;
  }

  function close() {
    visible.value = false;
  }
  
  function confirmAction() {
    emit('save', {isEdit: isEdit.value, book: { ...bookData.value }});
    visible.value = false;
  }
  
  function cancelAction() {
    emit('cancel');
    visible.value = false;
  }

  defineExpose({
    open,
    close
  })

  </script>
  
  <style scoped>
  .dialog-buttons {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
  
  .book-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  </style>
  