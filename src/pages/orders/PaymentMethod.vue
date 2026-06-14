<template>
  <div class="payment-page">
    <header class="header">
      <button class="back-btn">←</button>
      <h1>Payment Method</h1>
      <button class="icon-btn"><i class="bi bi-bell"></i></button>
    </header>

    <div v-if="paymentSuccess" class="success-banner">Payment Successful</div>

    <section class="card summary-card">
      <div class="summary-top">
        <span class="label">ORDER SUMMARY</span>
        <span class="premium">LuxeDine Premium</span>
      </div>

      <h2>Total $200.60</h2>

      <div class="summary-info">
        <span>🧾 2 Items</span>
        <span>•</span>
        <span>Dinner Service</span>
      </div>
    </section>

    <div class="section-title">SAVED METHODS</div>

    <div
      class="payment-option"
      :class="{ selected: selectedMethod === 'visa' }"
      @click="selectedMethod = 'visa'"
    >
      <div class="left">
        <div class="icon"><i class="bi bi-credit-card text-success"></i></div>
        <div>
          <div class="title">Visa ending in 4242</div>
          <div class="subtitle">Expires 12/26</div>
        </div>
      </div>

      <div class="radio" :class="{ active: selectedMethod === 'visa' }"></div>
    </div>

    <div class="section-title">DIGITAL WALLETS</div>

    <div
      v-for="wallet in wallets"
      :key="wallet.name"
      class="payment-option"
      @click="selectedMethod = wallet.name"
    >
      <div class="left">
        <div class="icon">
          <i :class="wallet.icon"></i>
        </div>
        <div class="title">{{ wallet.name }}</div>
      </div>

      <div
        class="radio"
        :class="{ active: selectedMethod === wallet.name }"
      ></div>
    </div>

    <div class="section-title">OTHERS</div>

    <div
      class="payment-option"
      @click="selectedMethod = 'card'"
      :class="{ selected: selectedMethod === 'card' }"
    >
      <div class="left">
        <div class="icon"><i class="bi bi-bank"></i></div>
        <div class="title">Credit/Debit Card</div>
      </div>

      <span class="arrow">›</span>
    </div>

    <div class="payment-option" @click="selectedMethod = 'cash'">
      <div class="left">
        <div class="icon"><i class="bi bi-qr-code"></i></div>
        <div class="title">Cash</div>
      </div>

      <div class="radio" :class="{ active: selectedMethod === 'cash' }"></div>
    </div>

    <div class="banner">
      <div class="overlay">
        <h3>Dining Experience</h3>
        <p>Elevate your table.</p>
      </div>
    </div>
    <div class="bottom-card">
      <div class="amount-row">
        <div>
          <div class="small-label">Total Amount</div>
          <div class="amount">$200.60</div>
        </div>

        <div class="fee">Platform Fee Included</div>
      </div>

      <button class="pay-btn" @click="handlePayment">
        <i class="bi bi-bag-heart-fill"></i> Confirm & Pay
      </button>
    </div>
    <div v-if="paymentSuccess" class="success-modal">
      <div class="success-box">
        <div class="tick">✔</div>
        <div class="text">Payment Successful</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedMethod = ref("visa");
const paymentSuccess = ref(false);

const wallets = [
  { name: "ABA Pay", icon: "bi bi-bank" },
  { name: "KHQR", icon: "bi bi-qr-code" },
  { name: "Apple Pay", icon: "bi bi-apple" },
];

const handlePayment = () => {
  paymentSuccess.value = true;

  setTimeout(() => {
    paymentSuccess.value = false;
  }, 2500);
};
</script>

<style scoped>
.payment-page {
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
  background: #eef2ee;
  padding: 20px;
  font-family: Inter, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h1 {
  font-size: 24px;
  color: #0b6d4e;
  font-weight: 700;
}

.back-btn,
.icon-btn {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}

/* SUCCESS BANNER */
.success-banner {
  background: #0b7a55;
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 15px;
  font-weight: 600;
  text-align: center;
}

.card {
  background: #f3f5f2;
  border-radius: 18px;
  padding: 18px;
  margin-bottom: 24px;
}

.summary-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 13px;
  letter-spacing: 1px;
  color: #555;
}

.premium {
  background: #dff0e8;
  color: #0b6d4e;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.summary-card h2 {
  margin: 10px 0;
  font-size: 38px;
  color: #222;
}

.summary-info {
  display: flex;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

.section-title {
  color: #555;
  font-size: 13px;
  font-weight: 600;
  margin: 20px 4px 12px;
}

.payment-option {
  background: #fff;
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.payment-option.selected {
  outline: 2px solid #0b7a55;
}

.left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon {
  width: 48px;
  height: 48px;
  background: #f1f4f1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #222;
}

.subtitle {
  color: #777;
  margin-top: 4px;
}

.radio {
  width: 26px;
  height: 26px;
  border: 2px solid #bfc8c1;
  border-radius: 50%;
}

.radio.active {
  border-color: #0b7a55;
  position: relative;
}

.radio.active::after {
  content: "";
  position: absolute;
  inset: 4px;
  background: #0b7a55;
  border-radius: 50%;
}

.arrow {
  font-size: 26px;
  color: #777;
}

.banner {
  margin-top: 24px;
  border-radius: 18px;
  overflow: hidden;
  height: 130px;

  background-image: url("https://i.pinimg.com/1200x/73/5f/7b/735f7b01d0060075c49d166294071413.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  background: rgba(0, 0, 0, 0.25);
}

.overlay h3 {
  margin: 0;
  color: #39f0ca;
}

.overlay p {
  margin-top: 8px;
  font-size: 20px;
}

.bottom-card {
  background: #f6f8f5;
  margin-top: 18px;
  padding: 20px 0;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.small-label {
  color: #666;
  font-size: 14px;
}

.amount {
  color: #0b6d4e;
  font-size: 42px;
  font-weight: 700;
}

.fee {
  color: #666;
  font-weight: 600;
}

.pay-btn {
  width: 100%;
  margin-top: 18px;
  border: none;
  border-radius: 14px;
  padding: 18px;
  background: #0b7a55;
  color: white;
  font-size: 20px;
  cursor: pointer;
  font-weight: 600;
}

.pay-btn:hover {
  opacity: 0.95;
}
.success-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.success-box {
  background: white;
  padding: 28px 32px;
  border-radius: 18px;
  text-align: center;
  animation: pop 0.25s ease;
}

.tick {
  width: 70px;
  height: 70px;
  margin: 0 auto 10px;
  border-radius: 50%;
  background: #0b7a55;
  color: white;
  font-size: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  font-size: 18px;
  font-weight: 600;
  color: #0b6d4e;
}

@keyframes pop {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
