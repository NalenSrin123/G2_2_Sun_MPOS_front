<template>
  <div class="layout" :class="{ 'sidebar-open': sidebarOpen }">
 
    <!-- SIDEBAR OVERLAY (mobile) -->
    <div class="overlay" @click="sidebarOpen = false" />
 
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="brand">
        
        <div>
          <div class="brand-name">LuxeDine Pro</div>
          <div class="brand-sub">Management Suite</div>
        </div>
        <button class="close-sidebar" @click="sidebarOpen = false"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="s-divider" />
 
      <nav class="nav">
        <a v-for="item in navItems" :key="item.label"
           :class="['nav-link', { active: item.active }]"
           @click="sidebarOpen = false">
          <span class="nav-icon"> <i :class="item.icon"></i></span>
          <span class="nav-label">{{ item.label }}</span>
        </a>
      </nav>
 
      <div style="margin-top:auto">
        <div class="s-divider" />
        <div class="nav" style="padding-bottom:16px">
          <a class="nav-link" @click="sidebarOpen = false">
            <span class="nav-icon"> <i class="bi bi-gear"></i></span>
            <span class="nav-label">Settings</span>
          </a>
          <a class="nav-link logout" @click="sidebarOpen = false">
            <span class="nav-icon">  <i class="bi bi-box-arrow-right"></i></span>
            <span class="nav-label">Logout</span>
          </a>
        </div>
      </div>
    </aside>
 
    <!-- MAIN -->
    <div class="main">
 
      <!-- Topbar -->
      <header class="topbar">
        <button class="hamburger" @click="sidebarOpen = !sidebarOpen" aria-label="Open menu">
          <span /><span /><span />
        </button>
        <div class="search-wrap">
          <button class="search-btn"> <i class="bi bi-search"></i></button>
          <input v-model="searchQ" class="search-input" placeholder="Search menu items..." />
         
        </div>
        <div class="topbar-right">
          <button class="top-btn" title="Help">
           <i class="bi bi-question-circle"></i>
          </button>
          <button class="top-btn" title="Notifications">
           <i class="bi bi-bell-fill"></i>
          </button>
          <div class="avatar">
            <img src="https://i.pinimg.com/1200x/1f/c9/6e/1fc96e1619b913eade6eb6533f72cf83.jpg" alt="">
          </div>
        </div>
      </header>
 
      <!-- Page -->
      <div class="page">
 
        <!-- Page header -->
        <div class="page-head">
          <div>
            <h1 class="page-title">Menu Management</h1>
            <p class="page-sub">Manage your catalog of {{ items.length }} active items across 4 categories.</p>
          </div>
         <button class="btn-add" @click="design_create"><i class="bi bi-plus-lg"></i>Add New Item Row</button>
        </div>
 
        <!-- Filter bar -->
        <div class="filter-bar">
          <div class="tabs-scroll">
            <div class="tabs">
              <button
                v-for="c in ['All Items', ...categories]" :key="c"
                :class="['tab', { active: activeCat === c }]"
                @click="activeCat = c; page = 1"
              >{{ c }}</button>
            </div>
          </div>
          <button class="btn-filter">
         <i class="bi bi-arrow-bar-right"></i>
            <span class="filter-text">Advanced Filters</span>
          </button>
        </div>
 
        <!-- Desktop Table -->
        <div class="table-wrap desktop-table">
          <table class="table">
            <thead>
              <tr>
                <th style="width:40%">PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STATUS</th>
                <th>QTY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pagedItems" :key="item.id" class="trow">
                <td>
                  <div class="prod-cell">
                    <img class="prod-img" :src="item.img" :alt="item.name" />
                    <div>
                      <div class="prod-name">{{ item.name }}</div>
                      <div class="prod-desc">{{ item.desc }}</div>
                    </div>
                  </div>
                </td>
                <td><span class="badge">{{ item.cat }}</span></td>
                <td class="col-price">{{ item.price }}</td>
                <td>
                  <span :class="statusCls(item.qty)">
                    <span v-if="item.qty < 10" class="sdot">•</span>
                    {{ statusLbl(item.qty) }}
                  </span>
                </td>
                <td :class="['col-qty', item.qty > 0 && item.qty < 10 ? 'qty-warn' : '']">{{ item.qty }}</td>
                <td>
                  <div class="actions">
                    <button class="act-btn" @click="openEdit(item)" title="Edit">  <i class="bi bi-pencil-square"></i></button>
                    <button class="act-btn del" @click="removeItem(item.id)" title="Delete"> <i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
              <tr v-if="pagedItems.length === 0">
                <td colspan="6" class="empty-row">No items found.</td>
              </tr>
            </tbody>
          </table>
        </div>
 
        <!-- Mobile Cards -->
        <div class="mobile-cards">
          <div v-for="item in pagedItems" :key="item.id" class="m-card">
            <div class="m-card-top">
              <div class="prod-cell">
                <img class="prod-img" :src="item.img" :alt="item.name" />
                <div>
                  <div class="prod-name">{{ item.name }}</div>
                  <div class="prod-desc">{{ item.desc }}</div>
                </div>
              </div>
              <div class="m-actions">
                <button class="act-btn" @click="openEdit(item)">
                  <!-- <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> -->
                </button>
                <button class="act-btn del" @click="removeItem(item.id)">
                 <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
            <div class="m-card-meta">
              <span class="badge">{{ item.cat }}</span>
              <span class="col-price">{{ item.price }}</span>
              <span :class="statusCls(item.qty)">
                <span v-if="item.qty < 10" class="sdot">•</span>{{ statusLbl(item.qty) }}
              </span>
              <span :class="['col-qty', item.qty > 0 && item.qty < 10 ? 'qty-warn' : '']">
                Qty: {{ item.qty }}
              </span>
            </div>
          </div>
          <div v-if="pagedItems.length === 0" class="empty-row">No items found.</div>
        </div>
 
        <!-- Footer -->
        <footer class="foot">
          <div class="foot-stats">
            <div class="stat">
              <div class="stat-label">TOTAL ITEMS</div>
              <div class="stat-val">{{ items.length }} Items</div>
            </div>
            <div class="stat">
              <div class="stat-label">ACTIVE CATEGORIES</div>
              <div class="stat-val">4 Groups</div>
            </div>
            <div class="stat">
              <div class="stat-label">LOW STOCK ALERTS</div>
              <div class="stat-val stat-warn">{{ alertCount }} Items</div>
            </div>
          </div>
          <div class="pagination">
            <span class="pg-label">Page {{ page }} of {{ totalPages }}</span>
            <button class="pg-btn" :disabled="page <= 1" @click="page--"><i class="bi bi-chevron-left"></i></button>
            <button class="pg-btn" :disabled="page >= totalPages" @click="page++"><i class="bi bi-chevron-right"></i></button>
          </div>
        </footer>
 
      </div>
    </div>
 
    <!-- MODAL -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-bg" @click.self="closeModal">
        <div class="modal">
          <div class="modal-head">
            <h2 class="modal-title">{{ editId ? 'Edit Item' : 'Add New Item' }}</h2>
            <button class="modal-x" @click="closeModal"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-body">
            <div class="fg"><label>Item Name</label><input v-model="form.name" placeholder="e.g. Grilled Lamb Chops" /></div>
            <div class="fg"><label>Description</label><input v-model="form.desc" placeholder="Short description..." /></div>
            <div class="fg-row">
              <div class="fg"><label>Price</label><input v-model="form.price" placeholder="$0.00" /></div>
              <div class="fg"><label>Quantity</label><input v-model.number="form.qty" type="number" min="0" /></div>
            </div>
            <div class="fg"><label>Category</label><select v-model="form.cat"><option>Starters</option><option>Mains</option><option>Desserts</option><option>Drinks</option></select></div>
            <div class="fg"><label>Image URL</label><input v-model="form.img" placeholder="https://..." /></div>
          </div>
          <div class="modal-foot">
            <button class="btn-cancel" @click="closeModal">Cancel</button>
            <button class="btn-add" @click="saveItem">{{ editId ? 'Save Changes' : 'Add Item' }}</button>
          </div>
        </div>
      </div>
    </Teleport>
 
  </div>
