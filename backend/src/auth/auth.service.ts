import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(email: string, senha: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (user.senha !== senha) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return {
      message: 'Login realizado com sucesso!',
      user,
    };
  }
}
