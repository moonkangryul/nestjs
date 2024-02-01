import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './board.entity';
import { BoardStatus } from './board.statusEnum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController{
	// BoardsService 클래스를 객체로 선언함.    
    constructor(private boardsService: BoardsService) {}
   
    @Get()
    getAllBoard(): Promise<BoardEntity[]>{
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number) : Promise<BoardEntity> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto:CreateBoardDto) : Promise<BoardEntity>{
        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void>{
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id', ParseIntPipe) id:number, @Body('status',BoardStatusValidationPipe) status:BoardStatus){
        return this.boardsService.updateBoardStatus(id,status);
    }

}