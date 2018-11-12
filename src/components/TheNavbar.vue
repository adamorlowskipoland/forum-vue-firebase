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
          <a href="#">
            <img src="../assets/imgs/avatar.jpg" alt="avatar" class="avatar-small">
            <span>Alex Kyriakidis
              <img src="../assets/imgs/avatar.jpg" alt="arrow right" class="icon-profile">
            </span>
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheNavbar',
};
</script>
