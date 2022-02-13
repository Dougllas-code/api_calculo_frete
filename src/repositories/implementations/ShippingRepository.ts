import { Shipping } from "@prisma/client";
import axios from "axios";
import prismaClient from "../../prisma";
import { IGetShippingCalculation, IShippingRepository } from "../IShippingRepository";

interface ISaveShippingCalculationDTO {
  peso: string
  cepOrigem: string
  cepDestino: string
  nomeDestinatario: string
  vlTotalFrete: number
  dataPrevistaEntrega: Date
}

class ShippingRepository implements IShippingRepository {
  public async getShippingCalculation({ peso, cepOrigem, cepDestino, nomeDestinatario }: IGetShippingCalculation) {

    const dadosCepOrigem = await this.fetchDataCEP(cepOrigem)
    const dadosCepDestino = await this.fetchDataCEP(cepDestino)

    const calculoFrete = this.calculateShipping(peso, dadosCepDestino.ddd, dadosCepOrigem.ddd, dadosCepDestino.uf, dadosCepOrigem.uf)

    const dataPrevistaEntrega = calculoFrete.dataPrevistaEntrega
    const vlTotalFrete = calculoFrete.vlTotalFrete

    const dadosFreteSalvos = await this.saveShippingCalculation({ peso, cepOrigem, cepDestino, nomeDestinatario, vlTotalFrete, dataPrevistaEntrega })

    return {
      vlTotalFrete: dadosFreteSalvos.vlTotalFrete,
      dataPrevistaEntrega: dadosFreteSalvos.dataPrevistaEntrega,
      cepOrigem: dadosFreteSalvos.cepOrigem,
      cepDestino: dadosFreteSalvos.cepDestino
    }
  }

  private calculateShipping(peso: string, dddCepDestino: string, dddCepOrigem: string, estadoCepDestino: string, estadoCepOrigem: string) {

    const dataAgora = new Date()
    const valorPorKg = 1.25

    var vlTotalFrete = parseFloat(peso) * valorPorKg
    var dataPrevistaEntrega: Date

    if (dddCepOrigem === dddCepDestino) {
      dataPrevistaEntrega = new Date(dataAgora.setDate(dataAgora.getDate() + 1))
      vlTotalFrete = vlTotalFrete * 0.50

    } else if (estadoCepOrigem === estadoCepDestino) {
      dataPrevistaEntrega = new Date(dataAgora.setDate(dataAgora.getDate() + 3))
      vlTotalFrete = vlTotalFrete * 0.75

    } else {
      dataPrevistaEntrega = new Date(dataAgora.setDate(dataAgora.getDate() + 10))
    }

    const calculo = { dataPrevistaEntrega, vlTotalFrete }

    return calculo
  }

  private async fetchDataCEP(cep: string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      return response.data
    } catch (error) {
      throw new Error("Error fetch data CEP")
    }
  }

  private async saveShippingCalculation({ peso, cepOrigem, cepDestino, nomeDestinatario, vlTotalFrete, dataPrevistaEntrega }: ISaveShippingCalculationDTO): Promise<Shipping> {
    const pesoFloat = Number.parseFloat(peso)
    try {
      const shippingCalculation = await prismaClient.shipping.create({
        data: {
          peso: pesoFloat,
          cepOrigem,
          cepDestino,
          nomeDestinatario,
          vlTotalFrete,
          dataPrevistaEntrega
        },
      })

      return shippingCalculation
    } catch (error) {
      return error
    }
  }
}

export { ShippingRepository }