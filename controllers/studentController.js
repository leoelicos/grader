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
      const student = await Student.findOne({ _id: req.params.studentId }).select('-__v').lean()
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
  createStudent(req, res) {
    Student.create(req.body)
      .then((student) => res.json(student))
      .catch((err) => res.status(500).json(err))
  },
  // Delete a student and remove them from the course
  deleteStudent(req, res) {
    Student.findOneAndRemove({ _id: req.params.studentId })
      .then((student) => (!student ? res.status(404).json({ message: 'No such student exists' }) : Course.findOneAndUpdate({ students: req.params.studentId }, { $pull: { students: req.params.studentId } }, { new: true })))
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'Student deleted, but no courses found'
            })
          : res.json({ message: 'Student successfully deleted' })
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },

  // Add an assignment to a student
  addAssignment(req, res) {
    console.log('You are adding an assignment')
    console.log(req.body)
    Student.findOneAndUpdate({ _id: req.params.studentId }, { $addToSet: { assignments: req.body } }, { runValidators: true, new: true })
      .then((student) => (!student ? res.status(404).json({ message: 'No student found with that ID :(' }) : res.json(student)))
      .catch((err) => res.status(500).json(err))
  },
  // Remove assignment from a student
  removeAssignment(req, res) {
    Student.findOneAndUpdate({ _id: req.params.studentId }, { $pull: { assignment: { assignmentId: req.params.assignmentId } } }, { runValidators: true, new: true })
      .then((student) => (!student ? res.status(404).json({ message: 'No student found with that ID :(' }) : res.json(student)))
      .catch((err) => res.status(500).json(err))
  }
}
