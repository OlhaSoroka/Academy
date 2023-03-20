export class Course {
  constructor(uuid: string) {
    this.id = uuid;
    this.createdAt = Date.now();
  }
  id: string;
  status: CourseStatus = CourseStatus.NOT_STARTED;
  name: string = "";
  createdDate: string = "";
  createdAt: number;
  date_final_interview: string = "";
  date_course_start: string = ""
  date_project_demo: string = "";
  date_project_start: string = "";

  asObject() {
    return { ...this };
  }
}

export enum CourseStatus {
  NOT_STARTED = "not started",
  IN_PROGRESS = "in progress",
  FINISHED = "finished",
}

