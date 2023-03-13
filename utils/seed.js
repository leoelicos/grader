import connection from '../config/connection.js'
import { Course, Student } from '../models/index.js'

import { getRandomName, getRandomAssignments } from './data.js'

connection.on('error', (err) => err)

connection.once('open', async () => {
  try {
    await Course.deleteMany({})
    await Student.deleteMany({})
    const studentIds = []
    for (let i = 0; i < 20; i++) {
      const fullName = getRandomName()
      const { insertedId } = await Student.collection.insertOne(
        {
          first: fullName.split(' ')[0],
          last: fullName.split(' ')[1],
          github: `${fullName.split(' ')[0]}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`,
          assignments: getRandomAssignments(20)
        },
        { new: true }
      )
      studentIds.push(insertedId)
    }

    await Course.collection.insertOne({
      courseName: 'UCLA',
      inPerson: false,
      students: studentIds
    })

    console.info('Seeding complete! 🌱')
  } catch (e) {
    console.error(e)
  } finally {
    process.exit(0)
  }
})
