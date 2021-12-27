<template>
  <div
    class="h-screen bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center"
  >
    <div
      class="container bg-white shadow-lg transform duration-200 easy-in-out"
    >
      <div class="h-32 overflow-hidden">
        <img
          class="w-full"
          src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt=""
        />
      </div>
      <div class="flex justify-center px-5 -mt-12">
        <img
          class="h-32 w-32 bg-white p-2 rounded-full"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt=""
        />
      </div>
      <div class=" ">
        <div class="text-center px-14">
          <h2 class="text-gray-800 text-3xl font-bold">{{ nameRef }}</h2>
          <p class="mt-2 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
        <hr class="mt-6" />
        <div class="flex bg-gray-50">
          <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
            <p><span class="font-semibold">2.5 k </span> Followers</p>
          </div>
          <div class="border"></div>
          <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
            <p><span class="font-semibold">2.0 k </span> Following</p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    const nameRef = ref("");

    console.log(`${uid}, ${accessToken}, ${client}`);
    onMounted(async () => {
      await axios
        .get(Url, {
          headers: { uid: uid, accessToken: accessToken, client: client },
        })
        .then((res) => {
          console.log(res.data);
          nameRef.value = res.data.user.name;
        })
        .catch((e) => console.log(e));
    });
    return {
      nameRef,
    };
  },
});
</script>

<style></style>
