import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export type FindProductInput = {
  readonly id: string;
};

export type FindProductOutput = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
};

export class FindProductUseCase {
  constructor(private readonly repository: ProductRepositoryInterface) {}

  async execute(input: FindProductInput): Promise<FindProductOutput> {
    const product = await this.repository.find(input.id);
    const { id, name, price } = product;
    return { id, name, price };
  }
}
