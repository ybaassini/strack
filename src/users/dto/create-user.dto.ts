export class CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly role: string;
  password: string;
}