"use client";

import React, { useState } from "react";
import { Image as ImageIcon, CreditCard, QrCode } from "lucide-react";
import toast from "react-hot-toast";
import { TopupByBank } from "@/lib/database/users";
import { useSession } from "next-auth/react";
import { useUser } from "@/contexts/UserContext";
import jsQR from "jsqr";
import {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
} from "@zxing/library";
import { decodeSlipQRCode } from "@/lib/QrReader";

export default function BankTopup({ bank }: { bank: any }) {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const { refreshUser } = useUser();

  const bankProviderMap: Record<string, string> = {
    "01002": "ธนาคารกรุงเทพ (Bangkok Bank)",
    "01004": "ธนาคารกสิกรไทย (Kasikorn Bank)",
    "01006": "ธนาคารกรุงไทย (Krung Thai Bank)",
    "01011": "ธนาคารทหารไทยธนชาต (TMB Thanachart Bank)",
    "01014": "ธนาคารไทยพาณิชย์ (SCB)",
    "01025": "ธนาคารกรุงศรีอยุธยา (Krungsri Bank)",
    "01069": "ธนาคารเกียรตินาคินภัทร (Kiatnakin Bank)",
    "01022": "ธนาคารซีไอเอ็มบีไทย (CIMB Thai Bank)",
    "01067": "ธนาคารทิสโก้ (TISCO Bank)",
    "01024": "ธนาคารยูโอบี (UOB)",
    "01071": "ธนาคารไทยเครดิต (Thai Credit Bank)",
    "01073": "ธนาคารแลนด์ แอนด์ เฮ้าส์ (LH Bank)",
    "01070": "ธนาคารไอซีบีซี (ไทย) (ICBC Thai)",
    "01098": "SME Bank",
    "01034": "BAAC",
    "01035": "EXIM Bank",
    "01030": "ออมสิน (GSB)",
    "01033": "อาคารสงเคราะห์ (GHB)",
    "01066": "Islamic Bank",
    "02001": "PromptPay เบอร์โทรศัพท์",
    "02003": "PromptPay บัตรประชาชน/ภาษี",
    "02004": "PromptPay E-Wallet",
    "03000": "K+ Shop / แม่มณี / Be Merchant / TTB Smart Shop",
    "04000": "True Money Wallet",
  };

  // แก้ไข logic การเช็ค Array ให้ถูกต้อง
  const isPromptPay = ["02001", "02003", "02004"].includes(bank.bankProvider);
  const pp = "PromptPay พร้อมเพย์"

  const getBankName = (code?: string) =>
    code ? bankProviderMap[code] || code : "-";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.size > 1 * 1024 * 1024) {
      toast.error("ไฟล์มีขนาดใหญ่เกิน 1MB กรุณาอัปโหลดไฟล์ที่เล็กกว่านี้");
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) return toast.error("กรุณาเข้าสู่ระบบก่อนทำรายการ");
    if (!file) return toast.error("กรุณาแนบสลิป");

    const loading = toast.loading("กำลังตรวจสอบสลิป...");

    try {
      const qrData = await decodeSlipQRCode(file); // ✅ ตัวใหม่

      const status = await TopupByBank(session.user.id, qrData);

      if (status?.status) {
        toast.success(status.message);
        await refreshUser();
        setFile(null);
      } else {
        toast.error(status?.message || "สลิปไม่ถูกต้อง");
      }
    } catch (err) {
      console.error(err);
      toast.error("ยังไม่พบ QR ในสลิป (ลองใช้รูปชัดขึ้น/ไม่ครอป/ไม่เบลอ)");
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ส่วนที่ 1: ข้อมูลการชำระเงิน */}
        <div className="space-y-6">
          {isPromptPay ? (
            /* Layout เมื่อเป็น PromptPay (มี QR Code) */
            <div className="grid grid-cols-1 lg:grid-cols-2 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-4 flex flex-col items-center justify-center">
                {/* ส่วนหัว: จัดให้อยู่ตรงกลางด้วย flex-center */}
                <div className="flex items-center justify-center gap-2 mb-6 text">
                  <QrCode size={22} />
                  <p className="text-sm font-bold uppercase tracking-widest">
                    สแกนชำระเงินผ่าน PromptPay
                  </p>
                </div>

                {/* ส่วนรูปภาพ QR: ใส่ Wrapper เพื่อคุมขนาดและเงาให้ดูเด่น */}
                <div className="relative p-2 bg-white border-2 border-dashed border-gray-100 rounded-xl">
                  <img
                    src={`https://promptpay.io/${bank.bankAccount}`}
                    alt="PromptPay QR"
                    className="w-52 h-52 object-contain"
                  />
                </div>

                {/* ข้อมูลเพิ่มเติมด้านล่าง (ถ้ามี) */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400">
                    เลขพร้อมเพย์:{" "}
                    <span className="font-semibold text-gray-700">
                      {bank.bankAccount}
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-5">
                <div className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200">
                  <CreditCard size={20} />
                  <p className="text-sm font-bold uppercase tracking-wider">
                    รายละเอียดการโอนเงิน
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">ธนาคาร</p>
                  <p className="font-bold text-gray-800 text-lg">
                    {pp}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">เลขบัญชี</p>
                  <p className="font-mono font-bold text-2xl text tracking-wider">
                    {bank.bankAccount || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">ชื่อบัญชี</p>
                  <p className="font-bold text-gray-800">
                    {bank.bankName || "-"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Layout เมื่อไม่ใช่ PromptPay (แสดงเฉพาะเลขบัญชี) */
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-5">
              <div className="flex items-center gap-2 text-gray-700 pb-2 border-b border-gray-200">
                <CreditCard size={20} />
                <p className="text-sm font-bold uppercase tracking-wider">
                  รายละเอียดการโอนเงิน
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">ธนาคาร</p>
                  <p className="font-bold text-gray-800 text-lg">
                    {getBankName(bank.bankProvider)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">เลขบัญชี</p>
                  <p className="font-mono font-bold text-2xl text tracking-wider">
                    {bank.bankAccount || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">ชื่อบัญชี</p>
                  <p className="font-bold text-gray-800">
                    {bank.bankName || "-"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* แจ้งเตือนเล็กๆ ด้านล่างข้อมูลธนาคาร */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>ข้อควรระวัง:</strong>{" "}
              กรุณาตรวจสอบชื่อผู้รับและยอดเงินให้ถูกต้องก่อนกดยืนยันการโอนทุกครั้ง
            </p>
          </div>
        </div>

        {/* ส่วนที่ 2: ฟอร์มการอัปโหลดสลิป (คงเดิม) */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-gray-800 rounded-full"></span>
            อัปโหลดหลักฐานการโอน
          </h3>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
            <div
              className={`relative flex-1 min-h-[250px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all duration-300 ${
                file
                  ? "border-green-400 bg-green-50/30"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
              }`}
            >
              <label
                htmlFor="file-upload"
                className="absolute inset-0 cursor-pointer z-10"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {!file ? (
                <div className="text-center p-5">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon size={32} />
                  </div>
                  <p className="font-semibold text-gray-700">เลือกรูปภาพสลิป</p>
                  <p className="text-xs text-gray-400 mt-1">
                    คลิกที่นี่เพื่ออัปโหลด
                  </p>
                </div>
              ) : (
                <div className="relative p-4 w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="max-h-[180px] rounded-lg shadow-sm"
                  />
                  <p className="mt-2 text-xs font-medium text-green-600">
                    อัปโหลดภาพสำเร็จ
                  </p>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="mt-2 text-xs text-red-500 underline z-20"
                  >
                    เปลี่ยนรูปภาพ
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!file}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform active:scale-[0.98] transition-all ${
                file
                  ? "btn-main"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              ยืนยันการตรวจสอบสลิป
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
