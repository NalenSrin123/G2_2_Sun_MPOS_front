<template>
  <div class="payment-page">
    <header class="header">
      <button class="back-btn" @click="$router.push('/shopping-cart')">←</button>
      <h1>Payment Method</h1>
      <button class="icon-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
        </svg>
      </button>
    </header>

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

    <div class="payment-option" :class="{ selected: selectedMethod === 'visa' }" @click="selectedMethod = 'visa'">
      <div class="left">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
        </div>
        <div>
          <div class="title">Visa ending in 4242</div>
          <div class="subtitle">Expires 12/26</div>
        </div>
      </div>
      <div class="radio" :class="{ active: selectedMethod === 'visa' }"></div>
    </div>

    <div class="section-title">DIGITAL WALLETS</div>

    <div v-for="wallet in wallets" :key="wallet.name" class="payment-option" @click="selectedMethod = wallet.name">
      <div class="left">
        <div class="icon" v-html="wallet.svg"></div>
        <div class="title">{{ wallet.name }}</div>
      </div>
      <div class="radio" :class="{ active: selectedMethod === wallet.name }"></div>
    </div>

    <div class="section-title">OTHERS</div>

    <div class="payment-option" @click="selectedMethod = 'card'" :class="{ selected: selectedMethod === 'card' }">
      <div class="left">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
          </svg>
        </div>
        <div class="title">Credit/Debit Card</div>
      </div>
      <span class="arrow">›</span>
    </div>

    <div class="payment-option" @click="selectedMethod = 'cash'">
      <div class="left">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
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
        🔒 Confirm &amp; Pay
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedMethod = ref('visa')

const wallets = [
  {
    name: 'ABA Pay',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>`
  },
  {
    name: 'KHQR',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>`
  },
  {
    name: 'Apple Pay',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`
  },
]

function handlePayment() {
  router.push('/confirm-payment')
}
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
.header h1 { font-size: 22px; color: #0b6d4e; font-weight: 700; }
.back-btn, .icon-btn { border: none; background: transparent; font-size: 20px; cursor: pointer; color: #555; display: flex; align-items: center; }
.back-btn:hover, .icon-btn:hover { color: #0b6d4e; }
.card { background: #f3f5f2; border-radius: 18px; padding: 18px; margin-bottom: 24px; }
.summary-top { display: flex; justify-content: space-between; align-items: center; }
.label { font-size: 11px; letter-spacing: 1px; color: #555; text-transform: uppercase; }
.premium { background: #dff0e8; color: #0b6d4e; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.summary-card h2 { margin: 10px 0; font-size: 34px; color: #222; font-weight: 700; }
.summary-info { display: flex; gap: 8px; color: #666; font-size: 13px; }
.section-title { color: #555; font-size: 11px; font-weight: 700; margin: 18px 4px 10px; letter-spacing: 0.08em; text-transform: uppercase; }
.payment-option { background: #fff; border-radius: 16px; padding: 16px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: box-shadow 0.15s; }
.payment-option:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.payment-option.selected { outline: 2px solid #0b7a55; }
.left { display: flex; align-items: center; gap: 14px; }
.icon { width: 46px; height: 46px; background: #f1f4f1; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.title { font-size: 16px; font-weight: 600; color: #222; }
.subtitle { color: #777; margin-top: 3px; font-size: 13px; }
.radio { width: 24px; height: 24px; border: 2px solid #bfc8c1; border-radius: 50%; position: relative; flex-shrink: 0; }
.radio.active { border-color: #0b7a55; }
.radio.active::after { content: ""; position: absolute; inset: 4px; background: #0b7a55; border-radius: 50%; }
.arrow { font-size: 26px; color: #aaa; }
.banner { margin-top: 22px; border-radius: 18px; overflow: hidden; height: 120px; background-image: url("https://i.pinimg.com/1200x/73/5f/7b/735f7b01d0060075c49d166294071413.jpg"); background-size: cover; background-position: center; position: relative; }
.overlay { height: 100%; padding: 22px; display: flex; flex-direction: column; justify-content: center; color: white; background: rgba(0,0,0,0.25); }
.overlay h3 { margin: 0; color: #39f0ca; font-size: 16px; }
.overlay p { margin-top: 6px; font-size: 18px; }
.bottom-card { background: #f6f8f5; margin-top: 18px; padding: 18px 0; }
.amount-row { display: flex; justify-content: space-between; align-items: center; }
.small-label { color: #666; font-size: 13px; }
.amount { color: #0b6d4e; font-size: 38px; font-weight: 700; }
.fee { color: #666; font-weight: 600; font-size: 13px; }
.pay-btn { width: 100%; margin-top: 16px; border: none; border-radius: 14px; padding: 16px; background: #0b7a55; color: white; font-size: 18px; cursor: pointer; font-weight: 600; transition: opacity 0.15s; }
.pay-btn:hover { opacity: 0.92; }
</style>