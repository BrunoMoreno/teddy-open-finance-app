import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { JsonLogger } from '../common/logging/json-logger.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: JsonLogger,
  ) {}

  async register(dto: RegisterDto): Promise<{ access_token: string; user: UserPayload }> {
    const existingUser = await this.usersRepository.findOne({ where: { email: dto.email } });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.save(
      this.usersRepository.create({
        email: dto.email,
        name: dto.name,
        passwordHash,
      }),
    );

    this.logger.log(`user_registered ${user.email}`, 'AuthService');
    return this.issueToken(user);
  }

  async login(dto: LoginDto): Promise<{ access_token: string; user: UserPayload }> {
    const user = await this.usersRepository.findOne({ where: { email: dto.email } });

    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      this.logger.warn(`auth_failed ${dto.email}`, 'AuthService');
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`auth_success ${dto.email}`, 'AuthService');
    return this.issueToken(user);
  }

  async ensureAdminSeed(): Promise<void> {
    const email = this.configService.get<string>('ADMIN_EMAIL');
    const password = this.configService.get<string>('ADMIN_PASSWORD');
    const name = this.configService.get<string>('ADMIN_NAME') ?? 'Usuário';

    if (!email || !password) {
      return;
    }

    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await this.usersRepository.save(
      this.usersRepository.create({ email, name, passwordHash }),
    );
    this.logger.log(`seed_admin_created ${email}`, 'AuthService');
  }

  private async issueToken(user: User): Promise<{ access_token: string; user: UserPayload }> {
    const payload = { sub: user.id, email: user.email, name: user.name };
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') ?? '1d';
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn as never,
    });

    return {
      access_token,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}

type UserPayload = {
  id: string;
  email: string;
  name: string;
};
