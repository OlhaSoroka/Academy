export class LectureHomework {
  constructor(uuid: string, lectureId: string, courseId: string) {
    this.id = uuid;
    this.lectureId = lectureId;
    this.courseId = courseId;
  }
  id: string;
  lectureId: string;
  lecture?: string;
  courseId: string;
  students: StudentHomework[] = [];

  asObject?() {
    const lectureHomework = { ...this };
    delete lectureHomework.lecture;
    return lectureHomework;
  }
}

export class StudentHomework {
  constructor(studentId: string) {
    this.studentId = studentId;
  }
  studentId: string;
  student?: string;
  rate: string = "";
  link: string = "";
  comment: string = "";
  date: string = "";
  deadline: string="";

  asObject() {
    const studentHomework = { ...this };
    delete studentHomework.student;
    return studentHomework;
  }
}
