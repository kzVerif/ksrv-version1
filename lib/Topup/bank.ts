"use server";

import { getBankTopup } from "../database/banktopup";
import axios from "axios";
import { FormData } from "undici"; // ✅ สำคัญมาก

export async function TopupBank(file: File) {
  try {
    const bank = await getBankTopup();

    const endpoint = "https://connect.slip2go.com/api/verify-slip/qr-image/info";

    // --- 1. Payload ---
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

    // --- 2. File -> Buffer ---
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // --- 3. FormData (ของ undici) ---
    const form = new FormData();

    form.append("payload", JSON.stringify(payload)); // ต้องเป็น string  
    form.append("file", new Blob([buffer], { type: file.type }), file.name);

    // --- 4. ส่ง Axios ---
    const response = await axios.post(endpoint, form, {
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY_SLIP2GO}`,
         ...(form as any).headers, 
      },
      maxBodyLength: Infinity,
    });

    console.log(response.data);
    
    return response.data;

  } catch (error: any) {
    if (error.response) {
      console.error("Slip2Go Error:", error.response.data);
      throw new Error(error.response.data.message || "Slip verification failed");
    }
    console.error("Network Error:", error.message);
    throw new Error("ไม่สามารถเชื่อมต่อกับระบบตรวจสอบสลิปได้");
  }
}
