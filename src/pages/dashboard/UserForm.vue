<template>
  <div class="wrap">
    <div class="brand-wrap">
      <div class="brand-icon">
        <i class="ti ti-tools-kitchen-2"></i>
      </div>
      <p class="brand-name">LuxeDine Pro</p>
      <p class="brand-sub">Management Suite</p>
    </div>
 
    <div class="form-card">
      <div class="form-header">
        <div class="form-header-title">
          <i class="ti ti-user-plus"></i>
          <span>Create account</span>
        </div>
        <p>Fill in all required fields</p>
      </div>
 
      <div class="form-body">
 
        <div class="section-title">
          <i class="ti ti-id-badge-2"></i>
          User details
        </div>
 
        <div class="form-fields-stack">
          <div class="field-group">
            <label class="field-label">Username</label>
            <input v-model="form.username" placeholder="Username" autocomplete="off" />
          </div>
          
          <div class="field-group">
            <label class="field-label">Email address</label>
            <input v-model="form.email" placeholder="Email address" autocomplete="off" />
          </div>
        </div>
 
        <hr class="divider" />
 
        <div class="section-title">
          <i class="ti ti-id-badge-2"></i>
          Account credentials
        </div>
 
        <div class="form-fields-stack">
          <div class="field-group">
            <label class="field-label">Role</label>
            <select v-model="form.role">
              <option disabled value="">Select role</option>
              <option>Admin</option>
              <option>Chef</option>
              <option>Customer</option>
            </select>
          </div>

          <div class="field-group">
            <label class="field-label">Password</label>
            <div class="pwd-wrap">
              <input
                type="text"
                v-model="form.password"
                placeholder="Password"
                :class="{ 'hide-text': !showPwd }"
                autocomplete="off"
              />
              <button type="button" class="pwd-toggle" @click="showPwd = !showPwd">
                <i :class="showPwd ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
              </button>
            </div>
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
 
const form = reactive({
  username: "",
  email: "",
  role: "",
  password: "",
});
 
function submitForm() {
  if (!form.username) {
    alert("Username is required!");
    return;
  }
  if (!form.email) {
    alert("Email is required!");
    return;
  }
  if (!form.role) {
    alert("Role is required!");
    return;
  }
  if (!form.password) {
    alert("Password is required!");
    return;
  }
  
  const userData = {
    username: form.username,
    email: form.email,
    role: form.role,
    password: form.password,
  };
  console.log("User Data:", userData);
  alert("Account created successfully!");
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap");
@import url("https://raw.githubusercontent.com/noppa/text-security/master/dist/text-security.css");
 
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
 
.wrap {
  font-family: "DM Sans", sans-serif;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  min-height: 100vh;
  background: #f4f6f8;
}
 
.brand-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 0.5rem;
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
  font-size: 24px;
  color: #fff;
}
 
.brand-name {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.3px;
}
 
.brand-sub {
  font-size: 11px;
  color: #6c757d;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
 
.form-card {
  width: 100%;
  max-width: 100%;
  background: #ffffff;
  border: 1px solid #eef2f3;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}
 
.form-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f1f3fa;
  background: #fafbfd;
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
  font-weight: 600;
  color: #1a1a1a;
}
 
.form-header p {
  font-size: 13px;
  color: #8a96a3;
}
 
.form-body {
  padding: 2rem 2rem;
}
 
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #1a7a54;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 1.25rem;
}
 
.section-title i {
  font-size: 15px;
}
 
.form-fields-stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 13px;
  font-weight: 500;
  color: #343a40;
  text-align: left;
}
 
.form-fields-stack input,
.form-fields-stack select {
  height: 38px;
  padding: 0 14px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: #ffffff;
  color: #313a46;
  font-size: 14px;
  font-family: "DM Sans", sans-serif;
  outline: none;
  transition: all 0.15s ease;
  width: 100%;
}
 
.form-fields-stack input:focus,
.form-fields-stack select:focus {
  border-color: #1a7a54;
  box-shadow: 0 0 0 3px rgba(26, 122, 84, 0.12);
}
 
.form-fields-stack input::placeholder {
  color: #adb5bd;
}
 
.form-fields-stack select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236c757d' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
  cursor: pointer;
}
 
.pwd-wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}
 
.pwd-wrap input {
  padding-right: 40px;
}
 
.pwd-toggle {
  position: absolute;
  right: 6px;
  height: 32px;
  width: 32px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
 
.divider {
  border: none;
  border-top: 1px solid #edf2f9;
  margin: 1.75rem 0;
}
 
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
  margin-top: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.15s ease;
}
 
.btn-submit:hover {
  background: #145d40;
}
 
.btn-submit:active {
  transform: scale(0.99);
}
 
.btn-cancel {
  width: 100%;
  height: 38px;
  background: transparent;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  color: #6c757d;
  font-size: 14px;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.15s ease;
}
 
.btn-cancel:hover {
  background: #f8f9fa;
  color: #313a46;
}

.hide-text {
  font-family: "text-security-disc" !important;
}
</style>