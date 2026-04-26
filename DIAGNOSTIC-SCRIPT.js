// Diagnostic Script - Paste this in Console to debug
// نسخ هذا الكود في Console للتشخيص

console.clear();
console.log('=== 🔍 Menu Toggle Diagnostic ===\n');

// Check if elements exist
const checks = {
    'navbar-placeholder': document.getElementById('navbar-placeholder'),
    'header': document.getElementById('header'),
    'menuToggle': document.getElementById('menuToggle'),
    'mobileMenu': document.getElementById('mobileMenu'),
    'mobileMenuClose': document.getElementById('mobileMenuClose'),
    'searchModal': document.getElementById('searchModal')
};

console.log('📋 Element Check:');
Object.entries(checks).forEach(([name, element]) => {
    const status = element ? '✅' : '❌';
    console.log(`${status} ${name}:`, element ? 'Found' : 'NOT FOUND');
});

// Check classes
console.log('\n🎨 Mobile Menu Classes:');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenu) {
    console.log('Classes:', mobileMenu.className);
    console.log('Display:', getComputedStyle(mobileMenu).display);
    console.log('Opacity:', getComputedStyle(mobileMenu).opacity);
    console.log('Z-index:', getComputedStyle(mobileMenu).zIndex);
} else {
    console.log('❌ Mobile menu not found');
}

// Check if inside header
console.log('\n📦 Structure Check:');
const header = document.getElementById('header');
if (header) {
    const menuInHeader = header.querySelector('#mobileMenu');
    console.log('Mobile menu inside header:', menuInHeader ? '✅ Yes' : '❌ No');
    console.log('Header children count:', header.querySelectorAll('*').length);
}

// Check window size
console.log('\n📱 Window Info:');
console.log('Width:', window.innerWidth + 'px');
console.log('Height:', window.innerHeight + 'px');
console.log('Should show mobile menu:', window.innerWidth <= 768 ? '✅ Yes' : '❌ No');

// Try to manually open menu
console.log('\n🧪 Manual Test:');
const menuToggle = document.getElementById('menuToggle');
if (menuToggle && mobileMenu) {
    console.log('✅ Both elements found - trying manual open...');
    
    // Add temporary click handler
    const testHandler = () => {
        console.log('🎯 Click detected!');
        mobileMenu.classList.add('active');
        menuToggle.classList.add('active');
        console.log('✅ Classes added');
        console.log('Mobile menu display:', getComputedStyle(mobileMenu).display);
        console.log('Mobile menu opacity:', getComputedStyle(mobileMenu).opacity);
    };
    
    menuToggle.addEventListener('click', testHandler);
    console.log('✅ Test handler attached - try clicking the button now');
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        menuToggle.removeEventListener('click', testHandler);
        console.log('⏰ Test handler removed');
    }, 10000);
} else {
    console.log('❌ Cannot test - elements not found');
}

console.log('\n=== End Diagnostic ===');
