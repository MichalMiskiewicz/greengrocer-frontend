export class NewUserDTO {
  username: string = '';
  name: string = '';
  surname: string = '';
  eMail: string = '';
  password: string = '';
  telNumber: string = '';
  address: any = {}

  constructor(username: string, name: string, surname: string, eMail: string, password: string, telNumber: string, address: any) {
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.eMail = eMail;
    this.password = password;
    this.telNumber = telNumber;
    this.address = address;
  }
}
