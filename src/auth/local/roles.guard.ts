import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from './roles.decorator';
import { Role } from 'src/enum/role.enum';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log("first",requiredRoles)
    if (!requiredRoles) {
      return true;
    }
   // const { user } = context.switchToHttp().getRequest();
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user,'----------')
    // console.log("useruser", request)
    // console.log("useruser", request.rawHeaders[1].split(" ")[1])
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}