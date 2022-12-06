import { ROLES } from "../../models/router.model";

export class Guide {
	constructor(uuid: string, role:ROLES) {
	  this.id = uuid;
	  this.role=role;
	}
	id: string;
	role: ROLES;
	name: string = "";
	link: string = "";
	roleLabel?: string = "";
  
	asObject() {
	  return { ...this };
	}
  }
  