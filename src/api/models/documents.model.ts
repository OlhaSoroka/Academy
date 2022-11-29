export class Document {
	constructor(uuid: string, courseId: string) {
	  this.id = uuid;
	  this.courseId = courseId;
	}
	id: string;
	courseId: string;
	name: string = "";
	link: string = "";
  
	asObject() {
	  return { ...this };
	}
  }
  