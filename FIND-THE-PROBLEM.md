# Find The Problem - Step by Step

## The Issue

Console shows elements are NOT found:
- `menuToggle: false`
- `mobileMenu: false`

This means the HTML is either:
1. Not being loaded from navbar.html
2. Being loaded but not inserted correctly
3. Being inserted but removed/replaced by something else

---

## Step 1: Open Debug Page

```bash
# Open this file in your browser:
DEBUG-MENU.html
```

This page will show you:
- ✅ Which elements exist
- ✅ Where they are in the DOM
- ✅ What their IDs and classes are

**Click the buttons:**
1. "Check Elements Now" - Shows if elements exist
2. "Show All DIVs" - Lists all DIVs with IDs
3. "Search for Menu" - Searches for mobile menu in different ways

---

## Step 2: Check Console

After opening DEBUG-MENU.html, look at the console (F12) for:

### If you see:
```
📡 Fetch response for navbar.html: 200 true
📄 Received HTML for navbar.html, length: 6692
```
✅ **navbar.html is loading correctly**

### If you see:
```
📡 Fetch response for navbar.html: 404 false
```
❌ **navbar.html NOT found** - Check file path

### If you see:
```
Failed to load navbar.html
```
❌ **Fetch failed** - Check file exists at `pages/shared/navbar.html`

---

## Step 3: Check What's in the Page

In the debug panel (right side), you should see:

### Good Output:
```
=== CHECKING ELEMENTS ===
header: FOUND
menuToggle: FOUND
mobileMenu: FOUND
nav-menu: FOUND
```

### Bad Output:
```
=== CHECKING ELEMENTS ===
header: NOT FOUND
menuToggle: NOT FOUND
mobileMenu: NOT FOUND
```

---

## Step 4: Diagnose the Problem

### Problem A: navbar.html not loading
**Symptoms:**
- Console shows fetch error
- No "📄 Received HTML" message

**Solution:**
Check file exists:
```bash
# Should exist:
pages/shared/navbar.html
```

---

### Problem B: HTML loaded but elements not inserted
**Symptoms:**
- Console shows "📄 Received HTML"
- Console shows "✅ HTML inserted into DOM"
- But elements still NOT FOUND

**Solution:**
The HTML might be inserted in the wrong place. Check:
```javascript
// In Console:
document.querySelector('header')
// Should return the header element
```

---

### Problem C: Elements inserted but immediately removed
**Symptoms:**
- Console shows elements found initially
- Then shows NOT FOUND later

**Solution:**
Something else is removing/replacing the elements. Check:
1. Is there duplicate header.js loading?
2. Is there another script modifying the DOM?

---

## Step 5: Manual Test

Open Console (F12) and paste this:

```javascript
// Check if navbar.html exists
fetch('pages/shared/navbar.html')
  .then(r => r.text())
  .then(html => {
    console.log('✅ navbar.html loaded, length:', html.length);
    console.log('Contains menuToggle?', html.includes('id="menuToggle"'));
    console.log('Contains mobileMenu?', html.includes('id="mobileMenu"'));
    
    // Try to insert it manually
    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
      placeholder.insertAdjacentHTML('beforebegin', html);
      placeholder.remove();
      console.log('✅ Manually inserted');
      
      // Check if elements exist now
      setTimeout(() => {
        console.log('menuToggle:', document.getElementById('menuToggle'));
        console.log('mobileMenu:', document.getElementById('mobileMenu'));
      }, 100);
    } else {
      console.log('❌ Placeholder not found');
    }
  })
  .catch(e => console.error('❌ Error:', e));
```

---

## Step 6: Check File Paths

Make sure these files exist:

```
✓ pages/shared/navbar.html
✓ pages/shared/header.js
✓ pages/shared/header.css
✓ pages/index/index.html
```

Check in Console:
```javascript
// Should return 200
fetch('pages/shared/navbar.html').then(r => console.log(r.status));
```

---

## Step 7: Check for Conflicts

Look for:

1. **Duplicate script tags** in index.html:
```html
<!-- BAD: -->
<script src="../shared/header.js"></script>
<script src="../shared/header.js"></script>  ← Duplicate!
```

2. **Other scripts** that might interfere:
```html
<script src="index.js"></script>  ← Check this file
```

3. **CSS hiding elements**:
```css
/* Check if this exists: */
.mobile-menu { display: none !important; }  ← Might hide it
```

---

## What to Tell Me

After running DEBUG-MENU.html, tell me:

1. **What does the debug panel show?**
   - Are elements FOUND or NOT FOUND?

2. **What does the console show?**
   - Copy the first 20 lines

3. **What does "Show All DIVs" show?**
   - List the IDs you see

4. **Does the manual test work?**
   - Paste the manual test code and tell me the result

---

## Quick Checklist

- [ ] Opened DEBUG-MENU.html
- [ ] Clicked "Check Elements Now"
- [ ] Clicked "Show All DIVs"
- [ ] Clicked "Search for Menu"
- [ ] Checked Console for errors
- [ ] Ran manual test in Console
- [ ] Checked file paths
- [ ] Looked for duplicate scripts

---

**Once you do these steps, we'll know exactly where the problem is!**
