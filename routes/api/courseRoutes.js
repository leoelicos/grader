const router = require('express').Router()
const {
  getCourses,
  createCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse //
} = require('../../controllers/courseController.js')

router //
  .route('/')
  .get(getCourses)
  .post(createCourse)

router //
  .route('/:courseId')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse)

module.exports = router
