import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Connect from "@/app/database/Connect";
import adminModel from "@/app/database/models/adminModel";
import { NextResponse } from "next/server";

// loginAdmin
export const POST = async (req) => {
  await Connect();

  try {
    let { userName, password } = await req.json();
    const dbResponse = await adminModel.findOne({ userName });
    if (!dbResponse) {
      return NextResponse.json({ msg: "Invalid username" }, { status: 400 });
    }

    // declare validPassword variable
    const validPassword = await bcrypt.compare(password, dbResponse.password);
    if (!validPassword) {
      return NextResponse.json(
        { msg: "Invalid username and password" },
        { status: 400 }
      );
    }

    // generate token
    const tokenData = {
      id: dbResponse._id,
      username: dbResponse.userName,
    };

    const token = await Jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      msg: "Login Successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ msg: error.message });
  }
};
