// board.repository.ts
import { DataSource, Repository } from 'typeorm';
import { BoardEntity } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.statusEnum';

@Injectable()
export class BoardRepository extends Repository<BoardEntity>{
    constructor( dataSource: DataSource){
        super(BoardEntity, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto) : Promise<BoardEntity>{
        const {title,description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status : BoardStatus.PUBLIC
        })

        await this.save(board);
        return board;
    }
}