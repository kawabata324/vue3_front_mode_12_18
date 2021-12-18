<template>
  <div>{{ message }}</div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  setup() {
    const Url = "http://localhost:3013/hello";

    let message = ref("");
    onMounted(() => {
      axios
        .get(Url)
        .then((res) => (console.log(res.data)))
        .catch((e) => console.log(e));
    });
    return {
      message,
    };
  },
});
</script>

<style></style>
