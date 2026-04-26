# شرح زر القائمة (menuToggle) - Menu Toggle Button Explained

## 🎯 الوظيفة الأساسية | Main Function

زر `menuToggle` هو **زر الهامبرغر** (☰) الذي يفتح القائمة المنسدلة على الأجهزة المحمولة.

The `menuToggle` is the **hamburger button** (☰) that opens the mobile menu on mobile devices.

---

## 📍 موقع الزر | Button Location

```html
<!-- في navbar.html -->
<div class="nav-left">
  <button class="nav-icon-btn search-btn" id="searchToggle">🔍</button>
  <select class="lang-select" id="languageSelect">...</select>
  <a href="../contact/contact.html" class="contact-btn">تواصل معنا</a>
  
  <!-- هنا الزر | Here is the button -->
  <button class="nav-icon-btn menu-btn" id="menuToggle" aria-label="Menu" title="القائمة">
    <span class="menu-line"></span>
    <span class="menu-line"></span>
    <span class="menu-line"></span>
  </button>
</div>
```

### الشكل البصري | Visual Appearance
```
┌─────────────────────────────────────────┐
│  [🔍] [العربية ▼] [تواصل معنا] [☰]    │  ← Header
└─────────────────────────────────────────┘
                                    ↑
                              menuToggle button
```

---

## 🔄 آلية العمل الكاملة | Complete Working Mechanism

### 1️⃣ الحالة الأولية (مغلق) | Initial State (Closed)

```javascript
// الحالة الافتراضية
mobileMenu.classList = []           // No 'active' class
menuToggle.classList = []           // No 'active' class
document.body.style.overflow = ''   // Scrolling enabled
```

**الشكل**:
```
☰  ← Three horizontal lines (hamburger icon)
```

---

### 2️⃣ عند الضغط على الزر | When Button is Clicked

```javascript
menuToggle.addEventListener('click', () => {
  // Step 1: Show mobile menu
  mobileMenu.classList.add('active');
  
  // Step 2: Animate button to X
  menuToggle.classList.add('active');
  
  // Step 3: Lock body scroll
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  
  // Step 4: Save scroll position
  document.body.style.top = `-${window.scrollY}px`;
});
```

**ما يحدث بالتفصيل**:

#### أ) إظهار القائمة المنسدلة
```css
/* Before */
.mobile-menu {
  display: none;
  opacity: 0;
}

/* After adding 'active' class */
.mobile-menu.active {
  display: block;
  opacity: 1;
}
```

#### ب) تحويل الزر إلى X
```css
/* Before: ☰ */
.menu-line {
  transform: none;
  opacity: 1;
}

/* After: ✕ */
.menu-btn.active .menu-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.menu-btn.active .menu-line:nth-child(2) {
  opacity: 0;  /* الخط الأوسط يختفي */
}
.menu-btn.active .menu-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}
```

**الشكل**:
```
Before:  ☰        After:  ✕
         ─                 ╲
         ─                  ╳
         ─                 ╱
```

#### ج) قفل التمرير (Scroll Lock)
```javascript
// حفظ موضع التمرير الحالي
const currentScroll = window.scrollY; // مثال: 500px

// تثبيت الصفحة
document.body.style.position = 'fixed';
document.body.style.width = '100%';
document.body.style.top = '-500px';  // يحافظ على الموضع البصري
document.body.style.overflow = 'hidden';
```

**لماذا؟**
- لمنع المستخدم من التمرير في الخلفية
- للحفاظ على موضع التمرير عند إغلاق القائمة

---

### 3️⃣ القائمة المفتوحة | Menu Open State

```
┌─────────────────────────────────────────┐
│  [🔍] [العربية ▼] [تواصل معنا] [✕]    │  ← Header (button is now X)
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│                                         │
│  ✕  (Close button)                      │
│  ─────────────────────────────────────  │
│  من نحن                          ▶      │
│    • عن نماء المدن                      │
│    • الإدارة                            │
│  ─────────────────────────────────────  │
│  الخدمات                                │
│  ─────────────────────────────────────  │
│  المشاريع                               │
│  ─────────────────────────────────────  │
│  الإعلام والأخبار                      │
│  ─────────────────────────────────────  │
│  الوظائف                                │
│  ─────────────────────────────────────  │
│                                         │
│  [العربية ▼]                            │
│  [تواصل معنا]                           │
│                                         │
└─────────────────────────────────────────┘
     ↑ Full-screen mobile menu
```

