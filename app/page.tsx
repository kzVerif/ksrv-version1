import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getHomepage } from "@/lib/database/home";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notification01Icon,
  Package01Icon,
  PackageMoving01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import Notice from "@/components/Notice";
import { getAllEtcButton, getEtcButtonSetting } from "@/lib/database/etcButton";
import { getFake } from "@/lib/database/fake";
export default async function Home() {
  const data = await getHomepage();
  const etc = await getAllEtcButton();
  const etcButtonSetting = await getEtcButtonSetting();
  const fake = await getFake()

  return (
    <div className="header container">
      <Notice message={data.setting?.announcement ?? "ไม่พบข้อความประกาศ"} />
      {/* Banner Section */}
      <Image
        src={
          data?.setting?.banner ?? "https://placehold.co/1860x500?text=Banner"
        }
        width={1860}
        height={500}
        alt={`Banner`}
        className="w-full object-cover rounded-2xl"
        priority
      />

      {/* ประกาศ */}
      <div className="bg-white rounded-xl p-3 shadow border flex items-center gap-2">
        {/* หัวข้อประกาศ */}
        <span className="text-with-color flex items-center gap-2 px-3 py-2 rounded-lg font-medium">
          <HugeiconsIcon icon={Notification01Icon} /> ประกาศ
        </span>
        {/* เนื้อหาประกาศ */}
        <p className="leading-relaxed text-center">
          {data?.setting?.announcement}
        </p>
      </div>

      {/* ETC BUTTON */}
      {etcButtonSetting.isOpen ? (
        <div className="my-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {etc.map((b: any, index: number) => (
            <Link href={b.link} key={index} target="_blank">
              <div className="focus max-w-[800px] max-h-[400px]">
                <Image
                  src={b.image || "https://placehold.co/400x200?text=400x200"}
                  alt={"ปุ่ม ETC"}
                  width={400}
                  height={200}
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      ) : null}

      {/* สเตตัส */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* สมาชิกทั้งหมด */}
        <div className="flex items-center justify-start bg-white p-4 gap-x-4 rounded-2xl focus shadow">
          <div className="text-with-color p-3 rounded-2xl ">
            <HugeiconsIcon icon={UserGroupIcon} size={40} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-medium ">สมาชิกทั้งหมด</h1>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold ">{data.member + fake.members}</span>
              <span className="text-sm text-gray-500">คน</span>
            </div>
          </div>
        </div>

        {/* สินค้าทั้งหมด */}
        <div className="flex items-center justify-start bg-white p-4 gap-x-4 rounded-2xl focus shadow ">
          <div className="text-with-color p-3 rounded-2xl ">
            <HugeiconsIcon icon={Package01Icon} size={40} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-medium ">สินค้าทั้งหมด</h1>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold ">{data.allStock + fake.products}</span>
              <span className="text-sm text-gray-500">ชิ้น</span>
            </div>
          </div>
        </div>

        {/* สินค้าที่ขายไปแล้ว */}
        <div className="flex items-center justify-start bg-white p-4 gap-x-4 rounded-2xl focus shadow">
          <div className="text-with-color p-3 rounded-2xl ">
            <HugeiconsIcon icon={PackageMoving01Icon} size={40} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-medium ">สินค้าที่ขายไปแล้ว</h1>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold ">{data.soldStock + fake.sell}</span>
              <span className="text-sm text-gray-500">ชิ้น</span>
            </div>
          </div>
        </div>
      </div>

      {/* แนะนำ */}
      <div className="flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text">สินค้าที่แนะนำ</h1>
          <h2 className="text-sm text-gray-500">
            สินค้าและหมวดหมู่แนะนำสำหรับคุณ
          </h2>
        </div>
        {/* หมวดหมู่ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.categories.map((c: any, index) => (
            <div className="" key={c.id}>
              <Link href={`/categories/${c.categoriesId}`}>
                <Card className="focus rounded-xl border bg-white cursor-pointer">
                  <CardContent className="flex flex-col items-start justify-center">
                    <div className="w-full rounded-lg overflow-hidden mb-3 bg-gray-50">
                      <Image
                        src={c.category.image}
                        width={1980}
                        height={500}
                        alt={`สินค้า ${index + 1}`}
                        className="w-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text truncate">
                      {c.category.name}
                    </h3>
                    <h3 className="text-sm">
                      จำนวนสินค้าทั้งหมด {c.category.products.length} รายการ
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        {/* สินค้า */}
        {/* <Carousel className="w-full">
          <CarouselContent>
            {data.shop.map((s: any, index: number) => (
              <CarouselItem
                key={s.id}
                className="pl-2 md:basis-1/2 lg:basis-1/4 xl:basis-1/5 cursor-pointer"
              >
                <div className="p-2">
                  <Link href={`/shop/${s.product.id}`}>
                    <Card className="focus rounded-xl border bg-white">
                      <CardContent className="flex flex-col items-start justify-center">
                        <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 bg-gray-50">
                          <Image
                            src={s.product.image}
                            width={500}
                            height={500}
                            alt={`สินค้า ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-base font-semibold truncate w-full">
                          {s.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          <Badge className="font-bold">
                            ราคา: {Number(s.product.price)}฿
                          </Badge>
                        </p>
                        {s.product.stocks.length > 0 ? (
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
                        <h3 className="text-sm text-gray-500 mt-1 items-center">
                          คงเหลือ {s.product.stocks.length} ชิ้น
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex shadow-xl" />
          <CarouselNext className="hidden md:flex shadow-xl" />
        </Carousel> */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 ">
          {data.shop.map((s: any, index: number) => (
            <Link href={`/shop/${s.product.id}`} key={index}>
              <Card className="focus rounded-xl border bg-white">
                <CardContent className="flex flex-col items-start justify-center">
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 bg-gray-50">
                    <Image
                      src={s.product.image}
                      width={500}
                      height={500}
                      alt={`สินค้า ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-semibold truncate w-full">
                    {s.product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    <Badge className="font-bold">
                      ราคา: {Number(s.product.price)}฿
                    </Badge>
                  </p>
                  {s.product.stocks.length > 0 ? (
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
                  <h3 className="text-sm text-gray-500 mt-1 items-center">
                    คงเหลือ {s.product.stocks.length} ชิ้น
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
