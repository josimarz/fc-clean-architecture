import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {
  FindProductInput,
  FindProductOutput,
  FindProductUseCase,
} from "./find-product.usecase";

describe("[Integration] FindProductUseCase", () => {
  let useCase: FindProductUseCase;
  let repository: ProductRepository;
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();

    repository = new ProductRepository();
    useCase = new FindProductUseCase(repository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should find a product with the given id", async () => {
      const id = "1a03c659-6c0a-4231-8f7a-dab849789208";
      const name = "Keyboard RGB Pro";
      const price = 299.7;
      const product = new Product(id, name, price);
      await repository.create(product);
      const input: FindProductInput = { id };
      const output: FindProductOutput = { id, name, price };
      await expect(useCase.execute(input)).resolves.toMatchObject(output);
    });

    it("should throws an exception due to unable to found a product with the given id", async () => {
      const id = "44cd1d96-c8f9-4f5a-a3eb-48808da460b3";
      const input: FindProductInput = { id };
      await expect(useCase.execute(input)).rejects.toThrow("Product not found");
    });
  });
});
