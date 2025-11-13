import { columns, BuyProduct } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<BuyProduct[]> {
  // Fetch data from your API here.
//   export type BuyProduct = {
//   id: string
//   name: string
//   detail: string
//   time: string
// }
  return [
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date().toLocaleString()
    },
    // ...
  ]
}

export default async function page() {
    const data = await getData()
  return (
    <div className="header container">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">ประวัติการสั่งซื้อ</h1>
        <h2 className="text-sm text-gray-500">
          ประวัติการสั่งซื้อทั้งหมดของคุณ
        </h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
