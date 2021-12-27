<template>
  <div>{{ messageRef }}</div>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  setup() {
    const Url = "http://localhost:3013/users/show";
    const uid = localStorage.getItem("mp-uid");
    const accessToken = localStorage.getItem("mp-access-token");
    const client = localStorage.getItem("mp-client");
    const messageRef = ref("");

    console.log(`${uid}, ${accessToken}, ${client}`);
    onMounted(async () => {
      await axios
        .get(Url, {
          headers: { uid: uid, accessToken: accessToken, client: client },
        })
        .then((res) => {
          console.log(res.data);
          const email = res.data.user.email;
          messageRef.value = `Welcome to ${email}`;
        })
        .catch((e) => console.log(e));
    });
    return {
      messageRef,
    };
  },
});
</script>

<style></style>
