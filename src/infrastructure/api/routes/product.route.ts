import { Request, Response, Router } from "express";
import NotificationError from "../../../domain/@shared/notification/notification.error";
import {
  CreateProductInput,
  CreateProductUseCase,
} from "../../../usecase/product/create/create-product.usecase";
import {
  FindProductInput,
  FindProductUseCase,
} from "../../../usecase/product/find/find-product.usecase";
import {
  ListProductInput,
  ListProductUseCase,
} from "../../../usecase/product/list/list-product.usecase";
import {
  UpdateProductInput,
  UpdateProductUseCase,
} from "../../../usecase/product/update/update-product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRouter = Router();

productRouter.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());
  const input: CreateProductInput = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const output = await useCase.execute(input);
    res.status(201).send(output);
  } catch (error) {
    if (error instanceof NotificationError) {
      res.status(400).send({ message: error.message });
    }
  }
});

productRouter.put("/:id", async (req: Request, res: Response) => {
  const useCase = new UpdateProductUseCase(new ProductRepository());
  const input: UpdateProductInput = {
    id: req.params.id,
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const output = await useCase.execute(input);
    res.status(200).send(output);
  } catch (error) {
    if (error instanceof NotificationError) {
      res.status(400).send({ message: error.message });
      return;
    }
    if (error instanceof Error) {
      res.status(404).send({ message: error.message });
    }
  }
});

productRouter.get("/:id", async (req: Request, res: Response) => {
  const useCase = new FindProductUseCase(new ProductRepository());
  const input: FindProductInput = {
    id: req.params.id,
  };
  try {
    const output = await useCase.execute(input);
    res.status(200).send(output);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send({ message: error.message });
    }
  }
});

productRouter.get("/", async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());
  const input: ListProductInput = {};
  try {
    const output = await useCase.execute(input);
    res.status(200).send(output);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    }
  }
});
