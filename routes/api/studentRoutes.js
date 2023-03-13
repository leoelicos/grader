const router = require('express').Router()
const {
  getStudents,
  createStudent,
  getSingleStudent,
  deleteStudent,
  addAssignment,
  removeAssignment
  //
} = require('../../controllers/studentController')

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

module.exports = router
