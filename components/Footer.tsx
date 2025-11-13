import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-2 bg-white mt-auto border-t">
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs text-gray-400 mt-1">
          ชื่อร้านค้าของคุณ |{" "}
          <Link href={"/"}>
            <span className="cursor-pointer transition-colors duration-300">
              แจ้งปัญหาติดต่อร้านค้าไม่ได้
            </span>
          </Link>
        </p>
        <p className="text-xs text-gray-500">
          © <span className="font-semibold">KSRV</span> — Kanghun Server and
          Service
        </p>
      </div>
    </footer>
  );
}
