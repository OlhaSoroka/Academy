export class Comment {
  constructor(
    uuid: string,
    authorId: string,
    courseId: string,
  ) {
    this.id = uuid;
    this.authorId = authorId;
    this.courseId = courseId;
  }
  id: string;
  authorId: string;
  courseId: string;
  message: string = "";
  createdAt: string = "";

  asObject() {
    return { ...this };
  }
}
