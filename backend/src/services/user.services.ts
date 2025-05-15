import { UserModel } from "../models";
import { IUser } from "../interfaces";
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
    const user = await UserModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
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

export { handleGetAllUser, handleCreateUser };
