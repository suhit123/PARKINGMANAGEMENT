import React, { useState } from 'react';
import { Button } from 'react-native';
import { TouchableOpacity ,Text} from 'react-native-gesture-handler';
import RazorpayCheckout from 'react-native-razorpay';

const PaymentButton = () => {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('100');

  const createOrder = async () => {
    // Create an order on your server and get the order ID
    const orderId = await fetch('http://192.168.146.239:8080/createorder', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    }).then(response => response.json()).then(data => data.orderId);
    console.log(orderId)
    setOrderId(orderId);
  };

  const handlePayment = async () => {
    // Call the RazorpayCheckout.open method with the order ID and other payment options
    const success = await RazorpayCheckout.open({
      key: process.env.rzp_test_P4936ySdvNy851,
      order_id: orderId,
      amount,
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '+15555555555',
      },
    });

    if (success) {
      // Payment successful
      alert('Payment successful!');
    } else {
      // Payment failed
      alert('Payment failed!');
    }
  };

  return (
    <>
    <TouchableOpacity onPress={createOrder}>
      <Text>Press Me</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePayment}>
      <Text>Press Me</Text>
    </TouchableOpacity>
    </>
  );
};
export default PaymentButton;