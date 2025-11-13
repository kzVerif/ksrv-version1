"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

export default function DailySalesChart() {
  // แกน X = 7 วันล่าสุด
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Mock ยอดขายรายวัน
  const dailySales = [1200, 1800, 900, 1600, 2400, 3000, 2800];

  // Gradient สำหรับเส้นและพื้นหลัง
  const chartGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.05)");
    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "ยอดขาย (บาท)",
        data: dailySales,
        tension: 0.4,
        borderWidth: 3,
        borderColor: "#3b82f6", // สีเส้นหลัก
        backgroundColor: (ctx: any) => chartGradient(ctx.chart.ctx), // gradient fill
        fill: true, // เติมสีพื้นหลัง
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          font: { size: 14 },
          color: "#374151",
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "#1f2937",
        titleColor: "#f9fafb",
        bodyColor: "#f9fafb",
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: { size: 13 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
          borderDash: [4, 4],
        },
        ticks: {
          color: "#6b7280",
          font: { size: 13 },
          stepSize: 500,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full hover:shadow-xl transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text">ยอดขายรายวัน</h2>
      <Line data={data} options={options} />
    </div>
  );
}
