import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.statusEnum";

export class BoardStatusValidationPipe implements PipeTransform{
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PRIVATE
    ]
    
    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException( '${value}라는 옵션은 없습니다.')
        }
        return value;
    }

    private isStatusValid(status: any){
        const index = this.StatusOptions.indexOf(status);
        
        return index !== -1
    }
}