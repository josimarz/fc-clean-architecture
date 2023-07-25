import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should throws an exception due to given id and name are empty", () => {
    expect(() => new Product("", "", 99.9)).toThrow(
      "product: Id is required,product: Name is required"
    );
  });

  it("should throws an exception due to given id is empty and price is less than zero", () => {
    expect(() => new Product("", "MacBook Pro 2023", -1999.8)).toThrow(
      "product: Id is required,product: Price must be greater than zero"
    );
  });

  it("should throws an exception due to given name is empty and price is less than zero", () => {
    expect(() => new Product("123", "", -99.9)).toThrow(
      "product: Name is required,product: Price must be greater than zero"
    );
  });

  it("should throws and exception due to given id and name are empty and price is less than zero", () => {
    expect(() => new Product("", "", -88.8)).toThrow(
      "product: Id is required,product: Name is required,product: Price must be greater than zero"
    );
  });
});
