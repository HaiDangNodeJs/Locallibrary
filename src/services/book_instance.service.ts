import { AppDataSource } from '../config/data-source';
import BookInstance from '../entity/book_instance.entity';
import { BookInstanceStatus } from '../enums/book_instance_status';

export class BookInstanceService {
    private bookInstanceRepository = AppDataSource.getRepository(BookInstance);

    async getIndexData() {
        return await this.bookInstanceRepository.count();
    }

    async getIndexBookInstances() {
        return await this.bookInstanceRepository.count({
            where: { status: BookInstanceStatus.AVAILABLE }
        });
    }

    async getBookInstanceList() {
        return this.bookInstanceRepository.find({ relations: ['book'] })
    }
}
