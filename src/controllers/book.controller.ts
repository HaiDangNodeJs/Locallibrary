import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import i18next from 'i18next';
import { AuthorService } from '@src/services/author.service';
import { BookService } from '@src/services/book.service';
import { BookInstanceService } from '@src/services/book_instance.service';
import { GenreService } from '@src/services/genre.service';

const authorService = new AuthorService();
const bookService = new BookService();
const bookInstanceService = new BookInstanceService();
const genreService = new GenreService();

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
        bookInstanceService.getAllBookInstances(),
    ]);

    res.render('index', {
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
    res.send('NOT IMPLEMENTED: Book list');
});

// Hiển thị chi tiết trang cho một cuốn sách cụ thể.
export const getBookDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
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
