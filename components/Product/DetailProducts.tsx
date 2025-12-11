import React from "react";
import DOMPurify from "isomorphic-dompurify";

export default function DetailProducts({ detail }: { detail: any }) {
  // sanitize HTML ที่ส่งเข้ามา
  const safeHTML = DOMPurify.sanitize(detail ?? "ไม่มีรายละเอียดสินค้า", {
    USE_PROFILES: { html: true }, // อนุญาตเฉพาะแท็กมาตรฐาน
  });

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
}
