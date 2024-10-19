import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { Product } from "./entities/product.entity";
import { Products } from "./products.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products) private productsRepository: typeof Products,
    private fileService: FilesService
  ) {}

  async create(dto: CreateProductDto, image: File): Promise<Products> {
    if (!image) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Изображение обязательно",
        },
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const fileName = await this.fileService.createFile(image);

      const ingredientsWithImages = await Promise.all(
        dto.ingredients.map(async (ingredient) => {
          const ingredientImageFileName = await this.fileService.createFile(
            ingredient.image
          );
          return {
            ...ingredient,
            image: ingredientImageFileName,
          };
        })
      );

      const product = await this.productsRepository.create({
        ...dto,
        // ingredients: ingredientsWithImages,
        image: fileName,
      });

      return product;
    } catch (error) {
      console.error("Create Product Error:", error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Ошибка при добавлении продукта",
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      return await this.productsRepository.findAll();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Ошибка при получении списка продуктов",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOneById(id: number): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id },
        include: { all: true },
      });

      if (!product) {
        throw new NotFoundException(`Продукт с id ${id} не найден`);
      }

      return product;
    } catch (error) {
      console.error("Error finding product:", error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Ошибка при поиске продукта",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, dto: Partial<CreateProductDto>): Promise<Products> {
    try {
      const product = await this.productsRepository.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException(`Продукт с id ${id} не найден`);
      }

      const updatedProduct = await product.update(dto);
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Ошибка при редактировании продукта",
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const deletedCount = await this.productsRepository.destroy({
        where: { id },
      });

      if (deletedCount === 0) {
        throw new NotFoundException(`Продукт с id ${id} не найден`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Ошибка при удалении продукта",
          error: error.message,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
