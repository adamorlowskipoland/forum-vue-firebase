<template>
  <header class="header"
          id="header"
          v-click-outside="toggleMobileNavbar"
          v-handle-scroll="closeMobileNavbar">
    <router-link :to="{ name: 'Home' }" class="logo">
      <img src="https://vueschool.io/img/logo/vueschool_logo_multicolor_negative.svg" alt="logo">
    </router-link>
    <div class="btn-hamburger" @click="toggleMobileNavbar">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>
    <div class="navbar" :class="{'navbar-open': mobileNavOpen}">
      <ul v-if="user">
        <li class="navbar-user" v-click-outside="toggleMenuDropdown">
          <a @click.prevent="toggleMenuDropdown">
            <img :src="user.avatar" :alt="user.name" class="avatar-small">
            <span>{{ user.name }}
              <i class="fa fa-caret-down"></i>
            </span>
          </a>
          <div id="user-dropdown" :class="{'active-drop': userDropdownOpen}">
            <div class="triangle-drop">
              <ul class="dropdown-menu">
                <li class="dropdown-menu-item">
                  <router-link :to="{ name: 'Profile' }">View profile</router-link>
                </li>
                <li class="dropdown-menu-item">
                  <a @click.prevent="$store.dispatch('auth/signOut')">Sign Out</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="navbar-mobile-item">
          <router-link :to="{ name: 'Profile' }">View profile</router-link>
        </li>
        <li class="navbar-mobile-item">
          <a @click.prevent="$store.dispatch('auth/signOut')">Sign Out</a>
        </li>
      </ul>
      <ul v-else>
        <li class="navbar-item">
          <router-link :to="{name: 'SignIn'}">Sign In</router-link>
        </li>
        <li class="navbar-item">
          <router-link :to="{name: 'Register'}">Register</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import clickOutside from '@/directives/click-outside';
import handleScroll from '@/directives/handle-scroll';

export default {
  name: 'TheNavbar',
  directives: { clickOutside, handleScroll },
  computed: {
    ...mapGetters({
      user: 'auth/authUser',
    }),
  },
  data() {
    return {
      userDropdownOpen: false,
      mobileNavOpen: false,
    };
  },
  methods: {
    toggleMenuDropdown() {
      this.userDropdownOpen = !this.userDropdownOpen;
    },
    toggleMobileNavbar() {
      this.mobileNavOpen = !this.mobileNavOpen;
    },
    closeMobileNavbar() {
      this.mobileNavOpen = false;
    },
  },
};
</script>
