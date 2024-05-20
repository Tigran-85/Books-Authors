import { Column, Model, DataType, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Author } from '../../authors/models/authors.model';

@Table
export class Book extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @Column
    title: string;

    @Column
    ISBN: string;

    @Column({
        type: DataType.DATE,
    })
    publishedDate: Date;

    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    authorId: number;

    @BelongsTo(() => Author)
    author: Author;
}