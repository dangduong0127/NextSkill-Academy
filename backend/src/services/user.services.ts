import { UserModel } from "../models";
import { IUser } from "../interfaces";
import bcrypt from "bcrypt";
const saltRounds = 10;

const handleGetAllUser = async () => {
  try {
    const users = await UserModel.find()
      .populate({ path: "role", select: "-_id" })
      .select("-password -__v");
    return users;
  } catch (err) {
    console.log(err);
  }
};

const handleCreateUser = async (data: IUser) => {
  try {
    const validate = () => {
      if (!data.name) throw { status: 201, message: "Name is required" };

      if (!data.email) throw { status: 201, message: "Email is required" };

      if (!data.password)
        throw { status: 201, message: "Password is required" };

      if (!data.role) throw { status: 201, message: "Role is required" };
    };
    validate();

    //hash password
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = await UserModel.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      age: data.age ?? "",
      avatar: data.avatar ?? "",
      phoneNumber: data.phoneNumber ?? "",
    });
    if (user) {
      return {
        status: 201,
        message: "User created successfully",
      };
    } else {
      return {
        status: 400,
        message: "User created false",
      };
    }
  } catch (err: any) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return {
        status: 400,
        message: "Email already exists",
      };
    }

    return {
      status: err.status ?? 500,
      message: err.message ?? "Internal server error",
    };
  }
};

const handleLogin = async (data: IUser) => {
  try {
    if (!data.email) throw { status: 201, message: "Email is required" };
    if (!data.password) throw { status: 201, message: "Password is required" };
    const user = await UserModel.findOne({ email: data.email });
    if (user) {
      const comparePass = await bcrypt.compare(data.password, user.password);
      if (comparePass) {
        return {
          status: 200,
          message: "Login successfully",
        };
      } else {
        return {
          status: 400,
          message: "Invalid password",
        };
      }
    } else {
      return {
        status: 400,
        message: "Email is not registered",
      };
    }
  } catch (err: any) {
    return {
      status: err.status ?? 500,
      message: err.message ?? "Internal server error",
    };
  }
};

export { handleGetAllUser, handleCreateUser, handleLogin };
