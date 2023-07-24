import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {
  UpdateProductInput,
  UpdateProductOutput,
  UpdateProductUseCase,
} from "./update-product.usecase";

describe("[Integration] UpdateProductUseCase", () => {
  let useCase: UpdateProductUseCase;
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
    useCase = new UpdateProductUseCase(repository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should update a product with the given id", async () => {
      const id = "16b47661-669c-478f-8755-45fa97c6a2da";
      const name = "Nintendo 64 Game Console";
      const price = 489.77;
      const product = new Product(id, name, price);
      await repository.create(product);

      const newName = "SNK Neo Geo CD Game Console";
      const newPrice = 699.99;
      const input: UpdateProductInput = { id, name: newName, price: newPrice };
      const output: UpdateProductOutput = {
        id,
        name: newName,
        price: newPrice,
      };

      await expect(useCase.execute(input)).resolves.toMatchObject(output);
    });

    it("should throws an exception due to unable to found the product for the given id", async () => {
      const id = "e1bba9b4-f192-4d76-93c3-6331928f5208";
      const input: UpdateProductInput = {
        id,
        name: "iPhone 14 Pro 256GB",
        price: 1999.99,
      };
      await expect(useCase.execute(input)).rejects.toThrow("Product not found");
    });

    it("should throws an exception due to the given name is empty", async () => {
      const id = "3565d55a-048b-4f51-8afc-0f12c8c01c0d";
      const name = "Sega Master System Game Console";
      const price = 199.5;
      const product = new Product(id, name, price);
      await repository.create(product);
      const input: UpdateProductInput = {
        id,
        name: "",
        price: 99.99,
      };
      await expect(useCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throws an exception due to the given price is less than zero", async () => {
      const id = "14a18d22-5ac5-46b4-85e7-20fbb97675f5";
      const name = "NEC PC Engine";
      const price = 299.6;
      const product = new Product(id, name, price);
      await repository.create(product);
      const input: UpdateProductInput = {
        id,
        name: "NEC PC Engine",
        price: -199.9,
      };
      await expect(useCase.execute(input)).rejects.toThrow(
        "Price must be greater than zero"
      );
    });
  });
});
