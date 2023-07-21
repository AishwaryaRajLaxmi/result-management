import Connect from "@/app/database/Connect";
import userModel from "@/app/database/models/userModel";
import { genSalt, hash } from "bcryptjs";
import { NextResponse } from "next/server";

// registerUser

export const POST = async (req) => {
  await Connect();

  let records = await req.json();
  let { name, fathersName, school, className, roll, email, contact, password } =
    records;

  let slat = await genSalt(10);

  const hashedPassword = await hash(password, slat);

  let data = new userModel({
    name,
    fathersName,
    school,
    className,
    roll,
    email,
    contact,
    password: hashedPassword,
  });
  try {
    data = await data.save();
    return NextResponse.json({
      msg: "user account Created successfully",
      data,
    });
  } catch (e) {
    return NextResponse.json({ msg: e.message });
  }
};
