"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma"
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(NextRequest) {
    const product = await prisma.products.findMany()
    let json_response = {
        status: "success",
        results: product,
    }
    return NextResponse.json(json_response);
};

export async function POST(NextRequest) {
    const json = await NextRequest.json();
    console.log('json', json);
    try {
        const product = await prisma.products.create({
            data: {
                name: json.pname,
                description: json.pdesc,
                content: json.pcontent,
                action: json.paction,
                route: json.proute,
                url: json.purl,
            }
        });
        return NextResponse.json({
            status: true,
            data: product,
            message: 'Product added successfully',
        });
    } catch (error) {
        console.log('Error', error);
        return NextResponse.json({
            status: false,
            error: error.message,
        });
    }
}

// export async function PUT(NextRequest) {
//     const json = await NextRequest.json();
//     try {
//         const todo = await prisma.todos.update({
//             where: { id: json.id, },
//             data: { ...json },
//         });
//         return NextResponse.json({
//             status: true,
//             data: todo,
//             message: 'Todo updated successfully',
//         });
//     } catch (error) {
//         console.log('Error', error);
//         return NextResponse.json({
//             status: false,
//             error: error.message,
//         });
//     }
// }

// export async function DELETE(NextRequest) {
//     const json = await NextRequest.json();
//     try {
//         const deleteUser = await prisma.todos.delete({
//             where: { id: json.id, },
//         })
//         return NextResponse.json({
//             status: true,
//             data: deleteUser,
//             message: 'Todo deleted successfully',
//         });
//     } catch (error) {
//         console.log('Error', error);
//         return NextResponse.json({
//             status: false,
//             error: error.message,
//         });
//     }
// }