</template>
 
<script setup>

// go to page design_create_product_page>

import { useRouter } from "vue-router"
const router = useRouter()
const design_create = () => {
  router.push("/design_create_product_page")
}

import { ref, computed } from 'vue'
 
const items = ref([
  {
    id: 1,
    name: 'Grilled Lamb Chops',
    desc: 'Grass-fed lamb, mint gremolata',
    cat: 'Mains',
    price: '$34.00',
    qty: 24,
    img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    name: 'Artisan Quinoa Bowl',
    desc: 'Tri-color quinoa, avocado, tahini',
    cat: 'Starters',
    price: '$18.50',
    qty: 15,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 3,
    name: 'Molten Lava Cake',
    desc: '70% dark chocolate centre',
    cat: 'Desserts',
    price: '$12.00',
    qty: 0,
    img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 4,
    name: 'Premium Dry Martini',
    desc: 'Choice of botanist gin or vodka',
    cat: 'Drinks',
    price: '$16.00',
    qty: 4,
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 5,
    name: 'Saffron Sea Bass',
    desc: 'Wild-caught bass, saffron beurre blanc',
    cat: 'Mains',
    price: '$29.00',
    qty: 12,
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  },
])
 
const navItems = [
  { label: 'Dashboard', active: false, icon: 'bi bi-speedometer2' },
  { label: 'Orders', active: false, icon: 'bi bi-receipt' },
  { label: 'Menu', active: true, icon: 'bi bi-menu-button-wide' },
  { label: 'Inventory', active: false, icon: 'bi bi-box-seam' },
  { label: 'Staff', active: false, icon: 'bi bi-people' },
  { label: 'Analytics', active: false, icon: 'bi bi-bar-chart' }
]
 
