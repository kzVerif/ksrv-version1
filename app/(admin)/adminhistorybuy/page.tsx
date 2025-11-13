import { AdminBuyProduct, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<AdminBuyProduct[]> {
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
      time: new Date(11).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(55).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(44).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(34).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(25).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(10).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(15).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(11).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(12).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(78).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(67).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(25).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(22).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(25).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(22).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(7).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(4).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(2).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(10).toLocaleString(),
      owner: "ADMIN",
    },
    {
      id: "728ed52f",
      name: "ไอดี Valorant",
      detail: "m@example.com",
      time: new Date(1).toLocaleString(),
      owner: "ADMIN",
    },
    // ...
  ];
}

export default async function page() {
  const data = await getData();
  return (
    <div className="header-admin container">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">ประวัติการสั่งซื้อ</h1>
        <h2 className="text-sm text-gray-500">
          ประวัติการสั่งซื้อทั้งหมดของร้านค้า
        </h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
