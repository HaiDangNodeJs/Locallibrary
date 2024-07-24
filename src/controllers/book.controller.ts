import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import i18next from '../i18n';
import { AuthorService } from '../services/author.service';
import { BookService } from '../services/book.service';
import { BookInstanceService } from '../services/book_instance.service';
import { GenreService } from '../services/genre.service';
import { BookInstanceStatus } from '@src/enums/book_instance_status';
import { body, validationResult } from 'express-validator';
import Genre from '@src/entity/genre.entity';

const authorService = new AuthorService();
const bookService = new BookService();
const bookInstanceService = new BookInstanceService();
const genreService = new GenreService();

type GenreChecked = Genre & { checked?: string };

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

const validateBookFields = [
    body('title').trim().isLength({ min: 1 }).escape().withMessage('title_empty'),
    body('author').trim().isLength({ min: 1 }).escape().withMessage('author_empty'),
    body('summary').trim().isLength({ min: 1 }).escape().withMessage('summary_empty'),
    body('isbn').trim().isLength({ min: 1 }).escape().withMessage('isbn_empty'),
    body('genre.*').escape(),
]

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

export const getAllBooks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const books = await bookService.getBooks();
    res.render('books/index', { books, title: req.t('book.title.listOfBook') });
});

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

export const updateBookForm = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const [book, allAuthors, allGenres] = await Promise.all([
            validateBook(req, res, next),
            authorService.getAuthorList(),
            genreService.getGenreList() as Promise<GenreChecked[]>,
        ]);

        if (!book) return;

        const bookGenreIds = book.genres.map(genre => genre.id);


        for (const genre of allGenres) {
            if (bookGenreIds.includes(genre.id)) {
                genre.checked = 'true';
            }
        }

        const bookForm = {
            title: book.title,
            author: book.author.id,
            summary: book.summary,
            isbn: book.isbn,
        };

        res.render('books/form', {
            title: req.t('sidebar.update_book'),
            authors: allAuthors,
            genres: allGenres,
            book: bookForm,
        });
    });

export const updateBook = [
    (req: Request, res: Response, next: NextFunction) => {
        if (!Array.isArray(req.body.genre)) {
            req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
        }

        next();
    },
    ...validateBookFields,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const errors = validationResult(req);

        const { title, author: authorId, summary, isbn, genres } = req.body;

        if (!errors.isEmpty()) {



            const [allAuthors, allGenres] = await Promise.all([
                authorService.getAuthorList(),
                genreService.getGenreList() as Promise<GenreChecked[]>,
            ]);


            for (const genre of allGenres) {
                if (genres.includes(genre.id.toString())) {
                    genre.checked = 'true';
                }
            }
            res.render('books/form', {
                title: req.t('sidebar.update_book'),
                authors: allAuthors,
                genres: allGenres,
                book: req.body,
                errors: errors.array(),
            });
        } else {

            const genresOfBook = await Promise.all(
                genres.map((genreId: string) => {
                    return genreService.getGenreById(parseInt(genreId));
                })
            );

            const authorOfBook = await authorService.getAuthorById(parseInt(authorId));
            const book = await validateBook(req, res, next);
            if (!book) return;

            await bookService.updateBook(book, title, authorOfBook!, summary, isbn, genresOfBook);
            res.redirect(`/books/${book.id}`);
        }
    }),
];

export const createBookForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [authors, genres] = await Promise.all([
            authorService.getAuthorList(),
            genreService.getGenreList(),
        ]);
        res.render('books/form', { title: req.t('book.create_book'), authors, genres });
    } catch (error) {
        req.flash('error_msg', req.t('notlist.failedToFetchData'));
        res.redirect('/error');
    }
});

export const createBook = [
    ...validateBookFields,

    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        const { title, author, summary, isbn, genre } = req.body;
        const genreIds = Array.isArray(genre) ? genre.map(id => parseInt(id, 10)) : [];

        if (!errors.isEmpty()) {
            const [authors, genres] = await Promise.all([
                authorService.getAuthorList(),
                genreService.getGenreList()
            ]);
            res.render('books/form', {
                title: req.t('book.create_book'),
                authors,
                genres,
                book: req.body,
                errors: errors.array()
            });
        } else {
            try {
                await bookService.createBook({ title, author, summary, isbn, genres: genreIds });
                req.flash('success_msg', req.t('book.success.bookCreated'));
                res.redirect('/books');
            } catch (err) {
                req.flash('error_msg', req.t('error.createFail'));
                res.redirect('/books/form');
            }
        }
    })
];

export const deleteBookForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    async (req: Request, res: Response, next: NextFunction) => {
        const book = await validateBook(req, res, next);
        if (!book) return;

        res.render('books/delete', {
            title: req.t('sidebar.delete_book'),
            book,
            bookInstances: book?.bookInstances,
            bookGenres: book?.genres,
            BookInstanceStatus,
        });
    }
});

export const deleteBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    async (req: Request, res: Response, next: NextFunction) => {
        const book = await validateBook(req, res, next);
        if (!book) return;

        if (book.bookInstances.length > 0) {
            res.render('books/delete', {
                title: req.t('sidebar.delete_book'),
                book,
                bookInstances: book?.bookInstances,
                bookGenres: book?.genres,
                BookInstanceStatus,
            });
            return;
        } else {
            await bookService.deleteBook(book.id);
            res.redirect('/books');
        }
    }
});
