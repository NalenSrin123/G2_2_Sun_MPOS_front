<template>
  <div class="pay-wrap">
    <div class="pay-card">
      <!-- Header -->
      <div class="pay-header">
        <button class="header-btn" aria-label="Back" @click="$router.push('/payment')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
          </svg>
        </button>
        <span class="header-title">Scan to Pay</span>
        <button class="header-btn notification-btn" aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
          <span class="notification-dot"></span>
        </button>
      </div>

      <!-- Amount -->
      <div class="amount-section">
        <div class="amount-top">
          <span class="amount-label">TOTAL AMOUNT</span>
          <span class="table-badge">TABLE 14</span>
        </div>
        <div class="amount-value">$200.60</div>
        <div class="order-info">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Order #LX-8892 &bull; LuxeDine Signature
        </div>
      </div>

      <!-- QR Section -->
      <div class="qr-section">
        <div class="qr-timer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>{{ formattedTime }}</span>
        </div>
        <div class="qr-box">
          <!-- QR code placeholder using SVG pattern since image path is local -->
          <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="qr-svg">
            <rect width="200" height="200" fill="white"/>
            <!-- Top-left finder -->
            <rect x="10" y="10" width="50" height="50" rx="4" fill="#1a7a54"/>
            <rect x="18" y="18" width="34" height="34" rx="2" fill="white"/>
            <rect x="24" y="24" width="22" height="22" rx="1" fill="#1a7a54"/>
            <!-- Top-right finder -->
            <rect x="140" y="10" width="50" height="50" rx="4" fill="#1a7a54"/>
            <rect x="148" y="18" width="34" height="34" rx="2" fill="white"/>
            <rect x="154" y="24" width="22" height="22" rx="1" fill="#1a7a54"/>
            <!-- Bottom-left finder -->
            <rect x="10" y="140" width="50" height="50" rx="4" fill="#1a7a54"/>
            <rect x="18" y="148" width="34" height="34" rx="2" fill="white"/>
            <rect x="24" y="154" width="22" height="22" rx="1" fill="#1a7a54"/>
            <!-- Data modules (random-looking pattern) -->
            <g fill="#1a7a54">
              <rect x="70" y="10" width="8" height="8"/><rect x="82" y="10" width="8" height="8"/><rect x="94" y="10" width="8" height="8"/><rect x="118" y="10" width="8" height="8"/>
              <rect x="70" y="22" width="8" height="8"/><rect x="106" y="22" width="8" height="8"/><rect x="118" y="22" width="8" height="8"/>
              <rect x="82" y="34" width="8" height="8"/><rect x="94" y="34" width="8" height="8"/><rect x="106" y="34" width="8" height="8"/>
              <rect x="70" y="46" width="8" height="8"/><rect x="118" y="46" width="8" height="8"/>
              <rect x="82" y="58" width="8" height="8"/><rect x="94" y="58" width="8" height="8"/><rect x="106" y="58" width="8" height="8"/>
              <rect x="70" y="70" width="8" height="8"/><rect x="94" y="70" width="8" height="8"/><rect x="118" y="70" width="8" height="8"/>
              <rect x="10" y="70" width="8" height="8"/><rect x="22" y="70" width="8" height="8"/><rect x="46" y="70" width="8" height="8"/>
              <rect x="10" y="82" width="8" height="8"/><rect x="34" y="82" width="8" height="8"/><rect x="70" y="82" width="8" height="8"/><rect x="82" y="82" width="8" height="8"/><rect x="106" y="82" width="8" height="8"/>
              <rect x="10" y="94" width="8" height="8"/><rect x="22" y="94" width="8" height="8"/><rect x="58" y="94" width="8" height="8"/><rect x="94" y="94" width="8" height="8"/><rect x="118" y="94" width="8" height="8"/><rect x="142" y="94" width="8" height="8"/><rect x="166" y="94" width="8" height="8"/>
              <rect x="10" y="106" width="8" height="8"/><rect x="46" y="106" width="8" height="8"/><rect x="70" y="106" width="8" height="8"/><rect x="106" y="106" width="8" height="8"/><rect x="130" y="106" width="8" height="8"/><rect x="154" y="106" width="8" height="8"/>
              <rect x="22" y="118" width="8" height="8"/><rect x="46" y="118" width="8" height="8"/><rect x="82" y="118" width="8" height="8"/><rect x="118" y="118" width="8" height="8"/><rect x="142" y="118" width="8" height="8"/><rect x="178" y="118" width="8" height="8"/>
              <rect x="70" y="130" width="8" height="8"/><rect x="94" y="130" width="8" height="8"/><rect x="130" y="130" width="8" height="8"/><rect x="166" y="130" width="8" height="8"/>
              <rect x="70" y="142" width="8" height="8"/><rect x="82" y="142" width="8" height="8"/><rect x="118" y="142" width="8" height="8"/><rect x="142" y="142" width="8" height="8"/><rect x="178" y="142" width="8" height="8"/>
              <rect x="70" y="154" width="8" height="8"/><rect x="106" y="154" width="8" height="8"/><rect x="130" y="154" width="8" height="8"/><rect x="154" y="154" width="8" height="8"/>
              <rect x="70" y="166" width="8" height="8"/><rect x="94" y="166" width="8" height="8"/><rect x="118" y="166" width="8" height="8"/><rect x="166" y="166" width="8" height="8"/>
              <rect x="70" y="178" width="8" height="8"/><rect x="82" y="178" width="8" height="8"/><rect x="106" y="178" width="8" height="8"/><rect x="130" y="178" width="8" height="8"/><rect x="154" y="178" width="8" height="8"/><rect x="178" y="178" width="8" height="8"/>
              <rect x="142" y="10" width="8" height="8"/><rect x="130" y="22" width="8" height="8"/><rect x="154" y="34" width="8" height="8"/><rect x="130" y="46" width="8" height="8"/><rect x="142" y="58" width="8" height="8"/><rect x="130" y="70" width="8" height="8"/><rect x="154" y="70" width="8" height="8"/><rect x="166" y="70" width="8" height="8"/>
              <rect x="142" y="82" width="8" height="8"/><rect x="178" y="82" width="8" height="8"/>
            </g>
            <!-- Center logo mark -->
            <rect x="88" y="88" width="24" height="24" rx="4" fill="white"/>
            <rect x="91" y="91" width="18" height="18" rx="3" fill="#1a7a54"/>
          </svg>
        </div>
        <div class="qr-info">
          <div class="qr-title">Payment Code</div>
          <p class="qr-desc">Open your banking app and scan this QR code to complete payment</p>
          <div class="qr-actions">
            <button class="btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Save QR
            </button>
            <button class="btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <button class="btn-primary" @click="showSuccess = true">
        I have paid
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
        </svg>
      </button>

      <p class="pay-footer">
        If the payment doesn't reflect automatically,<br/>
        please show this screen to your server.
      </p>
    </div>

    <!-- Success overlay -->
    <div v-if="showSuccess" class="success-overlay">
      <div class="success-box">
        <div class="check-icon">✅</div>
        <h3>Thank You!</h3>
        <p>Your payment has been received.</p>
        <button class="close-btn" @click="goToHistory">View Order History</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentTime = ref(new Date())
