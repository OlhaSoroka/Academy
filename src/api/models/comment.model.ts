export class Comment {
  constructor(uuid: string, authorId: string, courseId: string) {
    this.id = uuid;
    this.authorId = authorId;
    this.courseId = courseId;
  }
  id: string;
  authorId: string;
  courseId: string;
  message: string = "";
  createdAt: number = 0;
  author?: string;

  asObject() {
    const comment = { ...this };
    // delete unneeded fields
    delete comment.author;
    return comment;
  }
}
