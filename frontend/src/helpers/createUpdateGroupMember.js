export const createGroupMember = (student) => {
	return {
		fullName: student.fullName,
		email: student.email,
		phone: '',
		city: '',
		age: '',
		education: '',
		eng_level: '',
	};
};

export const updateGroupMember = (student) => {
	return {
		fullName: student.fullName,
		email: student.email,
	};
};
