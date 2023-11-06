"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) { return 'Please sign in to proceed' }

    const users = await prisma.todo.findMany({
        where: {
            authorId: session?.user?.id
        },
    })
    let json_response = {
        status: "success",
        results: users,
    }
    return NextResponse.json(json_response);
};

export async function POST(NextRequest) {
    const json = await NextRequest.json();
    const session = await getServerSession(authOptions)
    try {
        const todo = await prisma.todo.create({
            data: {
                ...json,
                authorId: session?.user?.id,
            }
        });
        return NextResponse.json({
            status: true,
            data: todo,
            message: 'Todo created successfully',
        });
    } catch (error) {
        console.log('Error', error);
        return NextResponse.json({
            status: false,
            error: error.message,
        });
    }
}

export async function PUT(NextRequest) {
    const json = await NextRequest.json();
    console.log('json >>>> ', json);
    try {
        const todo = await prisma.todo.update({
            where: { id: json.id, },
            data: { ...json },
        });
        return NextResponse.json({
            status: true,
            data: todo,
            message: 'Todo updated successfully',
        });
    } catch (error) {
        console.log('Error', error);
        return NextResponse.json({
            status: false,
            error: error.message,
        });
    }
}
export async function DELETE(NextRequest) {
    const json = await NextRequest.json();
    console.log('json >>>>> ', json);
    try {
        const deleteUser = await prisma.user.delete({
            where: { id: 1, },
        })
        return NextResponse.json({
            status: true,
            data: deleteUser,
            message: 'Todo deleted successfully',
        });
    } catch (error) {
        console.log('Error', error);
        return NextResponse.json({
            status: false,
            error: error.message,
        });
    }
}

