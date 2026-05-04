index.vue

<template>
  <div class="hero">
    
    <!-- Comentamos ProfileCard temporalmente -->
    <!-- <ProfileCard /> -->

    <div class="viewer-section">
      <ClientOnly>
        <LazyStlViewer />
      </ClientOnly>
    </div>

  </div>
</template>