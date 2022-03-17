import { Request, Response } from "express";
import { where } from "sequelize/types";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ msg: "User not found" });
  } catch (error) {
    return res.status(500).json({ msg: "something goes wrong", error });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  // PASS THIS TO A MIDDLEWARE
  if (!name && !email) {
    return res
      .status(400)
      .json({ msg: "The id, name, and last name are required" });
  }

  try {
    const existEmail = await User.findOne({
      where: { email },
    });

    if (existEmail) {
      return res.status(400).json({ msg: "this email already exists" });
    }

    const newUser = await User.create({ name, email });

    // const user = new User({ name, email });
    // await user.save();
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error" });
  }
};

export const putUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, lastName } = req.body;
  res.status(200).json({ id, name, lastName });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ id });
};
