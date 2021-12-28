<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
import Header  from "./components/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    return {};
  },
});
</script>
<style></style>
