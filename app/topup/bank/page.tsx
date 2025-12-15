import BankTopup from "@/components/Topup/BankTopup";
import { getBankTopup } from "@/lib/database/banktopup";
import { redirect } from "next/navigation";

export default async function page() {
  const bank = await getBankTopup()
  if (!bank.available) { 
    return redirect("/topup");
  }
  return (
    <div className="header container">
        <div className="mb-4">
        <h1 className="text-2xl font-bold text">เติมเงินเข้าสู่ระบบ</h1>
        <h2 className="text-sm text-gray-500">เติมเงินผ่านธนาคาร</h2>
      </div>
      <BankTopup bank={bank} />
    </div>
  );
}
