import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.statusEnum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { BoardRepository } from './board.repository';
import { stat } from 'fs';

@Injectable()
export class BoardsService {
    constructor( @InjectRepository(BoardRepository) private boardRepository: BoardRepository) {}
  
    createBoard(createBoardDto: CreateBoardDto) : Promise<BoardEntity>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getAllBoards(): Promise<BoardEntity[]>{
        return this.boardRepository.find();
    }

    async getBoardById(id: number): Promise <BoardEntity> {
        const found = await this.boardRepository.findOne({where: { id: id}});

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async deleteBoard(id:number): Promise <void>{
        const result = await this.boardRepository.delete(id);
        
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus) : Promise<BoardEntity>{
        const board = await this.getBoardById(id);
        
        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
    
}
