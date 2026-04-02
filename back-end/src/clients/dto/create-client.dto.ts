import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @Type(() => Number)
  @IsNumber()
  salary!: number;

  @Type(() => Number)
  @IsNumber()
  companyValue!: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

