<script setup lang="ts">
defineProps<{ type: string }>()
</script>

<template>
  <span class="type-badge" :style="{ '--type-color': `var(--type-${type}, var(--text-muted))` }">
    {{ type }}
  </span>
</template>

<style scoped>
.type-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-sm);
  line-height: 1.4;
  color: #fff;
  background-color: var(--type-color);
  text-shadow: 1px 1px 0 rgb(0 0 0 / 0.4);
  text-transform: capitalize;
}
</style>
