import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsOptional()
  qtt: number;

  @IsOptional()
  group: string;

  @IsOptional()
  minimum: number;

  @IsOptional()
  available: boolean;
}
