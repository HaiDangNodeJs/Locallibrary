import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { GenreService } from '../services/genre.service';

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

// Hiển thị danh sách tất cả các loại.
export const getAllGenres = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreService.getGenreList()
    res.render('genres/index', { genres, title: 'genre.title.listOfGenre' })
});

// Hiển thị chi tiết trang cho một loại cụ thể.
export const getGenreDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = await validateGenre(req, res, next)
    res.render('genres/show', { genre, genreBooks: genre?.books })
});

// Hiển thị form tạo loại mới bằng phương thức GET.
export const createGenreForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Genre create GET');
});

// Xử lý tạo loại mới bằng phương thức POST.
export const createGenre = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Genre create POST');
});

// Hiển thị form xóa loại bằng phương thức GET.
export const deleteGenreForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Genre delete GET ${req.params.id}`);
});

// Xử lý xóa loại bằng phương thức POST.
export const deleteGenre = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Genre delete POST ${req.params.id}`);
});

// Hiển thị form cập nhật loại bằng phương thức GET.
export const updateGenreForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Genre update GET ${req.params.id}`);
});

// Xử lý cập nhật loại bằng phương thức POST.
export const updateGenre = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Genre update POST ${req.params.id}`);
});
