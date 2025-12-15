import CodeTopup from "@/components/Topup/CodeTopup";
import { getTopupCode } from "@/lib/database/topupcode";
import { get } from "http";
import { redirect } from "next/navigation";

export default async function page() {
  const code = await getTopupCode();
  if (!code.available) {
    return redirect("/topup");
  }
  return (
    <div className="header container">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">เติมเงินเข้าสู่ระบบ</h1>
        <h2 className="text-sm text-gray-500">เติมเงินผ่านโค้ด</h2>
      </div>
      <CodeTopup />
    </div>
  );
}
