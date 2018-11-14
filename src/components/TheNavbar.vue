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
      <ul>
        <li class="navbar-user">
          <router-link :to="{ name: 'Profile' }">
            <img :src="user.avatar" :alt="user.name" class="avatar-small">
            <span>{{ user.name }}
              <img src="../assets/imgs/avatar.jpg" alt="arrow right" class="icon-profile">
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
