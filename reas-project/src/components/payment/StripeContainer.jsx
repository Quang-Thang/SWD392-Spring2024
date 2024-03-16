import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import axios from "axios";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51OuHbr05cUw9340oeaFWPnhcCSvi28O2209HDpCwN3RdUX5d6eaw5Ab8q2dJn03oRaej5teF8YuhyCqhM8Nm0ooX00GFzPcCVn";

const stripePromise = loadStripe(PUBLIC_KEY);
const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
