import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Ingredients } from "../ingredients.model";

export class CreateProductDto {
  @ApiProperty({ example: "peperony", description: "название" })
  @IsString({ message: "Должно быть строкой" })
  readonly title: string;
  @ApiProperty({ example: "очень вкусная пицца", description: "описание" })
  readonly description: string;
  @ApiProperty({
    example: "[маленькая, средная, большая]",
    description: "размеры",
  })
  readonly size: string[];
  @ApiProperty({ example: "[тонкое]", description: "типы теста" })
  readonly typeDough: string[];
  @ApiProperty({ example: "[помидоры, колбаса]", description: "ингредиенты" })
  readonly ingredients: Ingredients[];
  @ApiProperty({ example: "1000сом", description: "цена" })
  readonly price: number;
}
