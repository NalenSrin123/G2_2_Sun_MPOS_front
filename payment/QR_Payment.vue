<template>
  <div class="pay-wrap">
    <div class="pay-card">
      <!-- Header -->
      <div class="pay-header">
        <button class="header-btn" aria-label="Back">
          <i class="ti ti-arrow-left" aria-hidden="true"></i>
        </button>
        <span class="header-title">Scan to Pay</span>
        <button class="header-btn notification-btn" aria-label="Notifications">
           <i class="ti ti-bell bell-icon"></i>
           <span class="notification-dot"></span>
        </button>
      </div>

      <!-- Amount -->
      <div class="amount-section">
        <div class="amount-top">
          <span class="amount-label">Total Amount</span>
          <span class="table-badge">TABLE 14</span>
        </div>
        <div class="amount-value">$200.60</div>
        <div class="order-info">
          <i class="ti ti-receipt" aria-hidden="true"></i>
          Order #LX-8892 &bull; LuxeDine Signature
        </div>
      </div>

      <!-- QR Section -->
      <div class="qr-section">
        <div class="qr-timer">
          <i class="ti ti-clock" aria-hidden="true"></i>
          <span>{{ formattedTime }}</span>
        </div>
         <div class="qr-box">
          <img
            id="qrImage"
            src="/payment/photo_2026-06-13_18-04-00.jpg"
            alt="QR Code"
          >
        </div>
        <div class="qr-info">
          <div class="qr-title">Payment Code</div>
          <p class="qr-desc">Open your banking app and scan this QR code to complete payment</p>
          <div class="qr-actions">
           <button class="btn-outline" @click="saveQR">
               <i class="ti ti-download"></i>
                     Save QR
            </button>
            <button class="btn-outline">
              <i class="ti ti-share" aria-hidden="true"></i> Share
            </button>
          </div>
        </div>
      </div>

      <!-- CTA -->
     <button class="btn-primary" @click="showSuccess = true">
      I have paid
      <i class="ti ti-arrow-right"></i>
     </button>
     <div v-if="showSuccess" class="success-overlay">
  <div class="success-box">
    <div class="pray-icon">🙏</div>
    <div class="check-icon">✅</div>
    <h3>Thank You!</h3>
    <p>Your payment has been received.</p>

    <button class="close-btn" @click="showSuccess = false">
      OK
    </button>
  </div>
</div>
      <p class="pay-footer">
        If the payment doesn't reflect automatically,<br />
        please show this screen to your server.
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentTime = ref(new Date())
let timer = null

const formattedTime = computed(() => {
  return currentTime.value
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
    .replace(' ', '')
    .toLowerCase()
})

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})


function saveQR() {
  const link = document.createElement('a')
  link.href = '/payment/photo_2026-06-13_18-04-00.jpg'
  link.download = 'payment-qr.jpg'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
// -------> Payment popup
const showSuccess = ref(false)
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}
.pay-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f5f7;
  overflow: hidden;
}

.pay-card {
  width: 390px;      /* Phone width */
  height: 800px;     /* Phone height */
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 8px 25px rgba(0,0,0,.12);
  overflow: hidden;  /* Prevent internal scrolling */
}
/* Header */
.pay-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem 0.75rem;
  border-bottom: 1px solid #f0f0f0;
}

.header-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 20px;
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: background 0.15s;
}
.header-btn:hover { background: #f5f5f5; }

.header-title {
  font-size: 15px;
  font-weight: 600;
  color: #111;
}

/* Amount */
.amount-section {
  padding: 1.25rem 1.25rem 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.amount-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.amount-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #888;
  text-transform: uppercase;
}

.table-badge {
  background: #1a7a54;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.05em;
}

.amount-value {
  font-size: 40px;
  font-weight: 700;
  color: #1a7a54;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.order-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #888;
}
.order-info i { font-size: 14px; }

/* QR */
.qr-section {
  background: #fff;
  margin: 1rem;
  border-radius: 16px;
  border: 1px solid #ebebeb;
  overflow: hidden;
}

.qr-timer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 0.5rem 0.75rem 0.25rem;
  font-size: 12px;
  color: #e24b4a;
  font-weight: 600;
}
.qr-timer i { font-size: 14px; }

.qr-box {
  display: flex;
  justify-content: center;
  padding: 1rem 1.5rem;
}

.qr-box img {
  width: 230px;
  height: 230px;
  object-fit: contain;
}
.qr-info {
  padding: 0.75rem 1.25rem 1rem;
  text-align: center;
}

.qr-title {
  font-size: 15px;
  font-weight: 600;
  color: #111;
  margin-bottom: 4px;
}

.qr-desc {
  font-size: 12px;
  color: #888;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.qr-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-outline:hover { background: #f8f8f8; }

/* CTA */
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: calc(100% - 2rem);
  margin: 0 1rem 0.75rem;
  padding: 14px;
  background: #1a7a54;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover { background: #15664a; }

.pay-footer {
  text-align: center;
  padding: 0 1rem 1.25rem;
  font-size: 11px;
  color: #aaa;
  line-height: 1.5;
}

/* Responsive — tablet */
@media (min-width: 768px) {
  .pay-wrap { padding: 2.5rem 2rem; }
  .pay-card { max-width: 520px; }
  .amount-value { font-size: 46px; }
  .btn-primary { font-size: 16px; padding: 16px; }
}

/* Responsive — desktop */
@media (min-width: 1024px) {
  .pay-wrap { padding: 3rem; }
  .pay-card { max-width: 560px; }
}

.notification-btn {
  position: relative;
}

.bell-icon {
  font-size: 22px;
  animation: ring 2s infinite;
  transform-origin: top center;
}

/* Small red dot */
.notification-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background: #ff3b30;
  border-radius: 50%;
  border: 2px solid #fff;
}

/* Bell animation */
@keyframes ring {
  0%, 90%, 100% {
    transform: rotate(0deg);
  }
  92% {
    transform: rotate(15deg);
  }
  94% {
    transform: rotate(-15deg);
  }
  96% {
    transform: rotate(10deg);
  }
  98% {
    transform: rotate(-10deg);
  }
}

/* Message */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.success-box {
  width: 280px;
  background: white;
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,.15);
  animation: popUp .3s ease;
}

.pray-icon {
  font-size: 40px;
}

.check-icon {
  font-size: 50px;
  margin: 10px 0;
}

.success-box h3 {
  color: #1a7a54;
  margin-bottom: 8px;
}

.success-box p {
  color: #666;
  font-size: 14px;
}

.close-btn {
  margin-top: 18px;
  padding: 10px 24px;
  background: #1a7a54;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

@keyframes popUp {
  from {
    transform: scale(.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>