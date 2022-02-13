import { ShippingRepository } from "../repositories/implementations/ShippingRepository";
import { ShippingController } from "./ShippingController";
import { ShippingUseCase } from "./ShippingUseCase";

const shippingRepository = new ShippingRepository()
const shippingUseCase = new ShippingUseCase(shippingRepository)
const shippingController = new ShippingController(shippingUseCase)

export { shippingController }