import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { BookInstanceService } from '../services/book_instance.service';
import { BookInstanceStatus } from '../enums/book_instance_status';

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

// Hiển thị danh sách tất cả các BookInstance.
export const getAllBookInstances = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstances = await bookInstanceService.getBookInstanceList()
    res.render('book_instances/index', {
        bookInstances,
        title: 'bookInstance.title.listOfBookInstance',
        BookInstanceStatus
    })
});

// Hiển thị chi tiết trang cho một BookInstance cụ thể.
export const getBookInstanceDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await validateBookInstance(req, res, next)
    res.render('book_instances/show', { bookInstance, bookInstanceBooks: bookInstance?.book, BookInstanceStatus })
});

// Hiển thị form tạo BookInstance mới bằng phương thức GET.
export const createBookInstanceForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
});

// Xử lý tạo BookInstance mới bằng phương thức POST.
export const createBookInstance = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
});

// Hiển thị form xóa BookInstance bằng phương thức GET.
export const deleteBookInstanceForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: BookInstance delete GET ${req.params.id}`);
});

// Xử lý xóa BookInstance bằng phương thức POST.
export const deleteBookInstance = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: BookInstance delete POST ${req.params.id}`);
});

// Hiển thị form cập nhật BookInstance bằng phương thức GET.
export const updateBookInstanceForm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: BookInstance update GET ${req.params.id}`);
});

// Xử lý cập nhật BookInstance bằng phương thức POST.
export const updateBookInstance = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: BookInstance update POST ${req.params.id}`);
});
