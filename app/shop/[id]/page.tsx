import { getProductById } from "@/lib/database/shop";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BuyForm from "@/components/Product/BuyForm";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (product === null) {
    return <div>ไม่พบสินค้าที่ต้องการ</div>;
  }
  return (
    <div className="container header py-10">
      {/* ✅ ใช้ flex-row บนจอใหญ่ */}
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* ✅ รูปสินค้า */}
        <div className="flex justify-center w-full lg:w-1/2">
          <div className="relative w-full max-w-[500px] aspect-square rounded-xl overflow-hidden shadow-md">
            <Image
              src={product.image ?? ""}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 500px"
              priority
            />
          </div>
        </div>

        {/* ✅ รายละเอียดสินค้า */}
        <div className="flex flex-col space-y-6 w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 wrap-break-word">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">
              คงเหลือ {product.stocks.length} ชิ้น
            </Badge>
            {product.stocks.length <= 0 ? (
              <Badge variant={"destructive"}>ไม่พร้อมจำหน่าย</Badge>
            ) : (
              <Badge className="bg-green-600 text-white text-sm">
                พร้อมจำหน่าย
              </Badge>
            )}
          </div>
          <p className="text-4xl font-semibold text-primary">
            ฿ {product.price.toLocaleString()}
          </p>

          {/* ✅ ฟอร์มกรอกจำนวน (responsive) */}
          <BuyForm remain={product.stocks.length} productId={product.id}  />
          {/* ✅ รายละเอียดสินค้า */}
          <div className="border-t pt-6 text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            <h2 className="text-xl font-semibold mb-2">รายละเอียดสินค้า</h2>
            {product.detail}
          </div>
        </div>
      </div>
    </div>
  );
}
