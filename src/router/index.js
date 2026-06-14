import { createRouter, createWebHistory } from "vue-router";

import Sidebar from "@/components/layout/Sidebar.vue";
import Preview from "@/pages/preview/Preview.vue";
import Home from "@/pages/home/Home.vue";
import NotFound from "@/pages/NotFound.vue";

import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import ResetPassword from "@/pages/auth/ResetPassword.vue";
import ConfirmOTP from "@/pages/auth/ConfirmOTP.vue";
import SendEmail from "@/pages/auth/SendEmail.vue";
import UserForm from "@/pages/auth/UserForm.vue";

import InventoryView from "@/pages/dashboard/inventory/view/InventoryView.vue";

const routes = [
	{ path: "/", redirect: "/dashboard/inventory" },

	{ path: "/preview", component: Preview },
	{
		path: "/",
		component: Sidebar,
		children: [
			{
				path: "/inventory",
				component: InventoryView,
			},
			{ path: "/home", component: Home },
		],
	},

	{ path: "/login", component: Login },
	{ path: "/register", component: Register },
	{ path: "/reset-password", component: ResetPassword },
	{ path: "/confirm-otp", component: ConfirmOTP },
	{ path: "/forgot-password", component: SendEmail },
	{ path: "/user-form", component: UserForm },

	{ path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
