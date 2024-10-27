const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCarsModel = async (manufacturer) => {
  // Construct the where clause
  const query = {};
  if (manufacturer) {
    query.manufacturer = { contains: manufacturer, mode: "insensitive" };
  }

  // Find by query
  const searchedCarsModel = await prisma.carsModels.findMany({
    where: query,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarsModel = JSONBigInt.stringify(searchedCarsModel);
  return JSONBigInt.parse(serializedCarsModel);
};

exports.getCarsModelById = async (id) => {
  const carsModel = await prisma.carsModels.findFirst({
    where: {
      id: id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarsModel = JSONBigInt.stringify(carsModel);
  return JSONBigInt.parse(serializedCarsModel);
};

exports.createCarsModel = async (data) => {
  const newCarsModel = await prisma.carsModels.create({
    data: {
      ...data,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarsModel = JSONBigInt.stringify(newCarsModel);
  return JSONBigInt.parse(serializedCarsModel);
};

exports.updateCarsModel = async (id, data) => {
  const updatedCarsModel = await prisma.carsModels.update({
    where: { id },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarsModel = JSONBigInt.stringify(updatedCarsModel);
  return JSONBigInt.parse(serializedCarsModel);
};

exports.deleteCarsModel = async (id) => {
  const deletedCarsModel = await prisma.carsModels.delete({
    where: { id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarsModel = JSONBigInt.stringify(deletedCarsModel);
  return JSONBigInt.parse(serializedCarsModel);
};
