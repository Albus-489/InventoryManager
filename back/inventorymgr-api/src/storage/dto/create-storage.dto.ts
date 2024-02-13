import { IsOptional, IsString } from "class-validator";

export class CreateStorageDto {

  @IsString()
  name: string;

  @IsOptional()
  description: string;
}
