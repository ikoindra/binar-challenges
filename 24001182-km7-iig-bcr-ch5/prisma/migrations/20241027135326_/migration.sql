-- CreateTable
CREATE TABLE "car_types" (
    "id" BIGSERIAL NOT NULL,
    "body_style" VARCHAR NOT NULL,
    "capacity" INTEGER NOT NULL,
    "fuel_type" VARCHAR NOT NULL,

    CONSTRAINT "car_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" UUID NOT NULL,
    "plate" VARCHAR NOT NULL,
    "image" VARCHAR NOT NULL,
    "rentPerDay" INTEGER NOT NULL,
    "availableAt" TIMESTAMP(6) NOT NULL,
    "available" BOOLEAN NOT NULL,
    "year" INTEGER NOT NULL,
    "carsmodels_id" BIGINT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carsModels" (
    "id" BIGSERIAL NOT NULL,
    "model_name" VARCHAR NOT NULL,
    "manufacturer" VARCHAR NOT NULL,
    "transmission" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "type_id" BIGINT NOT NULL,
    "specs" JSONB NOT NULL,
    "options" JSONB NOT NULL,

    CONSTRAINT "carsModels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_carsmodel_id_fkey" FOREIGN KEY ("carsmodels_id") REFERENCES "carsModels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carsModels" ADD CONSTRAINT "carsModels_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "car_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
