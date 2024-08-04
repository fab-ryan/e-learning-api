import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  ForgetPasswordDto,
  OTPDto,
  ResetPasswordDto,
} from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  google() {
    return this.authService.loginWithGoogle();
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post('/forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgotPassword(forgetPasswordDto);
  }

  @Post('/verify-otp/:token')
  verifyOtp(@Param('token') token: string, @Body() forgetPasswordDto: OTPDto) {
    return this.authService.verifyOtp(forgetPasswordDto, token);
  }

  @Post('/reset-password/:token')
  resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(resetPasswordDto, token);
  }
}
