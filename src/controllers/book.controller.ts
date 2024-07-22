import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import i18next from '../i18n';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { BookInstanceService } from '../services/book_instance.service';
import { GenreService } from '../services/genre.service';
import { BookInstanceStatus } from '@src/enums/book_instance_status';

const authorService = new AuthorService();
const bookService = new BookService();
const bookInstanceService = new BookInstanceService();
const genreService = new GenreService();

const validateBook = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        req.flash('error', req.t('error.invalidBookId'));
        return res.redirect('/error');
    }
    const book = await bookService.getBookById(id);
    if (book === null) {
        req.flash('error', req.t('error.bookNotFound'));
        return res.redirect('/error');
    }
    return book;
}

export const index = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const [
        numAuthors,
        numBooks,
        numGenres,
        numBookInstances,
        availableBookInstances,
    ] = await Promise.all([
        authorService.getIndexData(),
        bookService.getIndexData(),
        genreService.getIndexData(),
        bookInstanceService.getIndexData(),
        bookInstanceService.getIndexBookInstances(),
    ]);

    res.render('index', {
        title: 'home.local_library',
        book_count: numBooks,
        author_count: numAuthors,
        genre_count: numGenres,
        book_instance_count: numBookInstances,
        book_instance_available_count: availableBookInstances,
        t: i18next.t.bind(i18next)
    });
});
// Hiển thị danh sách tất cả các sách.
export const getAllBooks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const books = await bookService.getBooks();
    res.render('books/index', { books, title: req.t('book.title.listOfBook') });
});

// Hiển thị chi tiết trang cho một cuốn sách cụ thể.
export const getBookDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = await validateBook(req, res, next)
    res.render('books/show', {
        book,
        bookInstances: book?.bookInstances,
        bookGenres: book?.genres,
        bookInstanceStatuses: book?.bookInstances,
        BookInstanceStatus
    })
});

// Hiển thị form tạo sách mới bằng phương thức GET.
export const createBookForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Book is created with method GET');
});

// Xử lý tạo sách mới bằng phương thức POST.
export const createBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Book is created with method POST');
});

// Hiển thị form xóa sách bằng phương thức GET.
export const deleteBookForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book ${req.params.id} is deleted with method GET`);
});

// Xử lý xóa sách bằng phương thức POST.
export const deleteBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book ${req.params.id} is deleted with method POST`);
});

// Hiển thị form cập nhật sách bằng phương thức GET.
export const updateBookForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book ${req.params.id} is updated with method GET`);
});

// Xử lý cập nhật sách bằng phương thức POST.
export const updateBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book ${req.params.id} is updated with method POST`);
});
