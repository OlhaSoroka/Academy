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

export enum StudentStatus {
  OUR_EMPLOYEE = "Our employee",
  INTERESTED_IN_WORK = "Interested in work",
  TO_CONTACT_LATER = "To contact later",
  SENT_LETTER = "Sent letter",
  ANOTHER_COMPANY= "Is working in another company",
  LEFT_OUR_COMPANY = "Left our company",
}
