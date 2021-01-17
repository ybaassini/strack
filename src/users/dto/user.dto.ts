import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  constructor(object: any) {
    this.firstName = object.firstName;
    this.lastName = object.lastName;
    this.email = object.email;
    this.role = object.role;
  };
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly role: string;
}