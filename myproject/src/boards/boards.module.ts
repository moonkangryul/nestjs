import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardEntity } from './board.entity';

@Module({
    imports : [TypeOrmModule.forFeature([BoardEntity])],
    controllers: [BoardsController] ,
    providers: [BoardsService, BoardRepository],
})

export class BoardsModule {}
