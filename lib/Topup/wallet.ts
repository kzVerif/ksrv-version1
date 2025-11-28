"use server";

import prisma from "../database/conn";

export async function walletTopup(url: string) {
  try {
    const truemoney = await prisma.topupTruemoney.findFirst();

    const phone = truemoney?.phone;

    const voucher = url.split("=")[1];

    if (!voucher || !/^[a-z0-9]*$/i.test(voucher)) {
      return { status: false, reason: "Voucher ไม่ถูกต้อง" };
    }

    const data = JSON.stringify({
      mobile: phone,
      voucher_hash: voucher,
    });

    const endpoint = `https://gift.truemoney.com/campaign/vouchers/${voucher}/redeem`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.50.0",
        Accept: "application/json, text/plain, */*",
        Referer: "https://gift.truemoney.com/",
        Origin: "https://gift.truemoney.com",
      },
      body: data,
    });
    const res = await response.json();

    // console.log(res.data?.voucher?.member);

    // SUCCESS CHECK
    if (res.status?.code === "SUCCESS" && res.data?.voucher?.member === 1) {
      const amount = Number(res.data.voucher.redeemed_amount_baht);

      if (truemoney?.feeAvailable === true) {
        if (amount * 0.029 < 20) {
          const finalAmount = Math.floor(amount - amount * 0.029);

          return {
            status: true,
            amount: finalAmount,
          };
        } else {
          const finalAmount = Math.floor(amount - 20);

          return {
            status: true,
            amount: finalAmount,
          };
        }
      }

      return {
        status: true,
        amount: amount,
      };
    } else {
      return {
        status: false,
        reason:
          res.data?.voucher?.member !== 1
            ? "กรุณาทำซองแบบรับคนเดียว"
            : res.status?.message,
      };
    }
  } catch (error) {
    return {
      status: false,
      reason: "ไม่สามารตติดต่อกับ server ได้",
    };
  }
}
