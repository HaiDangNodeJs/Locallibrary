import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { BookInstanceService } from '../services/book_instance.service';
import { BookInstanceStatus } from '../enums/book_instance_status';
import { BookService } from '../services/book.service';
import { body, validationResult } from 'express-validator';

const bookService = new BookService();
const bookInstanceService = new BookInstanceService();

const validateBookInstance = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        req.flash('error', 'Invalid book instance id parameter')
        res.redirect('/bookInstances')
        return null
    }

    const bookInstance = await bookInstanceService.getBookInstanceById(id)
    if (bookInstance === null) {
        req.flash('error', 'Book instance not found')
        res.redirect('/bookInstances')
        return null
    }

    return bookInstance
}

const validateBookInstanceFields = [
    body('book')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('bookinstance.field_specified', {
                field: req.t('book.choose_book', { ns: 'form' }),
                ns: 'form',
            })
        ),
    body('imprint')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('bookinstance.field_specified', {
                field: req.t('detail.imprint', { ns: 'detail' }),
                ns: 'form',
            })
        ),
    body('status')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage((value, { req }) =>
            req.t('bookinstance.field_specified', {
                field: req.t('detail.status', { ns: 'detail' }),
                ns: 'form',
            })
        ),
    body('due_back')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate()
        .withMessage((value, { req }) => req.t('bookinstance.invalid_due_back', { ns: 'form' })),

]

export const getAllBookInstances = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstances = await bookInstanceService.getBookInstanceList()
    res.render('book_instances/index', {
        bookInstances,
        title: 'bookInstance.title.listOfBookInstance',
        BookInstanceStatus
    })
});

export const getBookInstanceDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await validateBookInstance(req, res, next)
    res.render('book_instances/show', { bookInstance, bookInstanceBooks: bookInstance?.book, BookInstanceStatus })
});

export const createBookInstanceForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const allBooks = await bookService.getBooks();

    res.render('book_instances/form', {
        title: req.t('sidebar.create_bookinstance'),
        book_list: allBooks,
        BookInstanceStatus,
    });
});

export const createBookInstance = [
    ...validateBookInstanceFields,

    asyncHandler(async (req, res, next) => {

        const errors = validationResult(req);

        const { book: bookId, imprint, status, due_back } = req.body;

        if (!errors.isEmpty()) {


            const allBooks = await bookService.getBooks();

            res.render('book_instances/form', {
                title: req.t('sidebar.create_bookinstance'),
                book_list: allBooks,
                selected_book: bookId,
                errors: errors.array(),
                bookinstance: req.body,
                BookInstanceStatus,
            });
            return;
        } else {

            const book = await bookService.getBookById(parseInt(bookId));
            const bookInstance = await bookInstanceService.createBookInstance(
                book!,
                imprint,
                status,
                due_back
            );
            res.redirect(`/bookinstances/${bookInstance.id}`);
        }
    })
]

export const deleteBookInstanceForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await validateBookInstance(req, res, next);
    if (!bookInstance) return;

    res.render('bookinstances/delete', {
        title: req.t('sidebar.delete_bookinstance'),
        bookinstance: bookInstance,
        BookInstanceStatus,
    });
});

export const deleteBookInstance = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await validateBookInstance(req, res, next);
    if (!bookInstance) return;

    await bookInstanceService.deleteBookInstance(bookInstance.id);
    res.redirect('/bookinstances');
});

export const updateBookInstanceForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const allBooks = await bookService.getBooks();
    const bookInstance = await validateBookInstance(req, res, next);
    if (!bookInstance) return;

    res.render('bookinstances/form', {
        title: req.t('sidebar.update_bookinstance'),
        book_list: allBooks,
        selected_book: bookInstance.id,
        bookinstance: bookInstance,
        BookInstanceStatus,
    });
});

export const updateBookInstance = [
    ...validateBookInstanceFields,

    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const errors = validationResult(req);

        const { book: bookId, imprint, status, due_back } = req.body;

        if (!errors.isEmpty()) {


            const allBooks = await bookService.getBooks();

            res.render('bookinstances/form', {
                title: req.t('sidebar.update_bookinstance'),
                book_list: allBooks,
                selected_book: bookId,
                errors: errors.array(),
                bookinstance: req.body,
                BookInstanceStatus,
            });
            return;
        } else {

            const book = await bookService.getBookById(parseInt(bookId));
            const bookInstance = await validateBookInstance(req, res, next);
            if (!bookInstance) return;

            await bookInstanceService.updateBookinstance(
                bookInstance,
                book!,
                imprint,
                status,
                due_back
            );
            res.redirect(`/bookinstances/${bookInstance.id}`);
        }
    })];
