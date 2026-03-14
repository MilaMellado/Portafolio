<template>
  <div>
    <div class="container"></div>

    <nav class="menu-flotante">
      <ColorModeButton /> 
    </nav>

    <NuxtPage />
  </div>
</template>

<style scoped>
.menu-flotante {
  position: relative;
  z-index: 9999;
  padding: 20px 40px;
  display: flex;
  justify-content: flex-end;
}
</style>