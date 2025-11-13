import BankSettingForm from "@/components/Admin/Topup/BankSettingForm";
import WalletSettingForm from "@/components/Admin/Topup/WalletSettingForm";

export default function page() {
  return (
    <div className="header-admin">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text">ตั้งค่าการเติมเงิน</h1>
        <h2 className="text-sm text-gray-500">
          จัดการวิธีการเติมเงินของร้านค้า
        </h2>
      </div>
        <WalletSettingForm data={{ phone: "0957148911", status: false, fee: false }} />
        <BankSettingForm
          data={{
            status: false,
            bankCode: "01002",
            accountNumber: "6587161719",
            accountName: "กังหัน แสงอรุณ",
          }}
        />
    </div>
  );
}
