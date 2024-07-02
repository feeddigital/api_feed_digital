export enum UserType {
    Student = 'STUDENT',
    Teacher = 'TEACHER',
    Admin = 'ADMIN',
};

export interface User {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    image: string;
    type: UserType; 
    active: boolean;
}