import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getCategories } from "@/lib/database/category";
import { DeleteCategoriesSiggestButton } from "@/components/Admin/Suggest/DeleteCategoriesSiggestButton";
import { AddCategoriesSuggestButton } from "@/components/Admin/Suggest/AddCategoriesSuggestButton";
import { getSuggestProducts } from "@/lib/database/shop";
import { DeleteProductSuggest } from "@/components/Admin/Suggest/DeleteProductSuggest";
import { AddProductSuggestButton } from "@/components/Admin/Suggest/AddProductSuggestButton";

export default async function page() {
  const cData = await getCategories();
  const sData = await getSuggestProducts();
  return (
    <div className="header-admin">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">หมวดหมู่แนะนำ</h1>
        <h2 className="text-sm text-gray-500">
          เลือกหมวดหมู่ที่คุณอยากให้ลูกค้าเห็นก่อนเป็นพิเศษ
        </h2>
        <div className="flex items-end justify-end">
          <AddCategoriesSuggestButton />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cData.categories.map((c: any) => (
          <Card
            key={c.id}
            className="rounded-xl border bg-white cursor-pointer"
          >
            <CardContent className="flex flex-col items-start justify-center gap-3">
              <div className="w-full rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={c.image}
                  width={1980}
                  height={300}
                  alt={`หมวดหมู่ ${c.name}`}
                  className="w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <h3 className="font-semibold">{c.name}</h3>
                  <h3 className="text-sm text-gray-500">
                    จำนวนสินค้าทั้งหมด {c.amount} รายการ
                  </h3>
                </div>
                <div className="flex gap-2">
                  <DeleteCategoriesSiggestButton id={c.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-4">
        <h1 className="text-2xl font-bold text">สินค้าแนะนำ</h1>
        <h2 className="text-sm text-gray-500">
          เลือกสินค้าที่คุณอยากให้ลูกค้าเห็นก่อนเป็นพิเศษ
        </h2>
        <div className="flex items-end justify-end mb-3">
          <AddProductSuggestButton/>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {sData.shop.map((s: any, index: number) => (
            <div className="cursor-pointer" key={s.id}>
              <Card className="rounded-xl border bg-white">
                <CardContent className="flex flex-col items-start justify-center">
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 bg-gray-50">
                    <Image
                      src={s.image}
                      width={500}
                      height={500}
                      alt={`สินค้า ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-semibold ">{s.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ราคา: <span className="font-bold">{s.price}฿</span>
                  </p>
                  {s.remain > 0 ? (
                    <button className="btn-main mt-3 px-3 py-1 rounded-lg text-sm w-full">
                      ดูรายละเอียด
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn-main mt-3 px-3 py-1 rounded-lg text-sm w-full opacity-50"
                    >
                      สินค้าหมด
                    </button>
                  )}
                  <div className="flex items-center justify-between w-full mt-2">
                  <h3 className="text-sm text-gray-500 mt-1 items-center">
                    คงเหลือ {s.remain} ชิ้น
                  </h3>
                    <DeleteProductSuggest id={s.id}/>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
