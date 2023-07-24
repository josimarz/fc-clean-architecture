import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {
  CreateProductInput,
  CreateProductOuput,
  CreateProductUseCase,
} from "./create-product.usecase";

describe("[Integration] CreateProductUseCase", () => {
  let useCase: CreateProductUseCase;
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
    useCase = new CreateProductUseCase(repository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should create a new product", async () => {
      const id = "d6502e94-bcb0-4081-9cff-322b4c8eb7bc";
      const name = "MacBook Pro 2023";
      const price = 3099.99;
      const input: CreateProductInput = { id, name, price };
      const output: CreateProductOuput = { id, name, price };
      await expect(useCase.execute(input)).resolves.toMatchObject(output);
    });

    it("should throws an exception due to given id is empty", async () => {
      const id = "";
      const name = "MacBook Pro 2023";
      const price = 3099.99;
      const input: CreateProductInput = { id, name, price };
      await expect(useCase.execute(input)).rejects.toThrow("Id is required");
    });

    it("should throws an exception due to given name is empty", async () => {
      const id = "d6502e94-bcb0-4081-9cff-322b4c8eb7bc";
      const name = "";
      const price = 3099.99;
      const input: CreateProductInput = { id, name, price };
      await expect(useCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throws an exception due to given price is less than zero", async () => {
      const id = "d6502e94-bcb0-4081-9cff-322b4c8eb7bc";
      const name = "MacBook Pro 2023";
      const price = -1099.8;
      const input: CreateProductInput = { id, name, price };
      await expect(useCase.execute(input)).rejects.toThrow(
        "Price must be greater than zero"
      );
    });
  });
});
