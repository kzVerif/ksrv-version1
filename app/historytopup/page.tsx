import { columns, TopupHis } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<TopupHis[]> {
  return [
    {
      id: "TPU-001",
      refId: "REF-8821",
      type: "TrueMoney",
      status: "success",
      reason: "-",
      time: "2025-02-10 14:12:32",
      amount: 98
    },
    {
      id: "TPU-002",
      refId: "REF-7753",
      type: "Banking",
      status: "pending",
      reason: "-",
      time: "2025-02-10 13:59:21",
      amount: 98
    },
    {
      id: "TPU-003",
      refId: "REF-9921",
      type: "TrueMoney",
      status: "fail",
      reason: "สลิปไม่ถูกต้อง",
      time: "2025-02-10 13:45:10",
      amount: 98
    },
    {
      id: "TPU-004",
      refId: "REF-1129",
      type: "Banking",
      status: "success",
      reason: "-",
      time: "2025-02-10 13:18:02",
      amount: 98
    },
    {
      id: "TPU-005",
      refId: "REF-9004",
      type: "TrueMoney",
      status: "success",
      reason: "-",
      time: "2025-02-10 12:59:41",
      amount: 98
    },
    {
      id: "TPU-006",
      refId: "REF-6672",
      type: "Banking",
      status: "pending",
      reason: "-",
      time: "2025-02-10 12:40:30",
      amount: 98
    },
    {
      id: "TPU-007",
      refId: "REF-5521",
      type: "TrueMoney",
      status: "success",
      reason: "-",
      time: "2025-02-10 12:20:19",
      amount: 98
    },
    {
      id: "TPU-008",
      refId: "REF-4410",
      type: "Banking",
      status: "fail",
      reason: "ยอดไม่ตรง",
      time: "2025-02-10 12:02:11",
      amount: 98
    },
    {
      id: "TPU-009",
      refId: "REF-8800",
      type: "TrueMoney",
      status: "success",
      reason: "-",
      time: "2025-02-10 11:50:00",
      amount: 98
    },
    {
      id: "TPU-010",
      refId: "REF-3301",
      type: "Banking",
      status: "success",
      reason: "-",
      time: "2025-02-10 11:32:54",
      amount: 982
    },
    {
      id: "TPU-011",
      refId: "REF-9912",
      type: "TrueMoney",
      status: "pending",
      reason: "-",
      time: "2025-02-10 11:10:28",
      amount: 981
    },
    {
      id: "TPU-012",
      refId: "REF-7719",
      type: "Banking",
      status: "success",
      reason: "-",
      time: "2025-02-10 10:44:02",
      amount: 986
    },
    {
      id: "TPU-013",
      refId: "REF-1005",
      type: "TrueMoney",
      status: "success",
      reason: "-",
      time: "2025-02-10 10:25:17",
      amount: 989
    },
    {
      id: "TPU-014",
      refId: "REF-2209",
      type: "Banking",
      status: "fail",
      reason: "รายการซ้ำ",
      time: "2025-02-10 10:02:49",
      amount: 981
    },
    {
      id: "TPU-015",
      refId: "REF-5008",
      type: "TrueMoney",
      status: "success",
      reason: "-",
      time: "2025-02-10 09:41:33",
      amount: 984
    },
    {
      id: "TPU-016",
      refId: "REF-3112",
      type: "Banking",
      status: "pending",
      reason: "-",
      time: "2025-02-10 09:18:20",
      amount: 982
    },
    {
      id: "TPU-017",
      refId: "REF-1233",
      type: "TrueMoney",
      status: "success",
      reason: "-",
      time: "2025-02-10 08:59:10",
      amount: 988
    },
    {
      id: "TPU-018",
      refId: "REF-8811",
      type: "Banking",
      status: "success",
      reason: "-",
      time: "2025-02-10 08:40:42",
      amount: 980
    },
    {
      id: "TPU-019",
      refId: "REF-6650",
      type: "TrueMoney",
      status: "fail",
      reason: "QR ไม่พบในระบบ",
      time: "2025-02-10 08:20:18",
      amount: 981
    },
    {
      id: "TPU-020",
      refId: "REF-2201",
      type: "Banking",
      status: "success",
      reason: "-",
      time: "2025-02-10 08:01:55",
      amount: 92
    },
  ];
}


export default async function page() {
    const data = await getData()
  return (
    <div className="header container">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">ประวัติการเติมเงิน</h1>
        <h2 className="text-sm text-gray-500">
          ประวัติการเติมเงินทั้งหมดของคุณ
        </h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
