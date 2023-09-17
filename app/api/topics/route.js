import Topic from "@/Models/topic";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, description } = await request.json();
        await connectMongoDB();

        await Topic.create({ title, description });

        if (!title || !description) {
            return NextResponse.json({ message: "Kindly fill all input filelds" }, { status: 500 })
        }

        return NextResponse.json({ message: "Topic Created" }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}

export async function GET(request) { 
    try {
        await connectMongoDB();
        const topics = await Topic.find();

        if (topics) {
            return NextResponse.json({ topics })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server error", error }, { status: 500 })

    }
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 })
}