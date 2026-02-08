'use client'
import { useEffect, useState } from "react";
// @ts-expect-error no types for this lib
import Progress from "react-circle-progress-bar";

export default function InstallmentCircle() {
  const monthlyPayment = 426125;
  const totalMonths = 48;
  const totalAmount = monthlyPayment * totalMonths;

  const [paidMonths, setPaidMonths] = useState(0);

useEffect(() => {
  const now = new Date();
  const start = new Date(2025, 6); // июль 2025
  let monthsPassed = (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  // Если сегодня >= 20-го числа, считаем текущий месяц как оплаченный
  if (now.getDate() >= 20) {
    monthsPassed += 1;
  }

  if (monthsPassed < 0) monthsPassed = 0;
  if (monthsPassed > totalMonths) monthsPassed = totalMonths;

  setPaidMonths(monthsPassed);
}, []);


  const paidAmount = paidMonths * monthlyPayment;
  const progress = ((paidAmount / totalAmount) * 100).toFixed(1);
  const remainingAmount = totalAmount - paidAmount;

  // Генерация массива дат для 48 месяцев
  const startDate = new Date(2025, 6); // июль 2025
  const monthDates = Array.from({ length: totalMonths }, (_, i) => {
    const d = new Date(startDate.getFullYear(), startDate.getMonth() + i);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${year}`;
  });

  return (
    <div className="p-4 mx-auto max-w-xs text-center">
      <h2 className="text-xl font-bold mb-4">Оплачено: {paidMonths} из {totalMonths}</h2>
      <Progress
        progress={progress}
        strokeWidth={6}
        ballStrokeWidth={20}
        reduction={0.25}
        transitionDuration={0.8}
        background="#e0e0e0"
        gradient={[{ stop: 0.0, color: "#00bc9b" }, { stop: 1, color: "#5eaefd" }]}
        className="mx-auto"
        style={{ width: "300px", height: "300px" }}
      />
      <div className="mt-4 space-y-1 text-sm text-gray-700">
        <p>
          Всего:{" "}
          <span className="font-semibold">{totalAmount.toLocaleString()} ₸</span>
        </p>
        <p>
          Оплачено:{" "}
          <span className="font-semibold">{paidAmount.toLocaleString()} ₸</span>
        </p>
        <p>
          Осталось:{" "}
          <span className="font-semibold">{remainingAmount.toLocaleString()} ₸</span>
        </p>
        <p className="text-gray-600">Прогресс: {progress}%</p>
      </div>

      <div className="mt-6 grid grid-cols-6 gap-2">
        {monthDates.map((date, idx) => (
          <div
            key={idx}
            className={`p-1 text-[9px] rounded text-center border ${
              idx < paidMonths ? "bg-green-500 text-white border-green-600" : "bg-gray-200 text-gray-700 border-gray-300"
            }`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}
