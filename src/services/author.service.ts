import { AppDataSource } from '../config/data-source';
import Author from '../entity/author.entity';

export class AuthorService {
    private authorRepository = AppDataSource.getRepository(Author);

    async getIndexData() {
        return await this.authorRepository.count();
    }
}
