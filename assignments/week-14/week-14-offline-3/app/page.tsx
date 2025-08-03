import axios from "axios";
import {PrismaClient} from './generated/prisma';
import {NextResponse, NextRequest} from 'next/server'; 
import client from '@/db';

async function fetchData() {
  const user = await client.user.findFirst();
  return {
    email: user?.email,
    name: "najma"
  }
}

export default async function Home() {
  const data = await fetchData();

  return (
    <div>
      <p>Email: {data.email}</p>
      <p>Name: {data.name}</p>
    </div>
  );
}
