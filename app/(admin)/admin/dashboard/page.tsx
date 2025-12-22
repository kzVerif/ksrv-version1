import DailySalesChart from "@/components/Admin/DailySalesChart";
import Top5Chart from "@/components/Admin/Top5Chart";
import { getBestSellerProducts, getLast7DaysDailyRevenue, getSOLDForDashboard } from "@/lib/database/historybuy";
import { getTopupForDashboard } from "@/lib/database/historytopup";
import {
  AddMoneyCircleIcon,
  PackageDelivered01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

export default async function Page() {
  // Mockup data
  const topup = await getTopupForDashboard();
  const sold = await getSOLDForDashboard();

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

  const bestSeller= await getBestSellerProducts()
  const dailySales = await getLast7DaysDailyRevenue()
  

  return (
    <div className="header-admin container py-6">
      {/* Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-6">
        <Card
          icon={AddMoneyCircleIcon}
          title="ยอดเติมเงินวันนี้"
          value={Number(topup.today)}
          unit="บาท"
        />
        <Card
          icon={PackageDelivered01Icon}
          title="ยอดขายวันนี้"
          value={sold.today}
          unit="ชิ้น"
        />
        <Card
          icon={AddMoneyCircleIcon}
          title="ยอดเติมเงินเดือนนี้"
          value={Number(topup.monthly)}
          unit="บาท"
        />
        <Card
          icon={PackageDelivered01Icon}
          title="ยอดขายเดือนนี้"
          value={sold.monthly ?? 0}
          unit="ชิ้น"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Top5Chart bestSeller={bestSeller} />
        <DailySalesChart dailySales={dailySales} />
      </div>
    </div>
  );
}
