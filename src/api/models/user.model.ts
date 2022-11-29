import { ROLES } from "../../models/router.model";

export interface AppUser {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: string;
  role: ROLES;
  courseId?: string;
  age?: string;
  education?: string;
  eng_level?: string;
  city?: string;
  phone?: string;
  cv_link?:string;
  course?: string
}

export interface RegisterUserBody {
  email: string;
  password: string;
  courseId?: string;
  fullName: string;
  role: ROLES;
}
