"use server";

import { getBankTopup } from "../database/banktopup";

export async function TopupBank(file: File) {
  try {
    const bank = await getBankTopup();
    const endpoint = "https://connect.slip2go.com/api/verify-slip/qr-code/info";

    const form = new FormData();
    form.append("file", file, file.name); // append file
    const payload = {
      checkDuplicate: true,
      checkReceiver: [
        {
          accountType: bank.bankProvider,
          accountNameTH: bank.bankName || undefined,
          accountNumber: bank.bankAccount || undefined,
        },
      ],
    };
    form.append("payload", JSON.stringify(payload));

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY_SLIP2GO}`,
        // อย่าตั้ง Content-Type
      },
      body: form,
    });

    const data = await response.json();
    // console.log(data);
    
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("ตรวจสอบสลิปไม่สำเร็จ");
  }
}
