export enum Publicity {
  PUBLIC = "PUBLIC",
  OBSERVABLE = "OBSERVABLE",
  PRIVATE = "PRIVATE"
}

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

export interface Reader {
  id?: string;
  username: string;
  email: string;
  givenName?: string;
  middleName?: string;
  surname?: string;
  suffix?: string;
  title?: string;
  joined?: Date;
  departed?: Date|null;
  systemRole?: string;
}

export interface BookClubMember extends Reader {
  joinedClub: Date;
  departedClub: Date|null;
  clubRole: string;
}

export interface BookClub {
  id?: string; 
  name: string;
  imageURL: string;
  description: string;
  publicity: Publicity;
  created?: Date;
  disbanded?: Date|null;
  members?: BookClubMember[];
}
