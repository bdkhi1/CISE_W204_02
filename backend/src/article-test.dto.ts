import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class ArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  authors: string;

  @IsInt()
  @IsNotEmpty()
  pubyear: number;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  doi?: string;

  @IsString()
  @IsOptional()
  practice?: string;

  @IsString()
  @IsOptional()
  evidence?: string;

  @IsString()
  @IsOptional()
  claim?: string;
}