export class UserDto {
  constructor(object: any) {
    this.firstName = object.firstName;
    this.lastName = object.lastName;
    this.email = object.email;
    this.role = object.role;
  };
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly role: string;
}