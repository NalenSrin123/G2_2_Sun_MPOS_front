<template>
  <div class="wrap">
    <!-- Brand -->
    <div class="brand-wrap">
      <div class="brand-icon">
        <i class="ti ti-tools-kitchen-2"></i>
      </div>
      <p class="brand-name">LuxeDine Pro</p>
      <p class="brand-sub">Management Suite</p>
    </div>
 
    <!-- Form -->
    <div class="form-card">
      <div class="form-header">
        <div class="form-header-title">
          <i class="ti ti-user-plus"></i>
          <span>Create account</span>
        </div>
        <p>Fill in all required fields</p>
      </div>
 
      <div class="form-body">
 
        <!-- User Details -->
        <div class="section-title">
          <i class="ti ti-id-badge-2"></i>
          User details
        </div>
 
        <div class="field-grid">
          <input v-model="form.employeeId" placeholder="Employee ID" />
          <input v-model="form.fullName" placeholder="Full name" />
          <input v-model="form.username" placeholder="Username" />
          <input v-model="form.phone" placeholder="Phone number" />
          <input class="field-full" v-model="form.email" placeholder="Email address" />
        </div>
 
        <hr class="divider" />
 
        <!-- Role -->
        <div class="section-title">
          <i class="ti ti-shield-check"></i>
          Role
        </div>
 
        <div class="field-grid">
          <select v-model="form.role">
            <option disabled value="">Select role</option>
            <option>Admin</option>
            <option>Chef</option>
            <option>Customer</option>
          </select>
        </div>
 
        <hr class="divider" />
 
        <!-- Credentials -->
        <div class="section-title">
          <i class="ti ti-lock"></i>
          Account credentials
        </div>
 
        <div class="field-grid">
          <div class="pwd-wrap">
            <input
              :type="showPwd ? 'text' : 'password'"
              v-model="form.password"
              placeholder="Password"
            />
            <button type="button" class="pwd-toggle" @click="showPwd = !showPwd">
              <i :class="showPwd ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
            </button>
          </div>
 
          <div class="pwd-wrap">
            <input
              :type="showConfirm ? 'text' : 'password'"
              v-model="form.confirmPassword"
              placeholder="Confirm password"
            />
            <button type="button" class="pwd-toggle" @click="showConfirm = !showConfirm">
              <i :class="showConfirm ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
            </button>
          </div>
        </div>
 
        <button class="btn-submit" @click="submitForm">
          <i class="ti ti-user-plus"></i>
          Create account
        </button>
 
        <button class="btn-cancel" type="button">
          Cancel
        </button>
 
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { reactive, ref } from "vue";
 
const showPwd = ref(false);
const showConfirm = ref(false);
 
const form = reactive({
  employeeId: "",
  fullName: "",
  username: "",
  phone: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
});
 
function submitForm() {
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  console.log("User Data:", form);
  alert("Account created successfully!");
}
</script>
 @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap");
<style scoped>
 
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
 
.wrap {
  font-family: "DM Sans", sans-serif;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  min-height: 100vh;
  background: #f5f5f3;
}
 
/* ── Brand ── */
.brand-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
 
.brand-icon {
  width: 52px;
  height: 52px;
  background: #1a7a54;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
 
.brand-icon i {
  font-size: 26px;
  color: #fff;
}
 
.brand-name {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.3px;
}
 
.brand-sub {
  font-size: 12px;
  color: #888;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
 
/* ── Card ── */
.form-card {
  width: 100%;
  max-width: 560px;
  background: #ffffff;
  border: 0.5px solid #e0e0dc;
  border-radius: 12px;
  overflow: hidden;
}
 
/* ── Header ── */
.form-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 0.5px solid #e0e0dc;
  background: #f9f9f7;
}
 
.form-header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
 
.form-header-title i {
  font-size: 18px;
  color: #1a7a54;
}
 
.form-header-title span {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}
 
.form-header p {
  font-size: 13px;
  color: #888;
}
 
/* ── Body ── */
.form-body {
  padding: 1.5rem;
}
 
.section-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 500;
  color: #1a7a54;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 12px;
}
 
.section-title i {
  font-size: 15px;
}
 
/* ── Fields ── */
.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 4px;
}
 
.field-full {
  grid-column: 1 / -1;
}
 
.field-grid input,
.field-grid select {
  height: 38px;
  padding: 0 12px;
  border: 0.5px solid #d0d0cc;
  border-radius: 8px;
  background: #ffffff;
  color: #1a1a1a;
  font-size: 14px;
  font-family: "DM Sans", sans-serif;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  width: 100%;
}
 
.field-grid input:focus,
.field-grid select:focus {
  border-color: #1a7a54;
  box-shadow: 0 0 0 3px rgba(26, 122, 84, 0.12);
}
 
.field-grid input::placeholder {
  color: #b0b0aa;
}
 
.field-grid select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 28px;
  cursor: pointer;
}
 
/* ── Password ── */
.pwd-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
 
.pwd-wrap input {
  width: 100%;
  height: 38px;
  padding: 0 38px 0 12px;
  border: 0.5px solid #d0d0cc;
  border-radius: 8px;
  background: #ffffff;
  color: #1a1a1a;
  font-size: 14px;
  font-family: "DM Sans", sans-serif;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
 
.pwd-wrap input:focus {
  border-color: #1a7a54;
  box-shadow: 0 0 0 3px rgba(26, 122, 84, 0.12);
}
 
.pwd-wrap input::placeholder {
  color: #b0b0aa;
}
 
.pwd-toggle {
  position: absolute;
  right: 0;
  top: 0;
  height: 38px;
  width: 38px;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  padding: 0;
  transition: color 0.15s;
}
 
.pwd-toggle:hover {
  color: #1a1a1a;
}
 
/* ── Divider ── */
.divider {
  border: none;
  border-top: 0.5px solid #e0e0dc;
  margin: 1.25rem 0;
}
 
/* ── Buttons ── */
.btn-submit {
  width: 100%;
  height: 40px;
  background: #1a7a54;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  margin-top: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.15s, transform 0.1s;
}
 
.btn-submit:hover {
  background: #156645;
}
 
.btn-submit:active {
  transform: scale(0.99);
}
 
.btn-cancel {
  width: 100%;
  height: 38px;
  background: transparent;
  border: 0.5px solid #d0d0cc;
  border-radius: 8px;
  color: #888;
  font-size: 14px;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.15s, color 0.15s;
}
 
.btn-cancel:hover {
  background: #f5f5f3;
  color: #1a1a1a;
}
 
/* ── Responsive ── */
@media (max-width: 480px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}
</style>