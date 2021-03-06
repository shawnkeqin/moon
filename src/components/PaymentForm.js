import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "antd";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { paymentActions } from "../app/store";
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PayButton = {
      marginLeft: '12px',
      width: 'calc(100% - 30px)',
      backgroundColor: '#f6a4eb',
      borderRadius: '4px',
      cursor: 'pointer',
      border: 'none',
  }
  
  


const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handlePayment = () => {
    dispatch(paymentActions.payment());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          handlePayment();
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <Button style={PayButton}>Pay</Button>
        </form>
      ) : (
        <div>
          <h2>
            Thank you for your payment, you are succesfully subscribed! ????
          </h2>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
