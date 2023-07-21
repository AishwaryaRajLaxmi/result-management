import Connect from "@/app/database/Connect";
import userModel from "@/app/database/models/userModel";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// loginUser
export const POST = async (req) => {
  await Connect();
  let records = await req.json();
  const { email, password } = records;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ msg: "Invalid email" }, { status: 400 });
    }

    // password validation
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { msg: "invalid email and password" },
        { status: 400 }
      );
    }

    //  generateToken
    const tokenData = {
      id: user._id,
      email: user.email,
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
  } catch (err) {
    return NextResponse.json({ msg: err.message });
  }
};
