import { ApiResponse } from '../responses/ApiResponse';
import { CompleteUserProfileDto } from './dto/complete-user-profile.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findByCpf(cpf: string): Promise<import("./entities/user.entity").User | null>;
    completeProfile(user: any, file: Express.Multer.File, dto: CompleteUserProfileDto): Promise<ApiResponse<any>>;
}
