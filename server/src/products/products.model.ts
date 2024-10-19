import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../users/users.model";
import { Ingredients } from "./ingredients.model";

interface ProductsCreationAttrs {
  title: string;
  description: string;
  image: string;
  size: string[];
  typeDough: string[];
  ingredients: Ingredients[];
  price: number;
}

@Table({ tableName: "Products" })
export class Products extends Model<Products, ProductsCreationAttrs> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  size: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  typeDough: string[];

  @Column({ type: DataType.ARRAY(DataType.JSONB) })
  ingredients: Ingredients[];

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
