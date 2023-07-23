import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export type CreateProductInput = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
};

export type CreateProductOuput = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
};

export class CreateProductUseCase {
  constructor(private readonly repository: ProductRepositoryInterface) {}

  async execute(input: CreateProductInput): Promise<CreateProductOuput> {
    const { id, name, price } = input;
    const product = new Product(id, name, price);
    await this.repository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
