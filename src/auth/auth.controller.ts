import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { logInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() SignUpDto: SignUpDto) {
    return this.authService.signup(SignUpDto);
  }

  @Get('login')
  async login(@Body() logInDto: logInDto) {
    return this.authService.login(logInDto);
  }


}
