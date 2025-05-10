import UserModel from "../models/user";

const handleGetAllUser = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (err) {
    console.log(err);
  }
};

export { handleGetAllUser };
