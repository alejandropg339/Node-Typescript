import { Model } from "sequelize";
export interface User extends Model {
  name: string;
  email: string;
}
