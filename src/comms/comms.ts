
import {Book, BooksComms} from './books'
import books from './books'
import books_dummy from './books_dummy';

let current: any; 

if (!process.env.VUE_APP_SERVICE_URL || process.env.VUE_APP_SERVICE_URL.trim() == '') {
    current = books_dummy;
} else {
    current = books;
}

export { BooksComms, Book };

export default current;