"use client";

import { Suspense, useEffect } from "react";
import { useCartStore } from "../utils/store";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const ConfettiExplosion = dynamic(
  () => import("react-confetti-explosion"),
  { ssr: false }
);

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!payment_intent) return;

    const makeRequest = async () => {
      try {
        await fetch(`/api/confirm/${payment_intent}`, {
          method: "PUT",
        });

        clearCart();

        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [payment_intent, router, clearCart]);

  return (
    <div className="relative min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
      <p className="max-w-xl">
        Payment successful. You are being redirected to the orders page.
        Please do not close the page.
      </p>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <ConfettiExplosion />
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
