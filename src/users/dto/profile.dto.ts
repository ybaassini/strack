import { ApiProperty } from "@nestjs/swagger";

export class ProfileDto {
  constructor(object: any) {
    this.email = object.email;
    this.firstName = object.firstName;
    this.lastName = object.lastName;    
    this.role = object.role;
    this.profilepicture = object.profilepicture;
  };
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly role: string;
  @ApiProperty()
  readonly profilepicture: string;
}