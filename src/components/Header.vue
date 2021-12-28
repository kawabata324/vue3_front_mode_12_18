<template>
  <div class="flex justify-between p-6">
    <div>
      <router-link to="/">
        <img src="../assets/logo.png" class="h-14" alt="" />
      </router-link>
    </div>
    <div>
      <button
        class="block h-12 w-12 rounded-full overflow-hidden focus:outline-none"
        @click="modalShow = !modalShow"
      >
        <img
          class="h-full w-full object-cover"
          src="../assets/default_user.png"
          alt="avatar"
        />
      </button>
      <div
        class="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl"
        v-if="modalShow"
      >
        <router-link
          to="/profile"
          @click="modalShow = false"
          class="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
          >Profile</router-link
        >
        <div class="py-2"></div>
        <a
          @click="clickLogout"
          class="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
        >
          Logout
        </a>
        <router-link
          to="/login"
          @click="modalShow = false"
          class="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
        >
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import Client from "../auth/client";
import {
  getAuthDataFromLocalStorage,
  removeAuthDataFromLocalStorage,
} from "../utils/auth-data";

export default defineComponent({
  setup() {
    const router = useRouter();
    const modalShow = ref(false);

    const clickLogout = async () => {
      await Client.delete("/v1/auth/sign_out", {
        headers: getAuthDataFromLocalStorage(),
      }).then(() => {
        removeAuthDataFromLocalStorage();
        modalShow.value = false
        router.push("/login");
      });
    };
    return {
      modalShow,
      clickLogout,
    };
  },
});
</script>

<style></style>
