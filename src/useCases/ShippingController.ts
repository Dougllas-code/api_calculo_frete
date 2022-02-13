import { Request, Response } from "express";
import { ShippingUseCase } from "./ShippingUseCase";

class ShippingController {

  constructor(private shippingUseCase: ShippingUseCase) { }
  async handle(request: Request, response: Response) {
    const { peso, cepOrigem, cepDestino, nomeDestinatario } = request.body

    try {
      const result = await this.shippingUseCase.execute({ peso, cepOrigem, cepDestino, nomeDestinatario })
      return response.status(200).json(result)

    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}

export { ShippingController }