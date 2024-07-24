import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { GenreService } from '../services/genre.service';
import { body, validationResult } from 'express-validator';

const genreService = new GenreService();

const validateGenre = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        req.flash('error', 'Invalid genre id parameter')
        res.redirect('/genres')
        return null
    }

    const genre = await genreService.getGenreById(id)
    if (genre === null) {
        req.flash('error', 'Genre not found')
        res.redirect('/genres')
        return null
    }

    return genre
}

const validateGenreFields = [
    body('name')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage((value, { req }) => {
            return req.t('genre.name_max', { ns: 'form' });
        }),
]

export const getAllGenres = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreService.getGenreList()
    res.render('genres/index', { genres, title: 'genre.title.listOfGenre' })
});

export const getGenreDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGenre(req, res, next)
    res.render('genres/show', { genre, genreBooks: genre?.books })
});

export const createGenreForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.render('genres/form', { title: req.t('sidebar.create_genre') });
});

export const createGenre = [
    ...validateGenreFields,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            res.render('genres/form', {
                title: req.t('sidebar.create_genre'),
                genre: req.body,
                errors: errors.array(),
            });
            return;
        } else {


            const genreExists = await genreService.checkGenreExists(req.body.name);
            if (genreExists) {

                res.redirect(`/genres/${genreExists.id}`);
            } else {
                const genre = await genreService.createGenre(req.body.name);

                res.redirect(`/genres/${genre.id}`);
            }
        }
    }),
];

export const deleteGenreForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGenre(req, res, next);
    if (!genre) return;

    res.render('genres/delete', {
        title: req.t('sidebar.delete_genre'),
        genre: genre,
        genre_books: genre?.books,
    });
});

export const deleteGenre = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGenre(req, res, next);
    if (!genre) return;

    await genreService.deleteGenre(genre.id);
    res.redirect('/genres');
});

export const updateGenreForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGenre(req, res, next);
    if (!genre) return;

    res.render('genres/form', {
        title: req.t('sidebar.update_genre'),
        genre: genre,
    });
});

export const updateGenre = [
    ...validateGenreFields,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('genres/form', {
                title: req.t('sidebar.update_genre'),
                genre: req.body,
                errors: errors.array(),
            });
            return;
        } else {
            const genreExists = await genreService.checkGenreExists(req.body.name);
            if (genreExists) {

                res.redirect(`/genres/${genreExists.id}`);
            } else {
                const genre = await validateGenre(req, res, next);
                if (!genre) return;

                await genreService.updateGenre(genre, req.body.name);

                res.redirect(`/genres/${genre.id}`);
            }
        }
    }),
];
