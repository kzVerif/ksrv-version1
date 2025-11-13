import { columns, Products } from "./columns";
import { DataTable } from "./data-table";

// Mock data generator
async function getData(): Promise<Products[]> {
  // สร้าง mock data 15 รายการ
  return [
    {
      id: "prod-1",
      name: "Classic T-Shirt",
      price: 350,
      image: "https://example.com/images/tshirt.jpg",
      detail: "Comfortable 100% cotton t-shirt.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-2",
      name: "Wireless Headphones",
      price: 1990,
      image: "https://example.com/images/headphones.jpg",
      detail: "Noise-cancelling over-ear headphones.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-3",
      name: "Coffee Mug",
      price: 220,
      image: "https://example.com/images/mug.jpg",
      detail: "12oz ceramic coffee mug.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-4",
      name: "Running Shoes",
      price: 2500,
      image: "https://example.com/images/shoes.jpg",
      detail: "Lightweight running shoes for all terrains.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-5",
      name: "Leather Wallet",
      price: 890,
      image: "https://example.com/images/wallet.jpg",
      detail: "Genuine leather wallet with 6 card slots.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-6",
      name: "Smartphone",
      price: 15900,
      image: "https://example.com/images/phone.jpg",
      detail: "Latest model smartphone with 128GB storage.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-7",
      name: "Laptop Backpack",
      price: 1200,
      image: "https://example.com/images/backpack.jpg",
      detail: "Durable and waterproof backpack.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-8",
      name: "Smart Watch",
      price: 4500,
      image: "https://example.com/images/watch.jpg",
      detail: "Fitness tracker and smart notifications.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-9",
      name: "Yoga Mat",
      price: 450,
      image: "https://example.com/images/yogamat.jpg",
      detail: "Eco-friendly non-slip yoga mat.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-10",
      name: "Blender",
      price: 1100,
      image: "https://example.com/images/blender.jpg",
      detail: "High-speed blender for smoothies.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-11",
      name: "Desk Lamp",
      price: 750,
      image: "https://example.com/images/lamp.jpg",
      detail: "LED desk lamp with adjustable brightness.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-12",
      name: "Water Bottle",
      price: 300,
      image: "https://example.com/images/bottle.jpg",
      detail: "500ml stainless steel insulated bottle.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-13",
      name: "Fiction Book",
      price: 280,
      image: "https://example.com/images/book.jpg",
      detail: "Bestselling fiction novel.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-14",
      name: "Sunglasses",
      price: 1300,
      image: "https://example.com/images/sunglasses.jpg",
      detail: "UV400 protection polarized sunglasses.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
    {
      id: "prod-15",
      name: "Portable Speaker",
      price: 990,
      image: "https://example.com/images/speaker.jpg",
      detail: "Bluetooth portable speaker with 10-hour battery.",
      stock: 10,
      sold: 20,
      category: "gamepass"
    },
  ];
}

export default async function page() {
  const data = await getData();
  return (
    <div className="header-admin">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">จัดการสินค้า</h1>
        <h2 className="text-sm text-gray-500">
          จัดการสินค้าทั้งหมดในร้านค้าของคุณ
        </h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
