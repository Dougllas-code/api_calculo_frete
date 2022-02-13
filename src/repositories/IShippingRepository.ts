
interface IGetShippingCalculation {
  peso: string
  cepOrigem: string
  cepDestino: string
  nomeDestinatario: string
}

interface IShippingRepository {
  getShippingCalculation({ peso, cepOrigem, cepDestino, nomeDestinatario }: IGetShippingCalculation)
}

export { IGetShippingCalculation, IShippingRepository }