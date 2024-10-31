import {postJson, getJson, deleteJson, putJson} from "./utils";

type Book = {
    id: number
    title: string
    author: string
}

type ApiResponse = {
    success: boolean
    error: string
    content: Book[]
}

class BooksComms {
  async create(book: Book): Promise<ApiResponse> {
    return (await postJson("/books", book)) as ApiResponse;
  }

  async update(book: Book): Promise<ApiResponse> {
    return (await putJson(`/books/${book.id}`, book)) as ApiResponse;
  }

  async delete(id: number): Promise<ApiResponse> {
    return (await deleteJson(`/books/${id}`)) as ApiResponse;
  }

  async list(): Promise<ApiResponse> {
    return (await getJson("/books")) as ApiResponse;
  }

  async get(id: number): Promise<ApiResponse> {
    return (await getJson(`/books/${id}`)) as ApiResponse;
  }
}

const books = new BooksComms();

export { BooksComms, Book };

export default books;