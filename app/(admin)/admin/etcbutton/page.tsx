import EtcForm from "@/components/Admin/EtcButton/EtcForm";
import { getAllEtcButton } from "@/lib/database/etcButton";
import React from "react";

export default async function page() {
  const data = await getAllEtcButton();
  return (
    <div className="header-admin">
      <h1 className="text-2xl font-bold text">ตั้งค่าปุ่ม ETC</h1>
      <p className="text-sm text-gray-500 mb-6">
        ปรับแต่งการตั้งค่าปุ่มเมนูลัดสำหรับร้านค้า
      </p>
      <EtcForm initialData={data} />
    </div>
  );
}
