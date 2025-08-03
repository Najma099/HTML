import {PrismaClient} from '../../generated/prisma'
import {NextResponse, NextRequest} from 'next/server';
import client from '@/db';

export async function GET(req: NextResponse) {
    const user = await client.user.findFirst();
    return NextResponse.json({
        email: user?.email,
        name: "Najma"
    })
}


export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    try{
        await client.user.create({
            data:{
                email: body.email,
                password: body.password
            },
        })
    }
    catch(err) {
        console.log(err);
    }

    return NextResponse.json({
        body,
        message: "Signed up"
    });
}