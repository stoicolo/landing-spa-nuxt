<!-- Menu.vue -->
<template>
    <nav class="menu" :class="{ 'menu-hidden': isHidden }">
      <div class="menu-container">
        <NuxtLink to="/" class="logo-container">
          <img :src="logoSrc" alt="Logo" class="logo" />
        </NuxtLink>
        <div class="hamburger" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="menu-items" :class="{ 'is-open': isMenuOpen }">
          <li v-for="item in menuItems" :key="item.slug">
            <NuxtLink v-if="!item.hidden" :to="'/' + item.slug" class="menu-link" @click="closeMenu">
              {{ item.menuName }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    menuItems: {
      type: Array,
      required: true
    },
    logoSrc: {
      type: String,
      required: true
    }
  });
  
  const isHidden = ref(false);
  const isMenuOpen = ref(false);
  let lastScrollPosition = 0;
  
  const handleScroll = () => {
    const currentScrollPosition = window.pageYOffset;
    if (currentScrollPosition < lastScrollPosition) {
      isHidden.value = false;
    } else if (currentScrollPosition > 50) {
      isHidden.value = true;
    }
    lastScrollPosition = currentScrollPosition;
  };
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const closeMenu = () => {
    isMenuOpen.value = false;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--primary-color);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }
  
  .menu-hidden {
    transform: translateY(-100%);
  }
  
  .menu-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo {
    height: 40px;
    width: auto;
  }
  
  .menu-items {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-weight: 500;
  }
  
  .menu-link {
    color: var(--text-color-contrast);
    text-decoration: none;
    padding: 0.5rem 1rem;
    position: relative;
    transition: color 0.3s ease;
  }
  
  .menu-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--accent-color);
    transition: width 0.3s ease-in-out;
  }
  
  .menu-link:hover::after {
    width: 100%;
  }
  
  .menu-link:not(:hover)::after {
    right: 0;
    left: auto;
    width: 0;
  }
  
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
  }
  
  .hamburger span {
    width: 2rem;
    height: 0.25rem;
    background: var(--text-color-contrast);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
  
  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }
  
    .menu-items {
      flex-direction: column;
      align-items: center;
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: 100%;
      background-color: var(--primary-color);
      padding-top: 5rem;
      transition: right 0.3s ease-in-out;
    }
  
    .menu-items.is-open {
      right: 0;
    }
  
    .menu-link {
      font-size: 1.5rem;
      margin: 1rem 0;
    }
  
    .hamburger.is-active span:nth-child(1) {
      transform: rotate(45deg);
    }
  
    .hamburger.is-active span:nth-child(2) {
      opacity: 0;
    }
  
    .hamburger.is-active span:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
  </style>