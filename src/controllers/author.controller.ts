import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthorService } from '../services/author.service'
import { body, validationResult } from "express-validator";

const authorService = new AuthorService();

async function validateGetAuthorById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        req.flash('error', req.t('error.invalidAuthorId', { ns: 'error' }));
        return res.redirect('/error');
    }

    const author = await authorService.getAuthorById(id);
    if (author === null) {
        req.flash('error', req.t('error.authorNotFound', { ns: 'error' }));
        return res.redirect('/error');
    }

    return author;
}

const validateAuthorFields = [
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('empty_first_name'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('empty_family_name'),
    body('date_of_birth').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('invalid_date_of_birth'),
    body('date_of_death').optional({ checkFalsy: true }).isISO8601().toDate().withMessage('invalid_date_of_death'),
];


export const getAllAuthors = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorService.getAuthorList()
    res.render('authors/index', { authors, title: 'author.title.listOfAuthor' })
});

export const getAuthorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = await validateGetAuthorById(req, res, next)
    res.render('authors/show', { author, authorBooks: author?.books })
});

export const createAuthorGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.render('authors/form', { title: req.t('create.author') })

});

export const createAuthorPost = [
   ...validateAuthorFields,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => req.t(`error_messages.${error.msg}`)).join(' ');
            req.flash('error_msg', errorMessages);
            return res.redirect('/authors/create');
        } else {
            const { first_name, family_name, date_of_birth, date_of_death } = req.body;
            try {
                await authorService.createAuthor(first_name, family_name, date_of_birth, date_of_death);
                req.flash('success_msg', req.t('notlist.authorCreateSuccess'));
                return res.redirect('/authors');
            } catch (err) {
                req.flash('error_msg', req.t('error_messages.author_create_error'));
                return res.redirect('/authors/create');
            }
        }
    })
];

export const deleteAuthorForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = await validateGetAuthorById(req, res, next);
    if (author) {
        const authorBooks = author?.books;
        res.render('authors/delete', { title: req.t('delete_author_title'), author, authorBooks });
    }
});

export const deleteAuthor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = await validateGetAuthorById(req, res, next);
    if (author) {
        const authorBooks = author?.books;
        if (authorBooks.length > 0) {
            res.render('authors/delete', { title: req.t('delete_author_title'), author, authorBooks });
        } else {
            try {
                await authorService.deleteAuthor(author.id);
                req.flash('success_msg', req.t('notlist.authorCreateSuccess'));
                res.redirect('/authors');
            } catch (error) {
                console.error('Error deleting author:', error.message);
                req.flash('error_msg', req.t('error.deleteFail'));
                res.redirect('/authors');
            }
        }
    }
});

export const updateAuthorForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = await validateGetAuthorById(req, res, next);
    if (!author) return;

    res.render('authors/form', {
        title: req.t('sidebar.update_author'),
        author: author,
    });
});

export const updateAuthor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    [

        ...validateAuthorFields,


        asyncHandler(async (req, res, next) => {

            const errors = validationResult(req);

            const { first_name, family_name, date_of_birth, date_of_death } = req.body;

            if (!errors.isEmpty()) {
                res.render('authors/form', {
                    title: req.t('sidebar.update_author'),
                    author: req.body,
                    errors: errors.array(),
                });
                return;
            } else {
                const author = await validateGetAuthorById(req, res, next);
                if (!author) return;

                await authorService.updateAuthor(
                    author,
                    first_name,
                    family_name,
                    date_of_birth,
                    date_of_death
                );
                res.redirect(`/authors/${author.id}`);
            }
        }),
    ];
});
