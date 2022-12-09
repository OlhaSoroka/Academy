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
  course?: string;
  archive?: boolean;
  study_period?:string;
  company?:string;
  status?:string;
  status_date?:string;
  comments?:string;
  
}

export interface RegisterUserBody {
  email: string;
  password: string;
  courseId?: string;
  fullName: string;
  role: ROLES;
}
