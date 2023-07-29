export interface Registration {
  username: string;
  email: string;
  givenName?: string;
  middleName?: string;
  surname?: string;
  suffix?: string;
  title?: string;
  password: string;
}

export interface Credentials {
  usernameOrEmail: string;
  password: string;
}

export enum Publicity {
  PUBLIC = 'PUBLIC',
  OBSERVABLE = 'OBSERVABLE',
  PRIVATE = 'PRIVATE'
}
