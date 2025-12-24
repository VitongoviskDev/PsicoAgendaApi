import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class CanAttendGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
