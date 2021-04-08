import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly role: string;
  @ApiProperty()
  password: string;
}