import { IGetShippingCalculation, IShippingRepository } from "../repositories/IShippingRepository";

class ShippingUseCase {

  constructor(private shippingRepository: IShippingRepository) { }

  async execute({ peso, cepOrigem, cepDestino, nomeDestinatario }: IGetShippingCalculation) {

    const calculateShipping = await this.shippingRepository.getShippingCalculation({ peso, cepOrigem, cepDestino, nomeDestinatario })
    
    return calculateShipping
  }
}

export { ShippingUseCase }