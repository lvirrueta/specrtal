import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDTO } from './common/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CloginToken } from './common/class/loginToken.class';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Inicia sesión',
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa Token',
    isArray: false,
    type: CloginToken,
  })
  @Post('login')
  login(@Body() user: UserDTO) {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Crea usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Crea usario',
    isArray: false,
    type: Boolean,
  })
  @Post('signIn')
  signIn(@Body() user: UserDTO) {
    return this.authService.signIn(user);
  }
}
