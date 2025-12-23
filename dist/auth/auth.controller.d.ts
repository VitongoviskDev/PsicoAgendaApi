import { ApiResponse } from '../responses/ApiResponse';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterOwnerDto } from './dto/register-owner.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerOwner(dto: RegisterOwnerDto): Promise<ApiResponse<any>>;
    login(body: LoginDto): Promise<ApiResponse<any>>;
    getProfile(req: any): any;
}
