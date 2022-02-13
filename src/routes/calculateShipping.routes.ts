import { Router } from 'express'
import { shippingController } from '../useCases'

const router = Router()

router.get('/frete', (request, response) => {
  return shippingController.handle(request, response)
})

export { router }