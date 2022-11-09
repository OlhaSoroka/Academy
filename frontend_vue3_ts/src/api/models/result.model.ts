export class Result {
  constructor(uuid: string, studentId: string, courseId: string) {
    this.id = uuid;
    this.studentId = studentId;
    this.courseId = courseId;
  }
  id: string;
  studentId: string;
  courseId: string;
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
  
  asObject() {
    return { ...this };
  }
}
