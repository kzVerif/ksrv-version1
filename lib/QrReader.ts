import jsQR from "jsqr";
import {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
} from "@zxing/library";

type Rect = { x: number; y: number; w: number; h: number };

export async function decodeSlipQRCode(file: File): Promise<string> {
  const imageURL = URL.createObjectURL(file);

  try {
    // 1) โหลดรูป
    const img = new Image();
    img.src = imageURL;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("โหลดรูปไม่สำเร็จ"));
    });

    // 2) วาดลง canvas โดย "ย่อ" ให้กว้างไม่เกิน 1400px (สำคัญมาก)
    const maxW = 1400;
    const scale = Math.min(1, maxW / img.width);
    const baseW = Math.round(img.width * scale);
    const baseH = Math.round(img.height * scale);

    const baseCanvas = document.createElement("canvas");
    baseCanvas.width = baseW;
    baseCanvas.height = baseH;

    const baseCtx = baseCanvas.getContext("2d");
    if (!baseCtx) throw new Error("สร้าง canvas ไม่ได้");
    baseCtx.drawImage(img, 0, 0, baseW, baseH);

    // 3) เตรียม “พื้นที่ที่น่าจะมี QR” (ทั้งภาพ + ครอปมุม/ช่วงล่าง)
    const regions: Rect[] = [
      // ทั้งภาพ
      { x: 0, y: 0, w: baseW, h: baseH },

      // ครึ่งล่าง
      {
        x: 0,
        y: Math.floor(baseH * 0.45),
        w: baseW,
        h: Math.floor(baseH * 0.55),
      },

      // มุมขวาล่าง
      {
        x: Math.floor(baseW * 0.5),
        y: Math.floor(baseH * 0.5),
        w: Math.floor(baseW * 0.5),
        h: Math.floor(baseH * 0.5),
      },

      // มุมซ้ายล่าง
      {
        x: 0,
        y: Math.floor(baseH * 0.5),
        w: Math.floor(baseW * 0.5),
        h: Math.floor(baseH * 0.5),
      },

      // มุมขวาบน
      {
        x: Math.floor(baseW * 0.5),
        y: 0,
        w: Math.floor(baseW * 0.5),
        h: Math.floor(baseH * 0.5),
      },

      // มุมซ้ายบน
      { x: 0, y: 0, w: Math.floor(baseW * 0.5), h: Math.floor(baseH * 0.5) },
    ];

    // 4) ตั้งค่า ZXing
    const reader = new MultiFormatReader();
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);
    hints.set(DecodeHintType.TRY_HARDER, true);
    hints.set(DecodeHintType.CHARACTER_SET, "utf-8");
    reader.setHints(hints);

    // helper: ทำภาพเป็นขาวดำ (binarize แบบง่าย) + เพิ่ม contrast นิดหน่อย
    const binarize = (data: Uint8ClampedArray) => {
      // threshold แบบคร่าวๆ: 150 (ปรับได้)
      const t = 150;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i],
          g = data[i + 1],
          b = data[i + 2];
        // grayscale
        let gray = r * 0.299 + g * 0.587 + b * 0.114;
        // เพิ่ม contrast เบาๆ
        gray = Math.min(255, Math.max(0, (gray - 128) * 1.2 + 128));
        const v = gray < t ? 0 : 255;
        data[i] = data[i + 1] = data[i + 2] = v;
        data[i + 3] = 255;
      }
    };

    // helper decode: ลอง jsQR ก่อนแล้วค่อย ZXing
    const tryDecode = (imageData: ImageData): string | null => {
      // jsQR
      const qr1 = jsQR(imageData.data, imageData.width, imageData.height);
      if (qr1?.data) return qr1.data;

      // ZXing
      try {
        const luminance = new RGBLuminanceSource(
          imageData.data,
          imageData.width,
          imageData.height,
        );
        const bitmap = new BinaryBitmap(new HybridBinarizer(luminance));
        const res = reader.decode(bitmap);
        const text = res?.getText?.();
        if (text) return text;
      } catch {
        reader.reset?.();
      }
      return null;
    };

    // 5) ไล่ลอง decode ทีละ region + แบบ “ต้นฉบับ” และ “ขาวดำ”
    for (const r of regions) {
      const c = document.createElement("canvas");
      c.width = r.w;
      c.height = r.h;
      const ctx = c.getContext("2d");
      if (!ctx) continue;

      ctx.drawImage(baseCanvas, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);

      // A) ลองแบบสีปกติ
      let data = ctx.getImageData(0, 0, r.w, r.h);
      let out = tryDecode(data);
      if (out) return out;

      // B) ลองแบบขาวดำ (ช่วยมากกับสลิปที่เบลอ/บีบอัด)
      data = ctx.getImageData(0, 0, r.w, r.h);
      binarize(data.data);
      ctx.putImageData(data, 0, 0);

      const bw = ctx.getImageData(0, 0, r.w, r.h);
      out = tryDecode(bw);
      if (out) return out;
    }

    throw new Error("ไม่พบ QR");
  } finally {
    URL.revokeObjectURL(imageURL);
  }
}
