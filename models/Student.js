import { Schema, model } from 'mongoose'
import assignmentSchema from './Assignment.js'

// Schema to create Student model
const studentSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50
    },
    last: {
      type: String,
      required: true,
      max_length: 50
    },
    github: {
      type: String,
      required: true,
      max_length: 50
    },
    assignments: [assignmentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
)

const Student = model('student', studentSchema)

export default Student
