import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/dto/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Regresa token para hacer peticiones',
  })
  @Post('login')
  login(@Body() user: UserDTO) {
    return this.authService.login(user);
  }

  @ApiOperation({
    summary: 'Crea usuario',
  })
  @Post('signIn')
  signIn(@Body() user: UserDTO) {
    return this.authService.signIn(user);
  }
}
