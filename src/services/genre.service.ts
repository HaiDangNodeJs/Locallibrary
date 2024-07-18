import { AppDataSource } from '../config/data-source';
import Genre from '../entity/genre.entity';

export class GenreService {
    private genreRepository = AppDataSource.getRepository(Genre);

    async getIndexData() {
        return await this.genreRepository.count();
    }
}