const categories  = ['Starters', 'Mains', 'Desserts', 'Drinks']
const activeCat   = ref('All Items')
const searchQ     = ref('')
const page        = ref(1)
const perPage     = 5
const sidebarOpen = ref(false)
let   nextId      = 6
 
const showModal = ref(false)
const editId    = ref(null)
const form      = ref({ name: '', desc: '', price: '', qty: 0, cat: 'Mains', img: '' })
 
const filtered = computed(() =>
  items.value.filter(i => {
    const inCat    = activeCat.value === 'All Items' || i.cat === activeCat.value
    const inSearch = !searchQ.value || i.name.toLowerCase().includes(searchQ.value.toLowerCase())
    return inCat && inSearch
  })
)
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const pagedItems = computed(() => {
  const s = (page.value - 1) * perPage
  return filtered.value.slice(s, s + perPage)
})
const alertCount = computed(() => items.value.filter(i => i.qty < 10).length)
 
function statusLbl(qty) {
  if (qty === 0) return 'Sold Out'
  if (qty < 10)  return 'Low Stock'
  return 'In Stock'
}
function statusCls(qty) {
  if (qty === 0) return 'status s-out'
  if (qty < 10)  return 'status s-low'
  return 'status s-ok'
}
 
function removeItem(id) { items.value = items.value.filter(i => i.id !== id) }
function openAdd() { editId.value = null; form.value = { name: '', desc: '', price: '', qty: 0, cat: 'Mains', img: '' }; showModal.value = true }
function openEdit(item) { editId.value = item.id; form.value = { ...item }; showModal.value = true }
function closeModal() { showModal.value = false }
function saveItem() {
  if (!form.value.name.trim()) return
  if (editId.value) {
    const idx = items.value.findIndex(i => i.id === editId.value)
    items.value[idx] = { ...items.value[idx], ...form.value }
  } else {
    items.value.push({ id: nextId++, ...form.value })
  }
  closeModal()
}
</script>
 
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
/* ✅✅✅ EXACT COLORS FROM YOUR IMAGE ✅✅✅ */
:root {
  --bg-page:       #f0f0f0;    /* Light gray background */
  --bg-sidebar:    #FFFFFF;    /* White sidebar */
  --bg-surface:    #FFFFFF;    /* White cards/table */
  --bg-input:      #F5F5F5;    /* Input background */
  --bg-nav-hover:  #F0F7F2;    /* Nav hover */
  --bg-nav-active: #E8F5EC;    /* Active nav — light mint green */
  --border:        #E3E3E3;    /* Borders — light gray */
  --border-table:  #EFEFEF;    /* Table row divider */
  --text-primary:  #1A1A1A;    /* Near black text */
  --text-muted:    #888888;    /* Gray muted text */
  --badge-bg:      #EEEDF8;    /* Badge — light lavender */
  --badge-border:  #E0DEEF;    /* Badge border */
  --badge-text:    #5B5A9E;    /* Badge text — purple */
  --btn-dark:      #2D2D2D;    /* Dark active tab */
  --green-text:    #47a04c;    /* In Stock green */
  --amber-text:    #E07A00;    /* Low Stock orange */
  --red-text:      #C62828;    /* Sold Out red */
  --accent-green:  #3A7D44;    /* Avatar green */
}
 
