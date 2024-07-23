import { AppDataSource } from '../config/data-source';
import Genre from '../entity/genre.entity';

export class GenreService {
    private genreRepository = AppDataSource.getRepository(Genre);

    async getIndexData() {
        return await this.genreRepository.count();
    }

    async getGenreList() {
        return this.genreRepository.find({ order: { name: 'ASC' } })
    }

    async getGenreById(id: number) {
        return this.genreRepository.findOne({
            where: { id },
            relations: ['books'],
        });
    };

    async checkGenreExists(name: string) {
        return this.genreRepository.findOne({ where: { name } });
    };

    async createGenre(name: string) {
        const genre = new Genre();
        genre.name = name;

        return this.genreRepository.save(genre);
    };

    async deleteGenre(id: number) {
        return this.genreRepository.delete(id);
    };

    async updateGenre(genre: Genre, name: string) {
        genre.name = name;
        return this.genreRepository.save(genre);
    };
}
