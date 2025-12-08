"use client";

export default function PaymentMethod() {
  return (
    <select className="border rounded-md px-2 py-1 text-sm">
      <option>Payment</option>
      <option>Cash</option>
      <option>UPI</option>
      <option>Card</option>
      <option>Net Banking</option>
    </select>
  );
}
