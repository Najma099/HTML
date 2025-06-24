import axios from 'axios';

async function getUserDetails() {
  await new Promise((r) => setTimeout(r,5000));
  const response = await axios.get('http://localhost:3000/api/user');
  return response.data;
}

export default async function Home() {
  const userData = await getUserDetails();
  console.log(userData);

  return (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center border border-gray-200 p-4 font-serif rounded-md shadow text-emerald-300">
      <div>{userData.email}</div>
      <div>{userData.name}</div>
    </div>
  </div>
);
}