<template>
  <div class="min-h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="space-y-5">
      <Title />
      <Filter_Order />
      <Table_Order />
    </div>
  </div>
</template>

<script setup>
import Filter_Order from './Filter_Order.vue';
import Table_Order from './Table_Order.vue';
import Title from './Title.vue';

</script>

<style>

</style>
