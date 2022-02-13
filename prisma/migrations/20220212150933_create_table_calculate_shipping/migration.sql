-- CreateTable
CREATE TABLE "calculateShipping" (
    "id" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "cepOrigem" TEXT NOT NULL,
    "cepDestino" TEXT NOT NULL,
    "nomeDestinatario" TEXT NOT NULL,
    "vlTotalFrete" DOUBLE PRECISION NOT NULL,
    "dataPrevistaEntrega" TIMESTAMP(3) NOT NULL,
    "dataConsulta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calculateShipping_pkey" PRIMARY KEY ("id")
);
