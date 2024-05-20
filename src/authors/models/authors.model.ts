import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Book } from '../../books/models/books.model';

@Table
export class Author extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    biography: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    dateOfBirth: Date;

    @HasMany(() => Book, {
        onDelete: 'CASCADE',
        hooks: true 
    })
    books: Book[];
}