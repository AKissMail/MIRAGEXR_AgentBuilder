<template>
  <header class="app-header">
    <div class="branding">
      <h1>Mirage XR Agent Builder</h1>
    </div>
    <div class="burger-menu" v-if="showBurgerButton" @click="toggleMenu">
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
    </div>
    <nav :class="{ open: isMenuOpen }">
      <router-link v-if="showHomeButton" to="/dashboard" @click="closeMenu">
        <button>Home</button>
      </router-link>
      <button v-if="showLogoutButton" @click="logout">Logout</button>
      <button v-if="isMenuOpen" @click="closeMenu">Close</button>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    showHomeButton() {
      const {currentPath} = this;
      return currentPath !== '/dashboard' && currentPath !== '/';
    },
    showLogoutButton() {
      return this.currentPath === '/dashboard';
    },
    showBurgerButton() {
      return this.currentPath !== '/';
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    logout() {
      localStorage.clear();
      this.$router.push('/');
      this.closeMenu();
    }
  }
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #040b3b;
  color: #ffffff;
}

.branding h1 {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  font-size: 1.5em;
}

nav {
  display: flex;
  align-items: center;
}

nav button {
  margin-left: 1em;
  padding: 0.5em 1em;
  font-size: 1em;
  background-color: #060d3a;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

nav button:hover {
  background-color: #40dbf4;
}

.burger-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 24px;
  justify-content: space-around;
}

.burger-menu span {
  width: 100%;
  height: 3px;
  background-color: #ffffff;
  transition: all 0.4s;
}

.burger-menu span.open:nth-child(1) {
  transform: rotate(45deg);
  transform-origin: 5px 5px;
}

.burger-menu span.open:nth-child(2) {
  opacity: 0;
}

.burger-menu span.open:nth-child(3) {
  transform: rotate(-45deg);
  transform-origin: 5px -5px;
}

@media (max-width: 800px) {
  .burger-menu {
    display: flex;
  }

  nav {
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(55, 54, 54, 0.85);
    width: 100%;
    height: 100%;
    display: none;
    padding: 1em;
  }

  nav.open {
    display: flex;
  }

  nav button {
    width: 100%;
    text-align: center;
    margin-left: 0;
    padding: 10px 20px;
    border-top: 1px solid #ddd;
  }

  nav button:hover {
    background-color: #11aec7;
  }
}
</style>
