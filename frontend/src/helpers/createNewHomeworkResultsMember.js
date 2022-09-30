export const createHomeworkResaltsMember = (student, homework) => {
	return {students_name: student.fullName, 
            id: student.id, 
            homework: homework
	};
};

export const updateHomeworkResaltsMember = (student) => {
	return {students_name: student.fullName, 
            id: student.id,
	};
};