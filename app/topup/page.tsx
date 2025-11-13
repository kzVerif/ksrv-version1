import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const data = {
    twEnable: true,
    bkEnable: true,
    feeEnable: true,
  };

  return (
    <div className="container header">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">เติมเงินเข้าสู่ระบบ</h1>
        <h2 className="text-sm text-gray-500">
          เลือกช่องทางการเติมเงินที่ต้องการได้เลย
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* TrueMoney Section */}
        <Link href={data.twEnable ? "/topup/wallet" : "#"}>
          <div className="relative focus cursor-pointer flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            {/* Badge มุมขวาบน */}
            <Badge
              variant={data.twEnable ? "secondary" : "destructive"}
              className={`absolute top-2 right-2 ${
                data.twEnable
                  ? "bg-emerald-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {data.twEnable ? "ใช้งานได้" : "ปิดใช้งาน"}
            </Badge>

            <Image
              src="/img/True-money.jpg"
              alt="เติมเงินผ่านทรูวอลเลท"
              width={150}
              height={150}
              className="mb-4"
            />
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
              เติมเงินผ่านTrueMoney wallet
            </h1>
            {data.feeEnable ? (
              <Badge variant="secondary" className="bg-emerald-500 text-white">
                ไม่มีการหักค่าธรรมเนียม
              </Badge>
            ) : (
              <Badge variant="destructive">
                ยอดที่ได้รับจะหักค่าธรรมเนียม 2.9% สูงสุด 20 บาท
              </Badge>
            )}
          </div>
        </Link>

        {/* Bank Section */}
        <Link href={data.bkEnable ? "/topup/bank" : "#"}>
          <div className="relative focus cursor-pointer flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            {/* Badge มุมขวาบน */}
            <Badge
              variant={data.bkEnable ? "secondary" : "destructive"}
              className={`absolute top-2 right-2 ${
                data.bkEnable
                  ? "bg-emerald-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {data.bkEnable ? "ใช้งานได้" : "ปิดใช้งาน"}
            </Badge>

            <Image
              src="/img/slip2.webp"
              alt="เติมเงินผ่านธนาคาร"
              width={150}
              height={150}
              className="mb-4"
            />
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
              เติมเงินผ่านธนาคาร
            </h1>
            <Badge variant="secondary" className="bg-emerald-500 text-white">
              ไม่มีการหักค่าธรรมเนียม
            </Badge>
          </div>
        </Link>
      </div>
    </div>
  );
}
