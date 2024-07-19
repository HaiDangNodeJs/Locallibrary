import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { GenreService } from '../services/genre.service';

const genreService = new GenreService();

// Hiển thị danh sách tất cả các loại.
export const getAllGenres = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreService.getGenreList()
    res.render('genre/index', { genres, title: 'genre.title.listOfGenre' })
});

// Hiển thị chi tiết trang cho một loại cụ thể.
export const getGenreDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
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
