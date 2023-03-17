export class Material { 
  constructor(uuid: string, courseId: string) {
    this.id = uuid;
    this.courseId = courseId;
    this.createdAt = Date.now();
  }
  id: string;
  courseId: string;
  createdAt: number;
  name: string = "";
  link: string = "";

  asObject() {
    return { ...this };
  }
}
