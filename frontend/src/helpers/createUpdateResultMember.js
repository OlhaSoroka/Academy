export const createResultMember = (student) => {
	return {
		fullName: student.fullName,
		email: student.email,
		multiple_choice:'0',
		tech_task:'0',
		start_total:'',
		eng_test:'0',
		middle_total:'',
		interview_result:'0',
		interviewer_comments:'',
		hr_interviewer_comments:'',
		average_homework_score:'',
		mentors_feedback:'',
		exit_tech_interview:'0',
		final_interviewer_comments:'',
		final_hr_interviewer_comments:'',
		final_english_interviewer_comments:'',
	};
};

export const updateResultMember = (student) => {
	return {
		fullName: student.fullName,
		email: student.email,
		multiple_choice:'0',
		tech_task:'0',
		start_total:'',
		eng_test:'0',
		middle_total:'',
		interview_result:'0',
		interviewer_comments:'',
		hr_interviewer_comments:'',
		average_homework_score:'',
		mentors_feedback:'',
		exit_tech_interview:'0',
		final_interviewer_comments:'',
		final_hr_interviewer_comments:'',
		final_english_interviewer_comments:'',
	};
};
