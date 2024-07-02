import { Router } from "express";
import * as controller from '../controllers/course.controllers';
// import { validateGetNews, validatePostNews } from "../middlewares/validators/news.validator";

const router = Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/add-student/:studentId/to-course/:courseId', controller.addStudentToCourse);
router.post('/pay-ok/:studentId/course/:courseId', controller.payCourseOk)

export default router;