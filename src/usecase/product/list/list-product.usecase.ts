import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export type ListProductInput = {};

export type ProductOutput = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
};

export type ListProductOutput = {
  readonly products: ProductOutput[];
};

export class ListProductUseCase {
  constructor(private readonly repository: ProductRepositoryInterface) {}

  async execute(input: ListProductInput): Promise<ListProductOutput> {
    const items = await this.repository.findAll();
    return {
      products: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
    };
  }
}
