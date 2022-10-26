import { ROLES } from "../../models/router.model";

export interface AppUser {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: string;
  role: ROLES;
  course?: string;
}

export interface RegisterUserBody {
  email: string;
  password: string;
  course?: string;
  fullName: string;
  role: ROLES;
}
