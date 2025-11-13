import DailySalesChart from "@/components/Admin/DailySalesChart";
import Top5Chart from "@/components/Admin/Top5Chart";
import {
  AddMoneyCircleIcon,
  PackageDelivered01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";


export default async function Page() {
  // Mockup data
  const data = {
    member: 1240,
    stock: 320,
    sold: 158,
    topupToday: 5400,
    sellToday: 89,
    topupMonth: 48200,
    sellMonth: 1240,
  };

 const Card = ({
  icon,
  title,
  value,
  unit,
}: {
  icon: IconSvgElement;
  title: string;
  value: number | string;
  unit: string;
}) => (
  <div className="flex items-center bg-white p-5 gap-x-4 rounded-2xl focus shadow">
    <div className="text-with-color p-3 rounded-2xl bg-gray-50">
      <HugeiconsIcon icon={icon} size={42} />
    </div>
    <div className="flex flex-col">
      <h1 className="text-lg font-medium text-gray-700">{title}</h1>
      <div className="flex items-end gap-1 leading-none">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  </div>
);

  return (
    <div className="header-admin container py-6">
      {/* Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6">
        <Card
          icon={AddMoneyCircleIcon}
          title="ยอดเติมเงินวันนี้"
          value={data.topupToday}
          unit="บาท"
        />
        <Card
          icon={PackageDelivered01Icon}
          title="ยอดขายวันนี้"
          value={data.sellToday}
          unit="ชิ้น"
        />
        <Card
          icon={AddMoneyCircleIcon}
          title="ยอดเติมเงินเดือนนี้"
          value={data.topupMonth}
          unit="บาท"
        />
        <Card
          icon={PackageDelivered01Icon}
          title="ยอดขายเดือนนี้"
          value={data.sellMonth}
          unit="ชิ้น"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Top5Chart />
        <DailySalesChart/>
      </div>
    </div>
  );
}
