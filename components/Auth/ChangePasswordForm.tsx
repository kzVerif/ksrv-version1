"use client";
import { Lock } from "lucide-react";
import React, { useState } from "react";

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return;
    }
    console.log("Old:", oldPassword, "New:", newPassword);
    alert("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form onSubmit={handleSubmit} className="max-w-md w-full">
        {/* รหัสผ่านเก่า */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Lock className="text-gray-400" size={20} />
          </div>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="รหัสผ่านเก่า"
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-gray-800 text-sm placeholder:text-gray-400"
          />
        </div>

        {/* รหัสผ่านใหม่ */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Lock className="text-gray-400" size={20} />
          </div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="รหัสผ่านใหม่"
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-gray-800 text-sm placeholder:text-gray-400"
          />
        </div>

        {/* ยืนยันรหัสผ่าน */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Lock className="text-gray-400" size={20} />
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="ยืนยันรหัสผ่านใหม่"
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-gray-800 text-sm placeholder:text-gray-400"
          />
        </div>


        <button
          type="submit"
          className="w-full btn-main text-white py-2 rounded-lg text-sm font-medium"
        >
          เปลี่ยนรหัสผ่าน
        </button>
      </form>
    </div>
  );
}