/* ══════════════════════════════
   LAYOUT
══════════════════════════════ */
.layout {
  display: flex;
  height: 100vh;
  /* background: var(--bg-page); */
  background: #f1f2f1;
  font-family: 'DM Sans', sans-serif;
  color: var(--text-primary);
  font-size: 13.5px;
  overflow: hidden;
  position: relative;
}
 
/* ══════════════════════════════
   OVERLAY (mobile)
══════════════════════════════ */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 40;
  
}
.layout.sidebar-open .overlay { display: block; }
 
/* ══════════════════════════════
   SIDEBAR
══════════════════════════════ */
.sidebar {
  width: 220px;
  flex-shrink: 0;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  transition: transform .25s ease;
  z-index: 50;
  background-color:rgb(223, 233, 225) ;
}
 
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 18px 16px;
}
.brand-name { font-family: Arial, Helvetica, sans-serif; color: var(--text-primary); font-size: 25px; font-weight: 600;}
.brand-sub  { color: var(--text-muted); font-size: 15px; margin-top: 1px;}
.close-sidebar {
  display: none;
  margin-left: auto;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 16px;
  cursor: pointer;
  padding: 2px 4px;
}
 
.s-divider { height: 1px; background: var(--border); margin: 0 16px; }
 
.nav { padding: 12px 10px; display: flex; flex-direction: column; gap: 2px; }
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 7px;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  transition: background .13s, color .13s;
  font-family: sans-serif;
  font-weight: 500;
}
.nav-link:hover { background: var(--bg-nav-hover); color: #24382B; }
.nav-link.active { background: var(--bg-nav-active); color: #1F6037; font-weight: 500; }
.nav-link.logout { color: #C03030; }
.nav-icon { font-size: 20px; width: 18px; text-align: center; flex-shrink: 0; }
.nav-icon i{ font-size: 16px;}
.act-btn i {font-size: 15px;}
.btn-add i {font-size: 14px;}
.top-btn i{font-size: 15px;}
.nav-label { white-space: nowrap; }
 
/* ══════════════════════════════
   MAIN
══════════════════════════════ */
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
 
/* Topbar */
.topbar {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  padding: 10px 22px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-input);
  cursor: pointer;
  padding: 0 9px;
  flex-shrink: 0;
  
}
.hamburger span { display: block; height: 2px; background: #55705E; border-radius: 2px; }
 
.search-wrap {
   position: absolute;
  position: relative;
  flex: 1;
  display: flex;
   /* max-width: 500px;  */
  align-items: center;
  gap: 10px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px 13px;
  color: var(--text-muted);
  width: 100%;
}
.search-input {
  padding: 10px 45px 10px 18px;  
  border: none;
  border-radius: 20px;
  background:#DFE9E1;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: var(--text-primary);
  width: 100%;
  padding-left: 40px;
}
.search-btn {
  position: absolute;
  left:  18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px ;
}

/* .search-btn:hover {
  color: var(--text-primary);    
} */
/* .search-input::placeholder { color:#7c7c7c; } */

.topbar-right { display: flex; align-items: center; gap: 7px; }
.top-btn {
  padding: 15px;
  width:5px; height: 5px;
 
  border: 1px solid var(--border); border-radius: 8px;
  background: var(--bg-input); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #000000; transition: background .12s;
}

.top-btn i {
  font-size: 20px;
}
.avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  overflow: hidden;         
  flex-shrink: 0;
  border: 2px solid var(--border);
}

.avatar img {
  width: 100%;              
  height: 100%;
  object-fit: cover;        
  display: block;
}
/* Page */
.page {
  flex: 1;
  overflow-y: auto;
  padding: 26px 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
 
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.page-title {
  font-family: Arial, Helvetica, sans-serif, serif;
  font-size: 25px; font-weight: 600;
  color: var(--text-primary);
}
.page-sub { color: var(--text-muted); font-size: 15px; margin-top: 4px;font-family: Arial, Helvetica, sans-serif, serif; color: #464141;}

.btn-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #FFFFFF;
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 7px 14px;
  border-radius: 4px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.12s;
}
.btn-add:hover {
  background-color: #F8FCF9;
}
 
/* Filter bar */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
  font-family: Arial, Helvetica, sans-serif;
  
}
.tabs-scroll { overflow-x: auto; flex: 1; min-width: 0; }
.tabs-scroll::-webkit-scrollbar { display: none; }
.tabs { display: flex; gap: 6px; min-width: max-content; align-items: center; }
 
.tab {
  padding: 6px 18px;
   border: 1px solid #000;;
  border-radius: 20px;
  /* background: #e2f3e9; */
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px; cursor: pointer;
   border: 1px solid #000;
  white-space: nowrap;
}
.tab:hover { background: var(--bg-nav-hover); color: #24382B; }
.tab.active { background: #deece1; color: #000000;  }
 
.btn-filter {
  display: flex; align-items: center; gap: 6px;
 width:10px 40px;
  background: transparent; border: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px; color: var(--text-muted); cursor: pointer;
  white-space: nowrap; flex-shrink: 0;
  transition: color .12s;
}
 .btn-filter i{
  font-size: 20px;
 }

/* Desktop table */
.table-wrap {
  background: var(--bg-surface);
  border: 1px solid #a7b5aa; 
  border-radius: 10px;
  overflow: hidden;

 
}
.table { width: 100%; border-collapse: collapse;font-family:Arial, Helvetica, sans-serif ; }
.table thead tr { border-bottom: 1px solid var(--border); font-family: Arial, Helvetica, sans-serif;}
.table th {
  padding: 10px 16px;
  text-align: left;
  font-size: 10.5px; font-weight: 600;
  letter-spacing: .08em; color: var(--text-muted);
  background:#DFE9E1;
  font-family: Arial, Helvetica, sans-serif;
}
.trow { border-bottom: 1px solid var(--border-table); transition: background .11s; }
.trow:last-child { border-bottom: none; }
.trow:hover { background: #F8FCF9; }
.trow td { padding: 13px 16px; vertical-align: middle; }
 
.prod-cell { display: flex; align-items: center; gap: 12px; }
.prod-img {
  width: 44px; height: 44px; border-radius: 8px;
  object-fit: cover; border: 1px solid var(--border);
  flex-shrink: 0;
}
.prod-name { font-size: 14px; font-weight: 540; color: var(--text-primary); }
.prod-desc { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
 
.badge {
  display: inline-block;
  padding: 3px 11px; border-radius: 50px;
  background: var(--badge-bg); border: 1px solid var(--badge-border);
  font-size: 13px; color: var(--badge-text); white-space: nowrap;
  background-color: rgb(221, 228, 236) ;
}
 
.col-price { font-weight: 600; font-size: 13.5px; color: var(--text-primary); }
.col-qty   { font-weight: 400; font-size: 13px; color: var(--text-primary); }
.qty-warn  { color: var(--amber-text); }
 
.status { font-size: 13px; display: flex; align-items: center; gap: 4px; white-space: nowrap;font-family: Arial, Helvetica, sans-serif; }
.s-ok   { color: var(--green-text); }
.s-low  { color: var(--amber-text); }
.s-out  { color: var(--red-text); }
.sdot   { font-size: 9px; line-height: 1; }
 
.actions { display: flex; gap: 5px; }
.act-btn {
  width: 30px; height: 30px;
  border: 1px solid transparent;
  background: transparent; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #7A9483; transition: color .12s;
}
.act-btn:hover     { color: var(--text-primary); }
.act-btn.del:hover { color: var(--red-text); }
 
.empty-row { text-align: center; color: #94B09E; padding: 32px; font-size: 13px; }
 
/* Mobile cards */
.mobile-cards { display: none; flex-direction: column; gap: 10px; }
.m-card {
  background: var(--bg-surface);
 border: 1px solid #a7b5aa; 
  border-radius: 10px;

  /* padding: 14px 14px 12px; */
}
.m-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}
.m-actions { display: flex; gap: 5px; flex-shrink: 0; }
.m-card-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid var(--border-table);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
 
/* Footer */
.foot {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 13px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
}
.foot-stats { display: flex; gap: 28px; flex-wrap: wrap; }
.stat-label { font-size: 10px; font-weight: 600; letter-spacing: .08em; color: var(--text-muted); }
.stat-val   { font-size: 13.5px; font-weight: 600; margin-top: 3px; color: var(--text-primary); }
.stat-warn  { color: var(--amber-text); }
 
.pagination { display: flex; align-items: center; gap: 6px; }
.pg-label   { font-size: 12.5px; color: var(--text-muted); margin-right: 4px; }
.pg-btn {
  width: 30px; height: 30px;
  border: 1px solid var(--border); border-radius: 6px;
  background: var(--bg-surface); cursor: pointer;
  font-size: 16px; color: #607A6A;
  display: flex; align-items: center; justify-content: center;
  transition: background .12s;
}
.pg-btn:hover:not(:disabled) { background: var(--bg-input); }
.pg-btn:disabled { opacity: .3; cursor: not-allowed; }
 
/* MODAL */
.modal-bg {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.38);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 200;
  padding: 16px;
}
.modal {
  background: var(--bg-surface); border-radius: 14px;
  width: 100%; max-width: 440px;
  box-shadow: 0 24px 64px rgba(0,0,0,.15);
  animation: pop .18s ease;
  overflow: hidden;
}
@keyframes pop {
  from { transform: translateY(12px) scale(.98); opacity: 0; }
  to   { transform: none; opacity: 1; }
}
.modal-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px 14px;
  /* border-bottom: 1px solid var(--border); */
  background:#DFE9E1;
  /* border-bottom: rgb(192, 192, 192) */
}
.modal-title { font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 500; color: var(--text-primary); }
.modal-x {
  background: none; border: none; cursor: pointer;
  font-size: 16px; color: var(--text-muted);
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px; transition: background .12s;
}
.modal-x i{
  font-size: 15px ;
 
}
.modal-x:hover { background: var(--bg-input); }
 
.modal-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 13px;background-color:  #fefffe;   }
.fg-row { display: flex; gap: 12px; }
.fg-row .fg { flex: 1; min-width: 0; }
.fg { display: flex; flex-direction: column; gap: 5px; }
.fg label { font-size: 10.5px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: .06em; }
.fg input, .fg select {
  padding: 9px 11px;
  border: 1px solid var(--border); border-radius: 8px;
  background: #DFE9E1;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px; color: var(--text-primary); outline: none;
  transition: border-color .13s;
  width: 100%;
}
.fg input:focus, .fg select:focus { border-color: var(--accent-green); background: #fff; }
 
.modal-foot {
  display: flex; justify-content: flex-end; gap: 9px;
  padding: 12px 20px 18px;
  /* border-top: 1px solid var(--border); */
    background:#DFE9E1;
}
.btn-cancel {
  padding: 9px 18px;
  border: 1px solid var(--border); border-radius: 9px;
  background: var(--bg-input);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px; cursor: pointer; color: var(--text-primary);
  transition: background .12s;
}
.btn-cancel:hover { background: var(--bg-nav-hover); }
 
/* RESPONSIVE */
@media (max-width: 1024px) {
  .sidebar { width: 200px; }
  .page { padding: 20px 18px 16px; }
  .filter-text { display: none; }
  .btn-filter { padding: 6px 10px; }
}
 
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0; left: 0; bottom: 0;
    transform: translateX(-100%);
    width: 240px;
  }
  .layout.sidebar-open .sidebar { transform: translateX(0); }
  .close-sidebar { display: flex; }
  .hamburger { display: flex; }
  .desktop-table { display: none; }
  .mobile-cards  { display: flex; }
  .page { padding: 16px 14px 14px; gap: 14px; }
  .page-title { font-size: 22px; }
  .btn-add { padding: 7px 12px; }
  .foot-stats { gap: 18px; }
  .stat-label { font-size: 9px; }
  .stat-val   { font-size: 12.5px; }
  .top-btn:first-child { display: none; }
}
 
@media (max-width: 480px) {
  .page { padding: 12px 10px 12px; gap: 12px; }
  .topbar { padding: 8px 12px; gap: 8px; }
  .search-wrap { padding: 7px 10px; }
  .page-title { font-size: 20px; }
  .page-sub   { font-size: 12px; }
  .tabs { gap: 4px; }
  .tab  { padding: 5px 12px; font-size: 12px; }
  .foot { padding: 11px 12px; }
  .foot-stats { gap: 14px; }
  .modal-body { padding: 14px 16px; }
  .modal-foot { padding: 10px 16px 16px; }
  .fg-row { flex-direction: column; }
  .m-card { padding: 12px; }
}
</style>
