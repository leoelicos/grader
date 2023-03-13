import Router from 'express'
const router = Router()
import {
  getStudents,
  createStudent,
  getSingleStudent,
  deleteStudent,
  addAssignment,
  removeAssignment
  //
} from '../../controllers/studentController.js'

router //
  .route('/')
  .get(getStudents)
  .post(createStudent)

router //
  .route('/:studentId')
  .get(getSingleStudent)
  .delete(deleteStudent)

router //
  .route('/:studentId/assignments')
  .post(addAssignment)

router //
  .route('/:studentId/assignments/:assignmentId')
  .delete(removeAssignment)

export default router
