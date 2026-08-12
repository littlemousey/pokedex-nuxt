<template>
  <div class="app-shell">
    <a class="skip-link nes-btn is-primary" href="#main">Skip to content</a>
    <main id="main" tabindex="-1">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

main:focus {
  outline: none;
}

.skip-link {
  position: absolute;
  left: var(--space-4);
  top: var(--space-4);
  z-index: 10;
  transform: translateY(-200%);
}

.skip-link:focus-visible {
  transform: translateY(0);
}
</style>
