import { getProductById } from "@/lib/database/shop";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BuyForm from "@/components/Product/BuyForm";
import { getWalletTopup } from "@/lib/database/wallettopup";
import DOMPurify from "isomorphic-dompurify";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await getProductById(id);
  const wallet = await getWalletTopup();
  
  if (!product) return <div>ไม่พบสินค้าที่ต้องการ</div>;

  return (
    <div className="container header text-black">
      <div className="flex flex-col lg:flex-row gap-2 items-start justify-between">
        
        {/* รูปสินค้า */}
        <div className="flex justify-center w-full lg:w-1/2">
          <div className="relative w-full max-w-[500px] aspect-square rounded-xl overflow-hidden shadow-md lg:sticky lg:top-4">
            <Image
              src={product.image ?? ""}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* รายละเอียดสินค้า */}
        <div className="flex flex-col space-y-6 w-full lg:w-1/2">
          
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">คงเหลือ {product.stocks.length} ชิ้น</Badge>

            {product.stocks.length <= 0 ? (
              <Badge variant="destructive">ไม่พร้อมจำหน่าย</Badge>
            ) : (
              <Badge className="bg-green-600 text-white">พร้อมจำหน่าย</Badge>
            )}
          </div>

          <p className="text-4xl font-semibold text-primary">
            ฿ {product.price.toLocaleString()}
          </p>

          <BuyForm
            remain={product.stocks.length}
            productId={product.id}
            feeAvailable={wallet.feeAvailable}
            price={product.price}
          />

          {/* รายละเอียดสินค้า HTML */}
          <div className="border-t pt-6 leading-relaxed mt-4">
            <h2 className="text-xl font-semibold mb-2">รายละเอียดสินค้า</h2>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.detail ?? "ไม่มีรายละเอียดสินค้า"),
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
