import { getAllUsers } from "@/lib/database/users";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function page() {
  const data = await getAllUsers();
  return (
    <div className="header-admin">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">จัดการผู้ใช้</h1>
        <h2 className="text-sm text-gray-500">จัดการผู้ใช้ทั้งหมดของคุณ</h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
