import { columns, Users } from "./columns";
import { DataTable } from "./data-table";

// Mock data generator
async function getData(): Promise<Users[]> {
  // สร้าง mock data 15 รายการ
  const mockData: Users[] = Array.from({ length: 15 }, (_, i) => ({
    id: `user-${i + 1}`,
    username: `user${i + 1}`,
    point: Math.floor(Math.random() * 1000),      // point สุ่ม 0-999
    totalTopup: Math.floor(Math.random() * 50000), // totalTopup สุ่ม 0-49999
  }));
  
  return mockData;
}

export default async function page() {
  const data = await getData();
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
