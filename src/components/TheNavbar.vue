<template>
  <header class="header" id="header">
    <router-link :to="{ name: 'Home' }" class="logo">
      <img src="https://vueschool.io/img/logo/vueschool_logo_multicolor_negative.svg" alt="logo">
    </router-link>
    <div class="btn-hamburger">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>
    <div class="navbar">
      <ul v-if="user">
        <li class="navbar-user">
          <router-link :to="{ name: 'Profile' }">
            <img :src="user.avatar" :alt="user.name" class="avatar-small">
            <span>{{ user.name }}
              <i class="fa fa-caret-down"></i>
            </span>
          </router-link>
          <div id="user-dropdown">
            <div class="triangle-drop">
              <ul class="dropdown-menu">
                <li class="dropdown-menu-item">View profile</li>
                <li class="dropdown-menu-item">Log out</li>
              </ul>
            </div>
          </div>
        </li>
        <li class="navbar-item">
          <a @click.prevent="$store.dispatch('signOut')">Sign Out</a>
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

export default {
  name: 'TheNavbar',
  computed: {
    ...mapGetters({
      user: 'authUser',
    }),
  },
};
</script>
