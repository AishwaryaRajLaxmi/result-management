import adminModel from "@/app/database/models/adminModel";
import Connect from "@/app/database/Connect";
import {NextResponse } from "next/server";


export const GET = async (req, res) => {
  await Connect();
  try {
    let data = await adminModel.find({});
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
