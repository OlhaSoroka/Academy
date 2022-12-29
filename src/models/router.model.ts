import { updateUserByID } from "../api/user";

export enum ROUTE_NAMES {
  LOGIN = "login",
  PROFILE = "profile",
  STUDENTS = "students",
  MENTORS = "mentors",
  ADMINS = "admins",
  COURSE_DASHBOARD = "course-dashboard",
  COURSE_DETAILS = "course-details",
  NOT_FOUND = "not-found",
  GUIDE ="guide",
  NOTIFICATION ="notification"
}

export enum ROUTE_PATH {
  LOGIN = "/login",
  PROFILE = "/profile",
  STUDENTS = "/students",
  MENTORS = "/mentors",
  ADMINS = "/admins",
  COURSES = "/courses",
  GUIDE = "/guide",
  NOTIFICATION ="/notification"
}
export enum ROLES {
  ADMIN_ROLE = "admin",
  MENTOR_ROLE = "mentor",
  STUDENTS_ROLE = "student",
}
