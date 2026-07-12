<template>
 <div class="otp-page">
    <div class="otp-card-container">
        <div class="otp-card">
            <div class="logo-section">
                <div class="logo-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" class="logo-icon">
                    <path d="M7 2v10a3 3 0 0 0 3 3h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M12 2v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M17 2v10a3 3 0 0 1-3 3h-1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M9 19a3 3 0 1 0 0 6h6a3 3 0 1 0 0-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M12 15v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <span class="brand-name">LuxeDine Pro</span>
            </div>
            <h1 class="otp-head">Verify your email</h1>
            <p class="otp-subtext">We've sent a 6-digit code to
                <span class="user-email">admin@luxeding.comm</span>
            </p>

            <div class="otp-input-group">
              <input
                    v-for="(digit, index) in otp"
                    :key="index"
                    type="text"
                    maxlength="1"
                    class="otp-digit-input"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    @input="handleInput(index, $event)"
                    @keydown="handleKeyDown(index, $event)"
                    ref="inputs"
               />
            </div>
            <button class="verify-button" @click="verifyCode">Verify Code
                <svg class="shield-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
             <div class="resend-section">
            <p class="resend-prompt">Didn't receive the code?</p>
                <button v-if="timeLeft > 0" class="resend-link disabled">Resend</button>
                <button v-else class="resend-link active" @click="resendCode">Resend Now</button>
                
                <div v-if="timeLeft > 0" class="timer">
                    <svg class="timer-icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Resend in {{ formatTime(timeLeft) }}
                </div>
            </div>            
            <div class="back-section">
            <router-link to="/auth/login" class="back-link">
              <svg class="back-icon" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Back to Login
            </router-link>
          </div>
        </div>
    </div>
 </div>
</template>
<script>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { useRouter } from 'vue-router';
    export default {
    name: 'ConfirmOTPPage',
    setup() {
            const router = useRouter();
            const otpLength = 6;
            const otp = ref(new Array(otpLength).fill(''));
            const inputs = ref([]);
            const timeLeft = ref(59); 
            let timerInterval = null;

            const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            };

            const handleInput = (index, event) => {
            const val = event.target.value;
                if (!/^[0-9]$/.test(val)) {
                    otp.value[index] = '';
                    return;
                }
                otp.value[index] = val;

                if (index < otpLength - 1 && val) {
                    inputs.value[index + 1].focus();
                }
            };

            const handleKeyDown = (index, event) => {
                if ((event.key === 'Backspace' || event.key === 'Delete') && !otp.value[index] && index > 0) {
                    inputs.value[index - 1].focus();
                }
            };

            const verifyCode = () => {
            const fullOtp = otp.value.join('');
                if (fullOtp.length === otpLength) {
                    console.log('Verifying code OTP:', fullOtp);
                    router.push('/dashboard');
                } else {
                    alert('Please enter all 6 digits of the code!');
                }
            };

            const startTimer = () => {
            timeLeft.value = 59; 
            clearInterval(timerInterval);
                timerInterval = setInterval(() => {
                    if (timeLeft.value > 0) {
                    timeLeft.value--;
                    } else {
                    clearInterval(timerInterval); 
                    }
                }, 1000);
            };

            
            const resendCode = () => {
                if (timeLeft.value === 0) {
                    console.log('Resending OTP code...');
                    startTimer(); 
                }
            };

            onMounted(() => {
            startTimer(); 
                if (inputs.value[0]) {
                    inputs.value[0].focus();
                }
            });

            onBeforeUnmount(() => {
            clearInterval(timerInterval); 
            });

            return {
            otp,
            inputs,
            timeLeft,
            formatTime,
            handleInput,
            handleKeyDown,
            verifyCode,
            resendCode
            };
        }
    };
</script>

<style scoped>

.otp-page-wrapper {
 
  width: 100vw;
  height: 100vh;
  background-color: #f6fdf9; 
  color: #2e3b31;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
}

.otp-card-container {
  padding: 80px;
  width: 100%;
  max-width: 580px;
  margin: auto;
}

.otp-card {
  background-color: #ffffff;
  border: 1px solid #e1ead6;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); 
  display: flex;
  flex-direction: column;
  align-items: center;
}


.logo-icon-wrapper {
  background-color: #0b5e40; 
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-right: 18px;
  margin-left: 35px;
}

.logo-icon{
  width: 20px;
  height: 20px;
}

.brand-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: #0b5e40;
  width: 100%;
}

.otp-head {
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1e1e1e;
}

.otp-subtext {
  font-size: 0.95rem;
  color: #555555;
  margin-bottom: 32px;
  text-align: center;
  line-height: 1.5;
}

.user-email {
  font-weight: 600;
  color: #1e1e1e;
}

.otp-input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.otp-digit-input {
  width: 46px;
  height: 54px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e1e1e;
  text-align: center;
  transition: all 0.2s ease;
}

.otp-digit-input:focus {
  outline: none;
  border-color: #0b5e40; 
  box-shadow: 0 0 0 3px rgba(11, 94, 64, 0.15); 
}

.verify-button {
  background-color: #0b5e40;
  color: #ffffff;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.verify-button:hover {
  background-color: #084a32;
}

.shield-icon {
  width: 18px;
  height: 18px;
  margin-left: 8px;
}

.resend-section {
  text-align: center;
  margin-bottom: 24px;
  width: 100%;
}

.resend-prompt {
  font-size: 0.9rem;
  color: #555555;
  margin-bottom: 8px;
}

.resend-link {
  background: none;
  border: none;
  color: #0b5e40; 
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 12px;
  display: inline-block;
  transition: color 0.2s;
  padding: 8px 16px;
}

.resend-link.disabled {
  color: #aaaaaa;
  cursor: default;
}

.resend-link.active:hover {
  text-decoration: underline;
}

.timer {
  background-color: #f6fcf8; 
  color: #0b5e40;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  border: 1px solid #d8f1e0;
}

.timer-icon {
  width: 14px;
  height: 14px;
  margin-right: 6px;
}

.back-section {
  width: 100%;
  border-top: 1px solid #e2e8f0; 
  padding-top: 20px;
  display: flex;
  justify-content: center;
}

.back-link {
  background: none;
  border: none;
  color: #64748b; 
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.back-link:hover {
  color: #1e1e1e;
}

.back-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}


@media (max-width: 500px) {
  .otp-card-container {
  display: flex; 
  justify-content: center;
  padding: 50px 10px 50px 10px;
  height: 100vh;
  box-sizing: border-box;
  }
  .otp-card {
    padding: 24px 16px;
    width: 100%;
    box-sizing: border-box;
  }
  .otp-heading {
    font-size: 1.5rem;
    gap: 6px;
    width: 100%;
  }
  .otp-digit-input {
    width: 38px;
    height: 48px;
    font-size: 1.2rem;
    border-radius: 6px;
  }
  .otp-input-group {
    gap: 8px;
  }
}
</style>
