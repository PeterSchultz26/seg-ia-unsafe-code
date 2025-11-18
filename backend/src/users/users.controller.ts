import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async register(@Body() body: any) {
    const { nome, email, cpf, endereco, senha } = body;

    // validando e-mails duplicados
    const emailExists = await this.usersService.findByEmail(email);
    if (emailExists) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    // validando CPF duplicado
    const cpfExists = await this.usersService.findByCpf(cpf);
    if (cpfExists) {
      throw new BadRequestException('CPF já cadastrado');
    }

    const newUser = await this.usersService.create({
      nome,
      email,
      cpf,
      endereco,
      senha,
    });

    return { message: 'Cadastro realizado com sucesso!', user: newUser };
  }
}
