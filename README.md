# 🇱🇰 LankaExplore — Sri Lanka Tourism Platform

**One Island. Endless Experiences.**

LankaExplore is a full-stack, production-grade Sri Lanka tourism web application. Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **MongoDB Atlas / Mongoose**, **Framer Motion**, and **Lucide React**.

---

## 🌟 Highlights & Features

1. **Editorial & Cinematic Design**
   - Headings in **Playfair Display**, body in **Inter**.
   - Custom palette: Primary Deep Teal (`#0F766E`), Warm Amber (`#F59E0B`), Forest Slate (`#12312F`), Pearl Off-white (`#F8FAF9`).
   - Sticky responsive navbar with scroll-sensing backdrop blur and mobile drawer menu.

2. **Full Dynamic Content Architecture**
   - **Popular Destinations**: Ella, Sigiriya, Kandy, Galle Fort, Mirissa, Yala, Nuwara Eliya, Arugam Bay, Anuradhapura, Trincomalee.
   - **Signature Experiences**: Highland Blue Train Ride, Yala Safari, Surfing, Peak Climbing, Cultural & Culinary Tours.
   - **Interactive Sri Lanka Atlas Map**: Coordinate-driven destination markers, interactive previews, category filters.
   - **Curated Multi-Day Itineraries**: 7 Days Classic Wonders & 10 Days Island Odyssey with day-by-day maps and activities.
   - **Festivals & Events**: Kandy Esala Perahera, Galle Literary Festival, Vesak Festival of Lights, Surf Championship.
   - **Accommodation**: Ceylon Tea Trails, Heritance Kandalama, Jetwing Lighthouse, 98 Acres Resort.
   - **Travel Stories & Guides**: Rich editorial articles with reading time and author profiles.

3. **User Authentication & Interaction**
   - Register, Login, Logout with bcryptjs password hashing and JWT cookies.
   - Live Destination Reviews submission with real-time rating calculation.
   - Saved Destinations & Wishlist with persistent guest and user state.

4. **Full Admin Management CMS (`/admin`)**
   - Comprehensive statistics & metrics dashboard.
   - Destination CRUD with coordinates, images, tags, attractions, and activities.
   - Experience CRUD, Festival Event CRUD, Travel Story editor, and Review moderation.
   - One-click MongoDB seed/reset trigger (`/api/seed`).

5. **Trip Planning Essentials (`/plan-your-trip`)**
   - Visa ETA requirements & guidelines.
   - Dual Monsoon & weather breakdown for optimal regional travel seasons.
   - Train booking tips and local transit etiquette.
   - 24/7 Official Sri Lanka Tourist Police hotline (1912).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
