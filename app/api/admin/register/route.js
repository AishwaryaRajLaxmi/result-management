import Connect from "@/app/database/Connect";
import adminModel from "@/app/database/models/adminModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// registerAdmin
export const POST = async (req) => {
  await Connect();

  let record = await req.json();
  let { userName, password } = record;
  let salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  let data = new adminModel({ userName, password: hashPassword });

  try {
    data = await data.save();
    return NextResponse.json({ msg: "Admin created successfully", data });
  } catch (error) {
    return NextResponse.json({ msg: error.message });
  }
};
