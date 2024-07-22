import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthorService } from '../services/author.service'

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

// Lấy danh sách tất cả các tác giả.
export const getAllAuthors = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorService.getAuthorList()
    res.render('authors/index', { authors, title: 'author.title.listOfAuthor' })
});

// Hiển thị chi tiết tác giả.
export const getAuthorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = await validateGetAuthorById(req, res, next)
    res.render('authors/show', { author, authorBooks: author?.books })
});

// Hiển thị form tạo tác giả mới bằng phương thức GET.
export const createAuthorForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Author is created with method GET');
});

// Xử lý tạo tác giả mới bằng phương thức POST.
export const createAuthor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Author is created with method POST');
});

// Hiển thị form xóa tác giả bằng phương thức GET.
export const deleteAuthorForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Author ${req.params.id} is deleted with method GET`);
});

// Xử lý xóa tác giả bằng phương thức POST.
export const deleteAuthor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Author ${req.params.id} is deleted with method POST`);
});

// Hiển thị form cập nhật tác giả bằng phương thức GET.
export const updateAuthorForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Author ${req.params.id} is updated with method GET`);
});

// Xử lý cập nhật tác giả bằng phương thức POST.
export const updateAuthor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Author ${req.params.id} is updated with method POST`);
});
