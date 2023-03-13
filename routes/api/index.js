import Router from 'express'
const router = Router()

import courseRoutes from './courseRoutes.js'
import studentRoutes from './studentRoutes.js'

router.use('/courses', courseRoutes)
router.use('/students', studentRoutes)

export default router
