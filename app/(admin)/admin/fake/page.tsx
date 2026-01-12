import Fakeform from '@/components/Fake/FakeForm';
import { authOptions } from '@/lib/auth';
import { getFake } from '@/lib/database/fake';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const sesion = await getServerSession(authOptions)
  if (sesion?.user.role !== "ADMIN" || !sesion) {
   return redirect("/");
  }
  
  const data = await getFake()
  
  return (
    <div className="header-admin">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">ปลอดยอมหน้าเว็ป</h1>
        <h2 className="text-sm text-gray-500">ยอดทั้งหมดที่ตั้งในหน้านี้จะไปบวกเพิ่มกับยอดจริงที่หน้าแรก</h2>
      </div>
      <Fakeform data={data} />
    </div>
  );
}
