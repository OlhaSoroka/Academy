export interface Course {
  status: CourseStatus;
  name: string;
  id: number;
  date_final_interview: string;
  date: string;
  materials: CourseMaterial[];
  group: CourseMember[];
  homework_results: CourseHomeworkResult[];
  date_project_demo: string;
  date_project_start: string;
  comments: CourseComment[];
  results: CourseResult[];
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

export interface CourseMember {
  fullName: string;
  email: string;
  age: string;
  education: string;
  eng_level: string;
  city: string;
  phone: string;
}

export interface CourseHomeworkResult {
  id: string;
  students_name: string;
  total: string;
  homework: Homework[];
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

export interface CourseResult {
  average_homework_score: string;
  middle_total: string;
  final_hr_interviewer_comments: string;
  interview_result: string;
  exit_tech_interview: string;
  start_total: string;
  hr_interviewer_comments: string;
  mentors_feedback: string;
  tech_task: string;
  multiple_choice: string;
  eng_test: string;
  email: string;
  final_interviewer_comments: string;
  interviewer_comments: string;
  final_english_interviewer_comments: string;
  fullName: string;
}
