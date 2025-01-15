
import User from "@/app/models/User";
import { UserCreateBodyType } from "@/app/types";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcrypt";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    // Парсим тело запроса
    const body: UserCreateBodyType = await req.json();
    console.log("Полученные данные:", body);

    // Проверяем, существует ли пользователь
    const user = await User.findOne({ userEmail: body.userEmail });

    if (user) {
      return NextResponse.json(
        { message: "Пользователь уже существует" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashSync(body.userPassword, 10); 

    // Создаем нового пользователя
    await User.create({
      userName: body.userName,
      userEmail: body.userEmail,
      userPassword: hashedPassword,
    });

    return NextResponse.json({ message: "Пользователь успешно создан" }, { status: 201 });
  } catch (err: any) {
    console.error("Ошибка [CREATE_USER]:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}