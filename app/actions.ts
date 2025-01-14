import dbConnect from "@/lib/dbConnect";
import { UserCreateBodyType } from "./types";
import User from "./models/User";

export async function registerUser(body: UserCreateBodyType) {
  try {
    await dbConnect();

    const user = await User.findOne({ email: body.userEmail });

    if (user) {

      throw new Error('Пользователь уже существует');
    }

    await User.create({
      userName: body.userName,
      userEmail: body.userEmail,
      userPassword: body.userPassword
    });


  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
