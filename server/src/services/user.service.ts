import User from "../model/user.model";

const createUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Email already registered");
  }
  return await new User({ email, password, name }).save();
};

const getUserById = (id: string) => User.findById(id);

export default {
  createUser,
  getUserById
};
