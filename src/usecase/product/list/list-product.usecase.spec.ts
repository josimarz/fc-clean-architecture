import Product from "../../../domain/product/entity/product";
import {
  ListProductInput,
  ListProductOutput,
  ListProductUseCase,
} from "./list-product.usecase";

const repositoryMock = {
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
};

describe("ListProductUseCase", () => {
  let useCase: ListProductUseCase;

  beforeEach(() => {
    useCase = new ListProductUseCase(repositoryMock);
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should return a list of products", () => {
      const items: Product[] = [
        new Product(
          "529450d1-79f7-4d0c-a600-7596296b3b64",
          "Persian carpet 25mx25m",
          9877.99
        ),
        new Product(
          "366fb787-14bd-428b-ad49-c2426fef9719",
          "Sega Mega Drive 16 Bit Game Console",
          299.99
        ),
        new Product(
          "a946f8ea-fd28-478e-852c-247276cda9bb",
          "8bitdo M3 Mega Drive Bluetooth",
          140.0
        ),
        new Product(
          "805d92df-a843-442a-867b-15d6e95d6970",
          "GBS Control Transcoder",
          79.97
        ),
        new Product(
          "fae63b8d-d01f-4f96-a6b9-92de7f639d6e",
          "Mega EverDrive X5",
          60.0
        ),
      ];
      repositoryMock.findAll.mockResolvedValueOnce(items);
      const input: ListProductInput = {};
      const output: ListProductOutput = {
        products: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
        })),
      };
      expect(useCase.execute(input)).resolves.toMatchObject(output);
    });
  });
});
