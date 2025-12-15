import { DataTable } from "./data-table";
import { AllCodes, columns } from "./columns";
import { getAllCode } from "@/lib/database/code";
import AddCodeButton from "@/components/Admin/Code/AddCodeButton";
import CodeSettinngForm from "@/components/Admin/Topup/CodeSettingForm";
import { getTopupCode } from "@/lib/database/topupcode";

export default async function page() {
  const data: AllCodes[] = await getAllCode();
  const dataCode = await  getTopupCode();
  console.log(dataCode);
  
  return (
    <div className="header-admin">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">จัดการโค้ด</h1>
        <h2 className="text-sm text-gray-500">จัดการโค้ดทั้งหมดของคุณ</h2>
      </div>
      <div className="flex items-center justify-end">
        <AddCodeButton />
      </div>
      <DataTable columns={columns} data={data} />
      <CodeSettinngForm data={dataCode} />
    </div>
  );
}
