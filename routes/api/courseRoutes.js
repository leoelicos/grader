import Router from 'express'
const router = Router()
import {
  getCourses,
  createCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse //
} from '../../controllers/courseController.js'

router //
  .route('/')
  .get(getCourses)
  .post(createCourse)

router //
  .route('/:courseId')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse)

export default router
