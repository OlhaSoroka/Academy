import { AppUser } from "./user.model";

export class Course {
  status: CourseStatus = CourseStatus.NOT_STARTED;
  name: string = "";
  id: string = "";
  date_final_interview: string = "";
  date: string = "";
  materials: CourseMaterial[] = [];
  group: CourseMember[] = [];
  homework_results: CourseHomeworkResult[] = [];
  date_project_demo: string = "";
  date_project_start: string = "";
  comments: CourseComment[] = [];
  results: CourseResult[] = [];

  asObject() {
    return { ...this };
  }
}

export enum CourseStatus {
  NOT_STARTED = "not started",
  IN_PROGRESS = "in progress",
  FINISHED = "finished",
}

export interface CourseMaterial {
  id: string;
  name: string;
  link: string;
}

export class CourseMember {
  constructor(student: AppUser) {
    this.fullName = student.fullName;
    this.email = student.email;
  }
  fullName: string;
  email: string;
  age: string = "";
  education: string = "";
  eng_level: string = "";
  city: string = "";
  phone: string = "";

  asObject() {
    return { ...this };
  }
}

export class CourseHomeworkResult {
  constructor(student: AppUser, homework: Homework[]) {
    this.id = student.id;
    this.students_name = student.fullName;
    this.homework = homework;
  }
  id: string;
  students_name: string;
  total: string = "0";
  homework: Homework[] = [];

  asObject() {
    return { ...this };
  }
}

export interface Homework {
  name: string;
  link: string;
  rate: number;
  id: string;
  date: string;
}

export interface CourseComment {
  author_id: string;
  message: string;
  author_email: string;
  author: string;
  id: number;
  createdAt: string;
}

export class CourseResult {
  constructor(student: AppUser) {
    this.fullName = student.fullName;
    this.email = student.email;
  }
  average_homework_score: string = "0";
  middle_total: string = "0";
  final_hr_interviewer_comments: string = "";
  interview_result: string = "0";
  exit_tech_interview: string = "0";
  start_total: string = "0";
  hr_interviewer_comments: string = "";
  mentors_feedback: string = "";
  tech_task: string = "0";
  multiple_choice: string = "0";
  eng_test: string = "0";
  final_interviewer_comments: string = "";
  interviewer_comments: string = "";
  final_english_interviewer_comments: string = "";
  fullName: string;
  email: string;

  asObject() {
    return { ...this };
  }
}
