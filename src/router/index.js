import { createRouter, createWebHistory } from "vue-router";

import Sidebar from "@/components/layout/Sidebar.vue";
import Preview from "@/pages/preview/Preview.vue";
import Home from "@/pages/home/Home.vue";
import NotFound from "@/pages/NotFound.vue";

import Dashboard from "@/pages/dashboard/Dashboard.vue";
import DashboardOverview from "@/pages/dashboard/DashboardOverview.vue";
import ProductList from "@/pages/dashboard/Product_list.vue";
import CategoryList from "@/pages/dashboard/Category_List.vue";
import Category from "@/pages/dashboard/Category.vue";
import Setting from "@/pages/dashboard/Setting.vue";
import UserList from "@/pages/dashboard/UserList.vue";
import TableForm from "@/pages/dashboard/TableForm.vue";
import TableList from "@/pages/table/Tablelist.vue";
import Orders from "@/pages/orders/Orders.vue";


import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import ResetPassword from "@/pages/auth/ResetPassword.vue";
import ConfirmOTP from "@/pages/auth/ConfirmOTP.vue";
import SendEmail from "@/pages/auth/SendEmail.vue";
import UserForm from "@/pages/auth/UserForm.vue";
import Dsign_Create_Product_Page from "../pages/dashboard/Dsign_Create_Product_Page.vue";

import QR_Payment from "../../payment/QR_Payment.vue";
import ProductDetail from "@/pages/dashboard/ProductDetail.vue";

import PaymentMethod from "../pages/orders/PaymentMethod.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/preview", component: Preview },
  { path: "/home", component: Home },
  { path: "/Home", redirect: "/home" },
 

  {
    path: "/",
    component: Sidebar,
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "dashboard/overview", component: DashboardOverview },
      { path: "orders", component: Orders },
      { path: "tables", component: TableList },
      { path: "tables/new", component: TableForm },
      { path: "products", component: ProductList },
      { path: "categories", component: CategoryList },
      { path: "categories/new", component: Category },
      { path: "settings", component: Setting },
      { path: "users", component: UserList },

    
      { path: "products", component: ProductList },
      { path: "products/detail/:id", component: ProductDetail },
      {path: "payment", component: PaymentMethod}
    ],
  },

  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/reset-password", component: ResetPassword },
  { path: "/reset_pas`~word", redirect: "/reset-password" },
  { path: "/confirm-otp", component: ConfirmOTP },
  { path: "/forgot-password", component: SendEmail },
  { path: "/user-form", component: UserForm },

  { path: "/:pathMatch(.*)*", component: NotFound },

    {path:  "/payment", component:QR_Payment},
{
  path: "/design_create_product_page",
  name: "design_create_product_page",
  component: Dsign_Create_Product_Page,
}

];
const route=[
    {
      path:"/",
      children:[

      ]
        
    },
    {
      path:"/dashboard",
      component:Sidebar,
      children:[

      ]
    },
    {
      path: "/auth",
      children:[

      ]
    }
]
const router = createRouter({
  history: createWebHistory(),
  route,
});

export default router;
 