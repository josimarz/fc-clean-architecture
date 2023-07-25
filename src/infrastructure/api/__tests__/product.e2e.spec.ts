import request from "supertest";
import ProductModel from "../../product/repository/sequelize/product.model";
import { app, sequelize } from "../express";

describe("Product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("/POST product", () => {
    it("should post a product", async () => {
      const id = "1fc13a0d-39a9-4b51-8474-f8f4f1e45b7d";
      const name = "Sangue, Suor e Pixels";
      const price = 49.9;
      const res = await request(app).post("/product").send({ id, name, price });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ id, name, price });
    });

    it("should throws a bad request due to given name is empty", async () => {
      const id = "33bfbcfa-c5fa-448e-a643-ee4868d5d0ea";
      const name = "";
      const price = 59.86;
      const res = await request(app).post("/product").send({ id, name, price });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("product: Name is required");
    });

    it("should throws a bad request due to given price is less than zero", async () => {
      const id = "7d3ccedc-a5bb-4a00-93c7-992118f3f4d2";
      const name = "Boneco de Pano";
      const price = -39.88;
      const res = await request(app).post("/product").send({ id, name, price });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("product: Price must be greater than zero");
    });
  });

  describe("/PUT/:id product", () => {
    it("should update a product", async () => {
      const id = "5a4365e0-3824-4624-8d3a-cdd1845bf9b0";
      const name = "O Voo da Libélula";
      const price = 44.8;
      await ProductModel.create({ id, name, price });

      const newName = "À mesa com o diabo";
      const newPrice = 66.6;
      const res = await request(app)
        .put(`/product/${id}`)
        .send({ id, name: newName, price: newPrice });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id,
        name: newName,
        price: newPrice,
      });
    });

    it("should throws a bad request to due given name is empty", async () => {
      const id = "743313a2-d2f4-4a32-ae1a-839f332263f0";
      const name = "Meio Sol Amarelo";
      const price = 54.7;
      await ProductModel.create({ id, name, price });

      const newName = "";
      const newPrice = 32.44;
      const res = await request(app)
        .put(`/product/${id}`)
        .send({ id, name: newName, price: newPrice });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("product: Name is required");
    });

    it("should throws a bad request to due given price is less than zero", async () => {
      const id = "e75e7664-796f-4694-85e9-ff21f9cc6fbe";
      const name = "Alfabeto dos Ossos";
      const price = 42.33;
      await ProductModel.create({ id, name, price });

      const newName = "Adeus, China. O Último Bailarino de Mao";
      const newPrice = -59.9;
      const res = await request(app)
        .put(`/product/${id}`)
        .send({ id, name: newName, price: newPrice });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("product: Price must be greater than zero");
    });

    it("should throws a not found exception due to unable to find a product with the given id", async () => {
      const id = "c7180420-87bf-4935-937d-7e448b0f8d0e";
      const name = "Toda luz que não podemos ver";
      const price = 32.9;
      const res = await request(app)
        .put(`/product/${id}`)
        .send({ id, name, price });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Product not found");
    });
  });

  describe("/GET/:id product", () => {
    it("should get a product with the given id", async () => {
      const id = "eea80947-2c3b-466b-84b5-70502eca6000";
      const name = "A Guerra dos Consoles";
      const price = 89.9;
      await ProductModel.create({ id, name, price });
      const res = await request(app).get(`/product/${id}`).send();
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ id, name, price });
    });

    it("should throws a not found error due to unable to find a product with the given id", async () => {
      const id = "ca6d4c01-bcc7-4f62-b0f1-47ec4dfec704";
      const res = await request(app).get(`/product/${id}`).send();
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Product not found");
    });
  });

  describe("/GET product", () => {
    it("should list all products", async () => {
      const products = [
        {
          id: "dafc5ad8-4e80-4ddf-86af-4236f75214de",
          name: "Perto o bastante para tocar",
          price: 19.9,
        },
        {
          id: "eb1aae25-17f1-4d27-a1f8-78885348932c",
          name: "Infância Interrompida",
          price: 34.3,
        },
        {
          id: "2317a1ab-0d6b-4d48-ad88-288a63a0322b",
          name: "Por dentro do Jihad",
          price: 39.8,
        },
        {
          id: "513007d9-2053-46bd-b40c-3dd325e32634",
          name: "Eu Sou Malala",
          price: 52.89,
        },
        {
          id: "998ca6c0-2b3f-47fb-8ee2-3586e1d11e6c",
          name: "Filho do Hamas",
          price: 49.5,
        },
      ];
      await ProductModel.bulkCreate(products);
      const res = await request(app).get("/product").send();
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ products });
    });
  });
});
