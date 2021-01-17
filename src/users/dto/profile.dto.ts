export class ProfileDto {
  constructor(object: any) {
    this.email = object.email;
    this.firstName = object.firstName;
    this.lastName = object.lastName;    
    this.role = object.role;
    this.profilepicture = object.profilepicture;
  };
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  readonly profilepicture: string;
}