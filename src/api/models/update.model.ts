import { ROLES } from "../../models/router.model";

export class Update {
  constructor(
    uuid: string,
    courseId: string,
    authorId: string,
    role: ROLES,
    type: UpdateType,
    category: UpdateCategory,
  ) {
    this.id = uuid;
    this.courseId = courseId;
    this.authorId = authorId;
    this.role = role;
    this.type = type;
    this.category = category;
    this.createdAt = Date.now();
  }
  id: string;
  message: string = "";
  role: ROLES;
  type: UpdateType;
  category: UpdateCategory;
  courseId: string;
  authorId: string;
  createdAt: any;

  field: string | null = null;
  oldValue: string | null = null;
  newValue: string | null = null;

  asObject() {
    return { ...this };
  }
}

export enum UpdateType {
  UPDATE = "update",
  CREATE = "create",
}

export enum UpdateCategory {
  MAIN_INFO = "main info",
  GROUP = "group",
  LECTURE = "lecture",
  DOCUMENT = "document",
  COMMENT = "comment",
  MATERIAL = "material",
  HOMEWORK = "homework link"
}

export interface UpdateEvent<T> {
  uniqIdentifier: string;
  data: T;
  colDef: { field: string };
  newValue: string;
  oldValue: string;
}
