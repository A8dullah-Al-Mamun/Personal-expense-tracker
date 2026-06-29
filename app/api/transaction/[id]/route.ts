import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    await Transaction.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "সফলভাবে ডিলিট হয়েছে!",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "ডিলিট করতে সমস্যা হয়েছে",
      },
      { status: 500 }
    );
  }
}