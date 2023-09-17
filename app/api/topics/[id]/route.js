import Topic from "@/Models/topic";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { newTitle: title, newDescription: description } = await request.json();
        await connectMongoDB();
        await Topic.findByIdAndUpdate(id, { title, description });

        return NextResponse.json({ message: "Topic updated" }, { status: 200 })
    } catch (error) {
        console.log(error);
    }
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const topic = await Topic.findOne({ _id: id });

    return NextResponse.json({ topic })
}