let timer = null

const formattedTime = computed(() =>
  currentTime.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })
)

onMounted(() => { timer = setInterval(() => { currentTime.value = new Date() }, 1000) })
onUnmounted(() => clearInterval(timer))

const showSuccess = ref(false)

function goToHistory() {
  showSuccess.value = false
  router.push('/order-history')
}
</script>

<style scoped>
.pay-wrap { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f4f5f7; padding: 1rem; }
.pay-card { width: 100%; max-width: 390px; background: #fff; border-radius: 25px; box-shadow: 0 8px 25px rgba(0,0,0,.12); overflow: hidden; }
.pay-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem 0.75rem; border-bottom: 1px solid #f0f0f0; }
.header-btn { background: none; border: none; cursor: pointer; color: #666; padding: 4px; display: flex; align-items: center; border-radius: 8px; transition: background 0.15s; }
.header-btn:hover { background: #f5f5f5; }
.header-title { font-size: 15px; font-weight: 600; color: #111; }
.notification-btn { position: relative; }
.notification-dot { position: absolute; top: 4px; right: 4px; width: 7px; height: 7px; background: #ff3b30; border-radius: 50%; border: 1.5px solid #fff; }
.amount-section { padding: 1.25rem 1.25rem 1rem; border-bottom: 1px solid #f0f0f0; }
.amount-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.5rem; }
.amount-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: #888; text-transform: uppercase; }
.table-badge { background: #1a7a54; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.amount-value { font-size: 40px; font-weight: 700; color: #1a7a54; line-height: 1.1; margin-bottom: 0.5rem; }
.order-info { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #888; }
.qr-section { background: #fff; margin: 1rem; border-radius: 16px; border: 1px solid #ebebeb; overflow: hidden; }
.qr-timer { display: flex; align-items: center; justify-content: flex-end; gap: 4px; padding: 0.5rem 0.75rem 0.25rem; font-size: 12px; color: #e24b4a; font-weight: 600; }
.qr-box { display: flex; justify-content: center; padding: 0.75rem 1.5rem; }
.qr-svg { border-radius: 8px; }
.qr-info { padding: 0.5rem 1.25rem 1rem; text-align: center; }
.qr-title { font-size: 15px; font-weight: 600; color: #111; margin-bottom: 4px; }
.qr-desc { font-size: 12px; color: #888; line-height: 1.5; margin-bottom: 1rem; }
.qr-actions { display: flex; gap: 8px; justify-content: center; }
.btn-outline { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fff; font-size: 13px; font-weight: 500; color: #333; cursor: pointer; transition: background 0.15s; }
.btn-outline:hover { background: #f8f8f8; }
.btn-primary { display: flex; align-items: center; justify-content: center; gap: 8px; width: calc(100% - 2rem); margin: 0 1rem 0.75rem; padding: 14px; background: #1a7a54; color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.btn-primary:hover { background: #15664a; }
.pay-footer { text-align: center; padding: 0 1rem 1.25rem; font-size: 11px; color: #aaa; line-height: 1.5; }
.success-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.success-box { width: 280px; background: white; border-radius: 20px; padding: 28px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,.15); animation: popUp .3s ease; }
.check-icon { font-size: 48px; margin-bottom: 12px; }
.success-box h3 { color: #1a7a54; margin: 0 0 8px; font-size: 22px; font-weight: 700; }
.success-box p { color: #666; font-size: 14px; margin-bottom: 20px; }
.close-btn { padding: 12px 24px; background: #1a7a54; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 14px; width: 100%; }
.close-btn:hover { background: #15664a; }
@keyframes popUp { from { transform: scale(.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
</style>