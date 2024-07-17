import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

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
