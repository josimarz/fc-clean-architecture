import Product from "../../../domain/product/entity/product";
import {
  FindProductInput,
  FindProductOutput,
  FindProductUseCase,
} from "./find-product.usecase";

const repositoryMock = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
};

describe("FindProductUseCase", () => {
  let useCase: FindProductUseCase;

  beforeEach(() => {
    useCase = new FindProductUseCase(repositoryMock);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should find a product with the given id", () => {
      const id = "1a03c659-6c0a-4231-8f7a-dab849789208";
      const name = "Keyboard RGB Pro";
      const price = 299.7;
      const product = new Product(id, name, price);
      repositoryMock.find.mockResolvedValueOnce(product);
      const input: FindProductInput = { id };
      const output: FindProductOutput = { id, name, price };
      expect(useCase.execute(input)).resolves.toMatchObject(output);
    });

    it("should throws an exception due to unable to found a product with the given id", () => {
      const id = "44cd1d96-c8f9-4f5a-a3eb-48808da460b3";
      repositoryMock.find.mockRejectedValueOnce(new Error("Product not found"));
      const input: FindProductInput = { id };
      expect(useCase.execute(input)).rejects.toThrow("Product not found");
    });
  });
});
