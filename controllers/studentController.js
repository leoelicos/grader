const { ObjectId } = require('mongoose').Types
const { Student, Course } = require('../models')

module.exports = {
  // Get all students
  async getStudents(req, res) {
    try {
      const students = await Student.find()
      const headCount = await Student.aggregate().count('studentCount').exec()
      const studentObj = { students, headCount }
      res.json(studentObj)
    } catch (e) {
      console.error(e)
      res.status(500).json(err)
    }
  },

  // Get a single student
  async getSingleStudent(req, res) {
    try {
      const student = await Student.findOne({ _id: req.params.studentId }).select('-__v')
      if (!student) {
        res.status(404).json({ message: 'No student with that ID' })
        return
      }
      const grade = await Student.aggregate([
        { $match: { _id: new ObjectId(req.params.studentId) } },
        { $unwind: '$assignments' },
        {
          $group: {
            _id: new ObjectId(req.params.studentId),
            overallGrade: { $avg: '$assignments.score' }
          }
        }
      ])
      res.status(200).json({ student, grade })
    } catch (e) {
      console.error(e)
      res.status(500).json(e)
    }
  },

  // create a new student
  async createStudent(req, res) {
    try {
      const student = await Student.create(req.body)
      res.status(200).json(student)
    } catch (e) {
      console.error(e)
      res.status(500).json(e)
    }
  },
  // Delete a student and remove them from the course
  async deleteStudent(req, res) {
    try {
      const student = Student.findOneAndRemove({ _id: req.params.studentId })

      if (!student) {
        res.status(404).json({ message: 'No such student exists' })
        return
      }

      const course = await Course.findOneAndUpdate(
        { students: req.params.studentId },
        { $pull: { students: req.params.studentId } },
        { new: true }
        //
      )

      if (!course) {
        res.status(404).json({ message: 'Student deleted, but no courses found' })
        return
      }

      res.json({ message: 'Student successfully deleted' })
    } catch (e) {
      console.error(e)
      res.status(500).json(e)
    }
  },

  // Add an assignment to a student
  async addAssignment(req, res) {
    try {
      const student = await Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true } //
      )
      if (!student) {
        res.status(404).json({ message: 'No student found with that ID :(' })
        return
      }
      res.status(200).json(student)
    } catch (e) {
      console.error(e)
      res.status(500).json(err)
    }
  },

  // Remove assignment from a student
  async removeAssignment(req, res) {
    try {
      const student = await Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
        { runValidators: true, new: true } //
      )
      if (!student) {
        res.status(404).json({ message: 'No student found with that ID :(' })
        return
      }
      res.status(200).json(student)
    } catch (e) {
      console.error(e)
      res.status(500).json(e)
    }
  }
}
