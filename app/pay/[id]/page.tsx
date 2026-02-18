"use client";

import React, { useEffect, useState } from "react";
import CheckoutForm from "@/app/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: Promise<{ id: string }> }) => {
  // ✅ Unwrap params Promise
  const { id } = React.use(params);

  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(`/api/create-intent/${id}`, {
          method: "POST",
        });

        if (!res.ok) throw new Error("Failed to create intent");

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) makeRequest();
  }, [id]);

  console.log("CLIENT SECRET:", clientSecret);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <div>
      {!clientSecret && <p>Loading payment...</p>}

      {clientSecret && (

        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PayPage;