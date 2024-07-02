import { Course } from "../types/Course";
import { CourseModel } from "../models/course.model";
import { getById as getUserById } from "./user.services";

export const create = async (course: Course): Promise<Course | null> => {
  try {
    return await CourseModel.create(course);
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const existStudentInCourse = async (
  courseId: string,
  studentId: string
) => {
  try {
    return await CourseModel.findOne({
      _id: courseId,
      inscripts: { $elemMatch: { student: studentId } },
    });
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const addStudentToCourse = async (
  courseId: string,
  studentId: string
) => {
  try {
    const existCourse = await getById(courseId);
    const existStudent = await getUserById(studentId);
    if (!existCourse || !existStudent) return null;
    //verificar si el student existe en el course
    //si existe, no agregarlo nuevamente
    const existStudInCourse = await existStudentInCourse(courseId, studentId);
    //si no existe, agregar student al course
    if (!existStudInCourse) {
        return await CourseModel.findByIdAndUpdate(
          courseId,
          { $push: { inscripts: { student: studentId } } },
          { new: true }
        );
    } else return null
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

/**
 * Una vez que se realizó el pago de un curso, se actualiza la propiedad pay a true,
 * para tener el control sobre esa propiedad y darle acceso al usuario a éste curso en particular
 * @param courseId 
 * @param studentId 
 * @returns Course
 */
export const payCourseOk = async (
  courseId: string,
  studentId: string
) => {
  try {
    return await CourseModel.findOneAndUpdate(
      { _id: courseId, 'inscripts.student': studentId },
      { $set: { 'inscripts.$.pay': true } },
      { new: true }
     );
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const getAll = async (): Promise<Course[] | []> => {
  try {
    return await CourseModel.find({});
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const getById = async (id: string): Promise<Course | null> => {
  try {
    return await CourseModel.findById(id).populate("inscripts.student");
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const update = async (
  id: string,
  body: Course
): Promise<Course | null> => {
  try {
    return await CourseModel.findByIdAndUpdate(id, body, { new: true });
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};

export const remove = async (id: string): Promise<Course | null> => {
  try {
    return await CourseModel.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};
