export class EntryResult {
  constructor(uuid: string, studentId: string, courseId: string) {
    this.id = uuid;
    this.studentId = studentId;
    this.courseId = courseId;
  }
  id: string;
  studentId: string;
  courseId: string;
  multiple_choice: string = "0";
  tech_task: string = "0";
  start_total: string = "0";
  eng_test: string = "0";
  total_with_eng: string = "0";
  entry_tech_interview: string = "0";
  total_with_interview: string = "0";
  entry_tech_interviewer_comments: string = "";
  entry_hr_interviewer_comments: string = "";
  student?: string;

  asObject() {
    const result = { ...this };
    // delete unneeded fields
    delete result.student;
    return result;
  }
}

export class ExitResult {
  constructor(uuid: string, studentId: string, courseId: string) {
    this.id = uuid;
    this.studentId = studentId;
    this.courseId = courseId;
  }
  id: string;
  studentId: string;
  courseId: string;
  average_homework_score: string = "0";
  exit_tech_interview: string = "0";
  mentors_feedback: string = "";
  final_interviewer_comments: string = "";
  final_english_interviewer_comments: string = "";
  final_hr_interviewer_comments: string = "";
  student?: string;

  asObject() {
    const result = { ...this };
    // delete unneeded fields
    delete result.student;
    return result;
  }
}
