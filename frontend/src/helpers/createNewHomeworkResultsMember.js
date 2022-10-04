export const createHomeworkResaltsMember = (student, homework) => {
	return {students_name: student.fullName, 
            id: student.id, 
            homework: homework,
			total: ""
	};
};

export const updateHomeworkResaltsMember = (student) => {
	return {students_name: student.fullName, 
            id: student.id,
	};
};