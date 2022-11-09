export class Homework {
  constructor(uuid: string, studentId: string, courseId: string) {
    this.id = uuid;
    this.studentId = studentId;
    this.courseId = courseId;
  }
  id: string;
  studentId: string;
  courseId: string;
  name: string = "";
  link: string = "";
  rate: string = "";
  date: string = "";

  asObject() {
    return { ...this };
  }
}
