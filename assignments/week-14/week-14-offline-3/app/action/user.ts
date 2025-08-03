"use server"
import client from '@/db';
import {NextResponse} from 'next/server'
export async function solve(email: string, password: string) {
    //const body = await req.json();
    //console.log(body);
    try{
        await client.user.create({
            data:{
                email: email,
                password: password
            },
        });
        return true;
    }
    catch(err) {
        console.log(err);
        return false
    }
}