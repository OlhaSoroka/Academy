import { ROLES } from "../../models/router.model";

export class Update {
	constructor(uuid: string, courseId: string, role:ROLES, type:UpdateType,category:UpdateCategory) {
	  this.id = uuid;
	  this.courseId = courseId;
	  this.role = role;
	  this.type = type;
	  this.category = category

	}
	id: string;
	
	message: string = "";
	role: ROLES;
	type:UpdateType;
	category:UpdateCategory;
	courseId: string = "";
	authorId: string = "";
	createdAt:string = "";
  
	asObject() {
	  return { ...this };
	}
  }
  

  export enum UpdateType {
	UPDATE = "update",
	CREATE = "create",
  }
  

  export enum UpdateCategory {
	MAIN_INFO = "main_info",
	GROUP= "group",
	LECTURE="lecture",
	DOCUMENT="document",
	COMMENT="comment"
  }
  