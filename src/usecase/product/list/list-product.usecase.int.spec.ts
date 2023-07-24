import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {
  ListProductInput,
  ListProductOutput,
  ListProductUseCase,
} from "./list-product.usecase";

describe("[Integration] ListProductUseCase", () => {
  let useCase: ListProductUseCase;
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
    useCase = new ListProductUseCase(repository);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
  });

  describe("execute", () => {
    it("should return a list of products", async () => {
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
      await Promise.all(items.map((item) => repository.create(item)));
      const input: ListProductInput = {};
      const output: ListProductOutput = {
        products: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
        })),
      };
      await expect(useCase.execute(input)).resolves.toMatchObject(output);
    });
  });
});
