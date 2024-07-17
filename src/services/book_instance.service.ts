import { AppDataSource } from '../config/data-source';
import BookInstance from '../entity/book_instance.entity';
import { BookInstanceStatus } from '../enums/book_instance_status';

export class BookInstanceService {
    private bookInstanceRepository = AppDataSource.getRepository(BookInstance);

    async getIndexData() {
        return await this.bookInstanceRepository.count();
    }

    async getAllBookInstances() {
        return await this.bookInstanceRepository.findAndCount({
            where: { status: BookInstanceStatus.AVAILABLE }
        });
    }
}
