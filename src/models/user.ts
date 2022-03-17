import { DataTypes } from "sequelize";
import db from "../db/connections";
import { User } from "../interfaces/models/users";

const User = db.define<User>("User", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.TINYINT,
  },
});

export default User;
