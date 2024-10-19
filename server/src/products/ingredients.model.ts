import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface IngredientsCreationAttrs {
  name: string;
  image: string;
}

@Table({ tableName: "Ingredients" })
export class Ingredients extends Model<Ingredients, IngredientsCreationAttrs> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  image: string;
}
