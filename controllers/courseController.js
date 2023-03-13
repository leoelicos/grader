const { Student, Course } = require('../models')

module.exports = {
  // Get all courses
  async getCourses(req, res) {
    try {
      const courses = await Course.find() //
      // .populate('students')
      res.json(courses)
    } catch (e) {
      console.error(e)
      res.status(500).json(e)
    }
  },
  // Get a course
  async getSingleCourse(req, res) {
    try {
      const course = await Course.findOne({ _id: req.params.courseId }).select('-__v')
      if (!course) {
        res.status(404).json({ message: 'No course with that ID' })
        return
      }
      res.json(course)
    } catch (e) {
      console.error(e)
      res.status(500).json(err)
    }
  },
  // Create a course
  async createCourse(req, res) {
    try {
      const course = await Course.create(req.body)
      res.json(course)
    } catch (e) {
      console.error(e)
      res.status(500).json(err)
    }
  },
  // Delete a course
  async deleteCourse(req, res) {
    try {
      const course = await Course.findOneAndDelete({ _id: req.params.courseId })

      if (!course) {
        res.status(404).json({ message: 'No course with that ID' })
        throw 'No course with that ID'
      }

      await Student.deleteMany({ _id: { $in: course.students } })

      res.json({ message: 'Course and students deleted!' })
    } catch (e) {
      console.error(e)
    }
  },
  // Update a course
  async updateCourse(req, res) {
    try {
      const course = await Course.findOneAndUpdate(
        //
        { _id: req.params.courseId },
        { $set: req.body },
        { runValidators: true, new: true }
      )

      if (!course) {
        res.status(404).json({ message: 'No course with that ID' })
        throw 'No course with that ID'
      }

      res.json(course)
    } catch (e) {
      console.error(e)
      res.status(500).json(e)
    }
  }
}
