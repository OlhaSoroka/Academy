import { SelectItem } from "./options.model";
import { ROLES } from "./router.model";

export const guideRoleOptions: SelectItem[] = [
  { label: "Student's guide", value: ROLES.STUDENTS_ROLE },
  { label: "Mentor's guide", value: ROLES.MENTOR_ROLE },
];
