import { AppDataSource } from '../config/data-source';
import Author from '../entity/author.entity';

export class AuthorService {
    private authorRepository = AppDataSource.getRepository(Author);

    async getIndexData() {
        return await this.authorRepository.count();
    }

    async getAuthorList() {
        return this.authorRepository.find({ order: { firstName: 'ASC' } })
    }

    async getAuthorById (id: number) {
        return this.authorRepository.findOne({
            where: { id },
            relations: ['books'],
        });
    }
}
