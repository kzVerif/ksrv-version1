"use client";

import { useState } from "react";
import { UserIcon, LockIcon, Login02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    // ตรงนี้สามารถนำค่าไปยิง API ได้
    // await fetch(...)
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form className="space-y-4 mb-2" onSubmit={handleSubmit}>
        {/* Username */}
        <div className="space-y-1">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700"
          >
            ชื่อผู้ใช้
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <HugeiconsIcon
                icon={UserIcon}
                className="w-4 h-4 text-gray-400"
              />
            </div>

            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 text-gray-800 text-sm
                         placeholder:text-gray-400 "
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            รหัสผ่าน
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <HugeiconsIcon
                icon={LockIcon}
                className="w-4 h-4 text-gray-400"
              />
            </div>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 text-gray-800 text-sm
                         placeholder:text-gray-400 "
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full btn-main p-2 flex items-center justify-center gap-1"
        >
          <HugeiconsIcon icon={Login02Icon} />
          เข้าสู่ระบบ
        </button>
      </form>
      {/* Forgot */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <Link href={"/register"}>
          <Badge
            variant={"secondary"}
            className="text-xs text-gray-500 text-center hover:underline cursor-pointer p-1"
          >
            คลิ๊กที่นี่เพื่อไปหน้าสร้างบัญชี
          </Badge>
        </Link>
      </div>
    </div>
  );
}
