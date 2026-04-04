"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { updateShopSetting } from "@/lib/database/setting";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);

  const handleChange = (key: string, value: string) => {
    setData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    // console.log(data);
    
    toast.promise(updateShopSetting(data), {
      success: "บันทึกการตั้งค่าสำเร็จ",
      loading: "กำลังบันทึกการตั้งค่า...",
      error: "เกิดข้อผิดพลาดในการบันทึก"
    });
  };

  return (
    <div className="space-y-6">
      {/* 🎨 สีร้าน */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">สีประจำร้าน</h2>
          <p className="text-sm text-muted-foreground">
            เลือกสีหลัก สีรอง และสีตอน hover ของปุ่ม
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Primary</label>
            <Input
              type="color"
              value={data.primaryColor}
              onChange={(e) => handleChange("primaryColor", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Secondary</label>
            <Input
              type="color"
              value={data.secondaryColor}
              onChange={(e) => handleChange("secondaryColor", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Button Hover</label>
            <Input
              type="color"
              value={data.hoverColor}
              onChange={(e) => handleChange("hoverColor", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">



      {/* 🌄 พื้นหลัง */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">พื้นหลังร้าน</h2>
          <p className="text-sm text-muted-foreground">
            แนบลิงก์รูปภาพพื้นหลัง (รองรับ .jpg .png)
          </p>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="https://example.com/background.jpg"
            value={data.backgroundImage}
            onChange={(e) => handleChange("backgroundImage", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 🔗 Webhook */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Webhook Discord</h2>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="https://discord.com/api/webhooks/..."
            value={data.webhookDiscord}
            onChange={(e) => handleChange("webhookDiscord", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 🏪 ชื่อร้าน */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">ชื่อร้าน</h2>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="ชื่อร้านของคุณ"
            value={data.shopName}
            onChange={(e) => handleChange("shopName", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 📢 ประกาศ */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">ประกาศหน้าร้าน</h2>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="ข้อความประกาศ เช่น โปรโมชั่นลด 20%"
            value={data.announcement}
            onChange={(e) => handleChange("announcement", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 🖼 Icon ร้าน */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">ลิงก์ Icon ร้าน</h2>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="https://example.com/icon.png"
            value={data.icon}
            onChange={(e) => handleChange("icon", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 🧩 Logo ร้าน */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">ลิงก์แบนเนอร์ตอนแชร์</h2>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="https://example.com/logo.png"
            value={data.logo}
            onChange={(e) => handleChange("logo", e.target.value)}
          />
        </CardContent>
      </Card>
      {/* 🧩 Banner ร้าน */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">ลิงก์ Banner ร้าน</h2>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="https://example.com/logo.png"
            value={data.banner}
            onChange={(e) => handleChange("banner", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 📝 คำอธิบายร้าน */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">คำอธิบายร้าน</h2>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="เกี่ยวกับร้านของคุณ เช่น สินค้า บริการ หรือสโลแกน"
            value={data.detail}
            onChange={(e) => handleChange("detail", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 📝 คำอธิบายร้าน */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">ลิงก์ติดต่อร้าน</h2>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="ช่องทางการติดต่อร้านค้า"
            value={data.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
          />
        </CardContent>
      </Card>
            </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end gap-2 mb-4">
        <Button onClick={handleSave} className="btn-main">
          บันทึกการตั้งค่า
        </Button>
      </div>
    </div>
  );
}
