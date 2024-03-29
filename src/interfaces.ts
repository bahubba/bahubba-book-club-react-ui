export enum Publicity {
  PUBLIC = 'PUBLIC',
  OBSERVABLE = 'OBSERVABLE',
  PRIVATE = 'PRIVATE'
}

export type BookClubRole =
  | 'NONE'
  | 'ADMIN'
  | 'READER'
  | 'PARTICIPANT'
  | 'OBSERVER';

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

export interface User {
  id?: string;
  username: string;
  email: string;
  givenName?: string;
  middleName?: string;
  surname?: string;
  suffix?: string;
  title?: string;
  joined?: Date;
  departed?: Date | null;
  systemRole?: string;
}

export interface BookClubMember extends User {
  joinedClub: Date;
  departedClub: Date | null;
  clubRole: string;
}

export interface Image {
  fileName: string;
  url: string;
}

export interface BookClub {
  id?: string;
  name: string;
  image: Image;
  description: string;
  publicity: Publicity;
  created?: Date;
  disbanded?: Date | null;
  members?: BookClubMember[];
}

export interface MembershipRequestPayload {
  bookClubName: string;
  message?: string;
}

export interface MembershipRequest {
  id?: string;
  user: User;
  bookClub: BookClub;
  message?: string;
  status: 'OPEN' | 'APPROVED' | 'REJECTED';
  role: BookClubRole;
  viewed: boolean;
  reviewer?: User;
  reviewMessage?: string;
  requested: string;
  reviewed?: string;
}

export interface BookClubMembership {
  bookClub: BookClub;
  user: User;
  clubRole: BookClubRole;
  isOwner: boolean;
  joined: string;
  departed: string | null;
}

export interface MembershipRequestAction {
  membershipRequest: MembershipRequest;
  action: 'APPROVE' | 'REJECT';
  role?: BookClubRole;
  reviewMessage?: string;
}

export interface MembershipUpdate {
  bookClubName: string;
  userID: string;
  role: BookClubRole;
}

export interface NewOwner {
  bookClubName: string;
  newOwnerID: string;
}

export interface AdminOutletContext {
  bookClubName: string;
  admin: BookClubMembership;
}