---

### 4️⃣ إغلاق القائمة | Closing the Menu

هناك **4 طرق** لإغلاق القائمة:

#### الطريقة 1: الضغط على زر X في الهيدر
```javascript
menuToggle.addEventListener('click', () => {
  closeMobileMenu();
});
```

#### الطريقة 2: الضغط على زر الإغلاق داخل القائمة
```javascript
mobileMenuClose.addEventListener('click', () => {
  closeMobileMenu();
});
```

#### الطريقة 3: الضغط على أي رابط في القائمة
```javascript
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});
```

#### الطريقة 4: تكبير الشاشة (Resize to Desktop)
```javascript
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});
```

---

### 5️⃣ وظيفة الإغلاق | Close Function

```javascript
function closeMobileMenu() {
  // Step 1: Hide mobile menu
  mobileMenu.classList.remove('active');
  
  // Step 2: Reset button to hamburger icon
  menuToggle.classList.remove('active');
  
  // Step 3: Get saved scroll position
  const scrollY = document.body.style.top;  // مثال: "-500px"
  
  // Step 4: Unlock body scroll
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  
  // Step 5: Restore scroll position
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    // parseInt("-500px") = -500
    // -500 * -1 = 500
    // scrollTo(0, 500) ← يرجع للموضع الأصلي
  }
}
```

**ما يحدث**:
1. القائمة تختفي (fade out)
2. الزر يرجع لشكل ☰
3. التمرير يُفتح مرة أخرى
4. الصفحة ترجع لموضع التمرير الأصلي

---

## 🎨 التأثيرات البصرية | Visual Effects

### Animation Timeline

```
User clicks menuToggle
        ↓
┌───────────────────────────────────────┐
│ 0ms:   Button clicked                 │
│ 50ms:  Button starts rotating         │
│ 100ms: Menu starts fading in          │
│ 200ms: Menu fully visible             │
│ 300ms: Button fully transformed to X  │
└───────────────────────────────────────┘
```

### CSS Transitions

```css
/* Button animation */
.menu-line {
  transition: all 0.3s ease;
}

/* Menu animation */
.mobile-menu {
  transition: opacity 0.3s ease;
}
```

---

## 📱 السلوك على الأجهزة المختلفة | Behavior on Different Devices

### Desktop (> 768px)
```
┌─────────────────────────────────────────────────────────┐
│  نماء المدن │ من نحن  المشاريع  الخدمات  [تواصل معنا]  │
└─────────────────────────────────────────────────────────┘
```
- ❌ الزر **مخفي** (display: none)
- ✅ القائمة الأفقية ظاهرة

### Tablet/Mobile (≤ 768px)
```
┌─────────────────────────────────────────┐
│  نماء المدن              [🔍] [☰]      │
└─────────────────────────────────────────┘
```
- ✅ الزر **ظاهر**
- ❌ القائمة الأفقية مخفية

---

## 🔍 تفاصيل تقنية إضافية | Additional Technical Details

### 1. Scroll Lock Implementation

**المشكلة**: عند فتح القائمة، المستخدم يمكنه التمرير في الخلفية

**الحل**:
```javascript
// Lock scroll
document.body.style.position = 'fixed';
document.body.style.top = `-${window.scrollY}px`;
document.body.style.width = '100%';
document.body.style.overflow = 'hidden';
```

**كيف يعمل**:
1. `position: fixed` - يثبت الـ body
2. `top: -500px` - يحافظ على الموضع البصري
3. `width: 100%` - يمنع تغيير العرض
4. `overflow: hidden` - يخفي scrollbar

### 2. Scroll Position Restoration

**المشكلة**: عند الإغلاق، الصفحة ترجع للأعلى

**الحل**:
```javascript
// Save position
const scrollY = document.body.style.top; // "-500px"

// Restore position
window.scrollTo(0, parseInt(scrollY || '0') * -1); // scrollTo(0, 500)
```

