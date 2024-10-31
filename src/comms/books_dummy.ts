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

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 5, title: 'Moby-Dick', author: 'Herman Melville' },
  ] as Book[];

function ReturnAwait<T>(value: T): Promise<T> {
    return new Promise((res, rej) => {
        res(value);
    });
}

class BooksComms {
  async create(book: Book): Promise<ApiResponse> {
    const newId = books.length ? books[books.length - 1].id + 1 : 1;
    books.push({ ...book, id: newId });
    
    return ReturnAwait({
        success: true,
        error:"",
        content: [book]
    } as ApiResponse);
  }

  async update(book: Book): Promise<ApiResponse> {
    const index = books.findIndex((b) => b.id === book.id);
    if (index !== -1) {
        books[index] = { ...book };
    }
    return ReturnAwait({
        success: true,
        error:"",
        content: [book]
    } as ApiResponse);
  }

  async delete(id: number): Promise<ApiResponse> {
    books = books.filter(book => book.id !== id);
    return ReturnAwait({
        success: true,
        error:"",
        content: [
            {
                id: id,
                title: "",
                author: ""
            }
        ]
    } as ApiResponse);
  }

  async list(): Promise<ApiResponse> {
    return ReturnAwait({
        success: true,
        error:"",
        content: books
    } as ApiResponse);
  }

  async get(id: number): Promise<ApiResponse> {
    const index = books.findIndex((b) => b.id === id);
    if (index != -1) {
        return ReturnAwait({
            success: true,
            error:"",
            content: [books[index]]
        } as ApiResponse);
    }
    return ReturnAwait({
        success: false,
        error:"not found"
    } as ApiResponse);
}
}

const comms = new BooksComms();

export { BooksComms, Book };

export default comms;