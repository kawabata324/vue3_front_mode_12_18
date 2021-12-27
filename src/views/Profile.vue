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
          :src="require(`../assets/${user.image}.png`)"
          alt=""
        />
      </div>
      <div class=" ">
        <div class="text-center px-14">
          <h2 class="text-gray-800 text-3xl font-bold">{{ user.name }}</h2>
          <p class="mt-2 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
        <hr class="mt-6" />
        <div class="flex bg-gray-50">
          <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
            <p><span class="font-semibold">0.0 k </span> Followers</p>
          </div>
          <div class="border"></div>
          <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
            <p><span class="font-semibold">0.0 k </span> Following</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "@vue/runtime-core";
import Client from "../auth/client";

export default defineComponent({
  setup() {
    const Url = "http://localhost:3013/users/show";
    const uid = localStorage.getItem("mp-uid");
    const accessToken = localStorage.getItem("mp-access-token");
    const client = localStorage.getItem("mp-client");
    const expiry = localStorage.getItem("mp-expiry");
    const tokenType = localStorage.getItem("mp-token-type");
    const user = reactive({
      name: "",
      image: "default_user",
    });

    onMounted(async () => {
      await Client.get("/users/show", {
        headers: {
          uid: uid,
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          "token-type": tokenType,
        },
      })
        .then((res) => {
          console.log(res);
          user.name = res.data.user.name;
          if (res.data.user.image === null) {
            user.image = "default_user";
          }
        })
        .catch((e) => console.log(e));
    });
    return {
      user,
    };
  },
});
</script>

<style></style>
