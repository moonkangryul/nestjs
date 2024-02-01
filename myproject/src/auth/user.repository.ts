import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-creadetial.dto";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor( dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const{ username, password} = authCredentialsDto;
        const user = this.create({ username, password });

        await this.save(user);
    }
}