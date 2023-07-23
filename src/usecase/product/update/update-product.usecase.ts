import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export type UpdateProductInput = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
};

export type UpdateProductOutput = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
};

export class UpdateProductUseCase {
  constructor(private readonly repository: ProductRepositoryInterface) {}

  async execute(input: UpdateProductInput): Promise<UpdateProductOutput> {
    const product = await this.repository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);
    await this.repository.update(product);
    const { id, name, price } = product;
    return { id, name, price };
  }
}
