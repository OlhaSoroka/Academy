export class Lecture {
  constructor(uuid: string, courseId: string) {
    this.id = uuid;
    this.courseId = courseId;
  }
  id: string;
  courseId: string;
  name: string = "";
  dateOfLecture: string = "";
  dateOfDeadline: string = "";
  mentorId: string = "";
  meet_link: string = "";
  presentation: string = "";
  mentor?: string;
  timeOfLecture: string = "";

  asObject() {
    const lecture = { ...this };
    // delete unneeded fields
    delete lecture.mentor;
    return lecture;
  }
}
