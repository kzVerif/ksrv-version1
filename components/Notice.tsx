"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";

export default function Notice( {message} : {message: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    const lastClosedAt = localStorage.getItem("noticeClosedAt");

    if (!lastClosedAt) {
      setIsOpen(true);
      return;
    }

    const lastTime = parseInt(lastClosedAt);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 1 วัน

    if (now - lastTime >= oneDay) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);

    if (dontShowToday) {
      localStorage.setItem("noticeClosedAt", Date.now().toString());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle>📢 ประกาศ!!</DialogTitle>
          <DialogDescription>
            ประกาศจากเว็บไซต์ กรุณาอ่านรายละเอียดด้านล่าง
          </DialogDescription>
        </DialogHeader>

        <div>
          {/* <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src={"/img/slip.png"}
              alt="image"
              width={380}
              height={380}
              className="rounded-xl"
            />
          </div> */}

          <p className="text-md font-semibold text-neutral-600">
            {message}
          </p>

          {/* Checkbox เลือกไม่ให้โชว์ 1 วัน */}
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="dontshow"
              checked={dontShowToday}
              onCheckedChange={(checked) => setDontShowToday(Boolean(checked))}
            />
            <label htmlFor="dontshow" className="text-sm text-neutral-700 cursor-pointer">
              ไม่ต้องแสดงประกาศนี้ภายใน 1 วัน
            </label>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={handleClose}
              className="px-6 rounded-full shadow hover:shadow-lg transition-all btn-main"
            >
              ปิดประกาศ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
