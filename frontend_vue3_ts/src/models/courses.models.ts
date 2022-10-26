class Applicant {
 some!: any
}
class Comment {
    date!: string;
    date_final_interview!: string;
    date_project_demo!: string;
    date_project_start!: string;
    docs_link!: string;
}
class Gpoup {
    age!: string;
    city!: string;
    education!: string;
    email!: string;
    eng_level!: string;
    fullName!: string;
    phone!: string;
}

class Homework{
    date!: string;
    id!: string;
    link!: string;
    name!: string;
    rate!: string;
}

class HomeworkResalt{
    homework!: Array<Homework>;
    id!: string;
    students_name!: string;
    total!: number
}

class Material {
    id!: string;
    link!: string;
    name!: string;
}

class Resalts {
    average_homework_score!: string;
    email!: string;
    eng_test!: string;  
    exit_tech_interview!: string;
    final_english_interviewer_comments!: string;
    final_hr_interviewer_comments!: string;
    final_interviewer_comments!: string;
    fullName!: string;
    hr_interviewer_comments!: string;
    interview_result!: string;
    interviewer_comments!: string;
    mentors_feedback!: string;
    middle_total!: string;
    multiple_choice!: string;
    start_total!: string;
    tech_task!: string;
}

export class ICourse {
    applicants!: Array<Applicant>;
    comments!: Array<Comment>;
    date!: string;
    date_final_interview!: string;
    date_project_demo!: string;
    date_project_start!: string;
    docs_link!: string;
    group!: Array<Gpoup>;
    homework!: Array<Homework>;
    homework_results!: Array<HomeworkResalt>;
    id!: number;
    materials!: Array<Material>;
    name!: string;
    results!: Array<Resalts>;
    status!: string;
}
