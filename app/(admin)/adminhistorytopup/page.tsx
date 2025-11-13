import { columns, AdminTopupHis } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<AdminTopupHis[]> {
  return [
    {
      id: "TPU-001",
      refId: "REF-8821",
      type: "TrueMoney",
      owner: "User2",
      reason: "-",
      time: "2025-02-10 14:12:32",
      amount: 99
    },
    {
      id: "TPU-002",
      refId: "REF-7753",
      type: "Banking",
      owner: "User2",
      reason: "-",
      time: "2025-02-10 13:59:21",
      amount: 9
    },
    {
      id: "TPU-003",
      refId: "REF-9921",
      type: "TrueMoney",
      owner: "User3",
      reason: "สลิปไม่ถูกต้อง",
      time: "2025-02-10 13:45:10",
      amount: 9910
    },
    {
      id: "TPU-004",
      refId: "REF-1129",
      type: "Banking",
      owner: "User2",
      reason: "-",
      time: "2025-02-10 13:18:02",
      amount: 99
    },
    {
      id: "TPU-005",
      refId: "REF-9004",
      type: "TrueMoney",
      owner: "User2",
      reason: "-",
      time: "2025-02-10 12:59:41",
      amount: 99
    },
    {
      id: "TPU-006",
      refId: "REF-6672",
      type: "Banking",
      owner: "User1",
      reason: "-",
      time: "2025-02-10 12:40:30",
      amount: 99
    },
    {
      id: "TPU-007",
      refId: "REF-5521",
      type: "TrueMoney",
      owner: "User2",
      reason: "-",
      time: "2025-02-10 12:20:19",
      amount: 2000
    },
    {
      id: "TPU-008",
      refId: "REF-4410",
      type: "Banking",
      owner: "User3",
      reason: "ยอดไม่ตรง",
      time: "2025-02-10 12:02:11",
      amount: 992
    },
    {
      id: "TPU-009",
      refId: "REF-8800",
      type: "TrueMoney",
      owner: "User2",
      reason: "-",
      time: "2025-02-10 11:50:00",
      amount: 9987
    },
    {
      id: "TPU-010",
      refId: "REF-3301",
      type: "Banking",
      owner: "User2",
      reason: "-",
      time: "2025-02-10 11:32:54",
      amount: 99
    },
  ];
}

export default async function page() {
  const data = await getData();
  return (
    <div className="header-admin container">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">ประวัติการเติมเงิน</h1>
        <h2 className="text-sm text-gray-500">
          ประวัติการเติมเงินทั้งหมดของร้านค้า
        </h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
