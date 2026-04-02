import { Type } from 'class-transformer';
import { IsIn, IsOptional, Max, Min } from 'class-validator';

export class ListClientsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsIn([8, 16, 32])
  pageSize = 16;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  recentLimit = 5;
}

