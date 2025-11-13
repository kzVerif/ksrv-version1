import { columns, Stocks } from "./columns";
import { DataTable } from "./data-table";

// Mock data generator
async function getData(): Promise<Stocks[]> {
  // สร้าง mock data 15 รายการ
  const mockData: Stocks[] = Array.from({ length: 15 }, (_, i) => {
    // สุ่มสถานะ
    const statusOptions: string[] = ["พร้อมจำหน่าย", "จำหน่ายแล้ว"];
    const randomStatus =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];

    return {
      id: `stock-${i + 1}`, // ID เป็น string และไม่ซ้ำกัน
      detail: `user${i + 1}:password${Math.floor(Math.random() * 100)}`, // detail ที่หลากหลาย
      status: randomStatus, // เพิ่ม status ที่ขาดไป
    };
  });

  return mockData;
}

export default async function page() {
  const data = await getData();
  const name = "สินค้าA"
  return (
    <div className="header-admin">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">จัดการสต็อค {name}</h1>
        <h2 className="text-sm text-gray-500">
          จัดการสินค้าคงเหลือในร้านค้าของคุณ
        </h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