### 3. Button State Synchronization

```javascript
// Both elements get 'active' class
mobileMenu.classList.add('active');
menuToggle.classList.add('active');

// Both elements lose 'active' class
mobileMenu.classList.remove('active');
menuToggle.classList.remove('active');
```

**لماذا؟** للحفاظ على التزامن بين حالة الزر وحالة القائمة

---

## 🎯 حالات الاستخدام | Use Cases

### Case 1: المستخدم يفتح القائمة ويختار رابط
```
1. Click menuToggle → Menu opens
2. Click "المشاريع" → Menu closes + Navigate to projects page
```

### Case 2: المستخدم يفتح القائمة ثم يغير رأيه
```
1. Click menuToggle → Menu opens
2. Click menuToggle again → Menu closes
```

### Case 3: المستخدم يفتح القائمة على موبايل ثم يدور الشاشة
```
1. Portrait mode → Click menuToggle → Menu opens
2. Rotate to landscape (width > 768px) → Menu auto-closes
```

### Case 4: المستخدم يفتح القائمة ثم يضغط زر الإغلاق الداخلي
```
1. Click menuToggle → Menu opens
2. Click mobileMenuClose (✕ inside menu) → Menu closes
```

---

## 🐛 المشاكل الشائعة وحلولها | Common Issues & Solutions

### Problem 1: الزر لا يعمل
```javascript
// Check if elements exist
console.log(menuToggle);  // Should not be null
console.log(mobileMenu);  // Should not be null

// Check if event listener is attached
menuToggle.onclick = () => console.log('Clicked!');
```

### Problem 2: القائمة لا تظهر
```css
/* Check CSS */
.mobile-menu.active {
  display: block !important;
  opacity: 1 !important;
}
```

### Problem 3: الزر لا يتحول إلى X
```css
/* Check if 'active' class is added */
.menu-btn.active .menu-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px) !important;
}
```

### Problem 4: التمرير لا يُقفل
```javascript
// Check body styles
console.log(document.body.style.overflow);    // Should be 'hidden'
console.log(document.body.style.position);    // Should be 'fixed'
```

---

## 📊 Flow Chart | مخطط التدفق

```
                    [User on Mobile]
                           |
                           ↓
                  [Clicks menuToggle]
                           |
                           ↓
        ┌──────────────────┴──────────────────┐
        |                                     |
        ↓                                     ↓
[Add 'active' class]              [Lock body scroll]
        |                                     |
        ↓                                     ↓
[Button → X icon]                  [Save scroll position]
        |                                     |
        └──────────────────┬──────────────────┘
                           ↓
                  [Menu is now open]
                           |
        ┌──────────────────┼──────────────────┐
        |                  |                  |
        ↓                  ↓                  ↓
  [Click X]        [Click link]      [Resize > 768px]
        |                  |                  |
        └──────────────────┴──────────────────┘
                           ↓
                  [closeMobileMenu()]
                           |
        ┌──────────────────┴──────────────────┐
        |                                     |
        ↓                                     ↓
[Remove 'active']                  [Unlock scroll]
        |                                     |
        ↓                                     ↓
[X → ☰ icon]                      [Restore position]
        |                                     |
        └──────────────────┬──────────────────┘
                           ↓
                  [Menu is now closed]
```

---

## 🎓 الخلاصة | Summary

### الوظيفة الأساسية
```
menuToggle = زر الهامبرغر (☰) الذي:
1. يفتح القائمة المنسدلة على الموبايل
2. يتحول إلى X عند الفتح
3. يقفل التمرير في الخلفية
4. يحفظ موضع التمرير
5. يرجع لشكله الأصلي عند الإغلاق
```

### الأحداث المرتبطة
- ✅ Click event
- ✅ Resize event
- ✅ Link click events
- ✅ Close button click

### التأثيرات
- ✅ CSS transitions (0.3s)
- ✅ Class toggling
- ✅ Scroll lock/unlock
- ✅ Icon transformation

---

**تاريخ الشرح**: 2025
**المحلل**: Kiro AI Assistant
**الحالة**: ✅ Complete & Detailed
