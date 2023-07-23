import {
  CreateProductInput,
  CreateProductOuput,
  CreateProductUseCase,
} from "./create-product.usecase";

const repositoryMock = {
  create: jest.fn().mockResolvedValue(void 0),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
};

describe("CreateProductUseCase", () => {
  let useCase: CreateProductUseCase;

  beforeEach(() => {
    useCase = new CreateProductUseCase(repositoryMock);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should create a new product", () => {
      const id = "d6502e94-bcb0-4081-9cff-322b4c8eb7bc";
      const name = "MacBook Pro 2023";
      const price = 3099.99;
      const input: CreateProductInput = { id, name, price };
      const output: CreateProductOuput = { id, name, price };
      expect(useCase.execute(input)).resolves.toMatchObject(output);
    });

    it("should throws an exception due to given id is empty", () => {
      const id = "";
      const name = "MacBook Pro 2023";
      const price = 3099.99;
      const input: CreateProductInput = { id, name, price };
      expect(useCase.execute(input)).rejects.toThrow("Id is required");
    });

    it("should throws an exception due to given name is empty", () => {
      const id = "d6502e94-bcb0-4081-9cff-322b4c8eb7bc";
      const name = "";
      const price = 3099.99;
      const input: CreateProductInput = { id, name, price };
      expect(useCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throws an exception due to given price is less than zero", () => {
      const id = "d6502e94-bcb0-4081-9cff-322b4c8eb7bc";
      const name = "MacBook Pro 2023";
      const price = -1099.8;
      const input: CreateProductInput = { id, name, price };
      expect(useCase.execute(input)).rejects.toThrow(
        "Price must be greater than zero"
      );
    });
  });
});
