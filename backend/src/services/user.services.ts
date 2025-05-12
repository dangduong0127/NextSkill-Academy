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
    const user = await UserModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      age: data.age,
      avatar: data.avatar,
      phoneNumber: data.phoneNumber,
    });
  } catch (err) {
    console.log(err);
  }
};

export { handleGetAllUser, handleCreateUser };
