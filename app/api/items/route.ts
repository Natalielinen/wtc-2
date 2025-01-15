import Item from "@/app/models/Item";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function GET() {
    await dbConnect();

    try {
        const items = await Item.find({});

        return NextResponse.json(items);

    } catch (e: any) {
        console.log(e);
        return NextResponse.json({error: e.message});
    }

   
}