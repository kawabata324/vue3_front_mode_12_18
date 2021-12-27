<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        新規登録
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="userRegister">
          {{ errorMessage }}
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                v-model="user.email"
                autocomplete="email"
                required="true"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                v-model="user.password"
                autocomplete="current-password"
                required=""
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const url = "http://localhost:3013/v1/auth";
    const router = useRouter();

    const user = reactive({
      email: "",
      password: "",
    });
    const userRegister = () => {
      axios
        .post(url, user)
        .then((response) => {
          console.log(response);
          localStorage.setItem(
            "mp-access-token",
            response.headers["access-token"]
          );
          localStorage.setItem("mp-client", response.headers["client"]);
          localStorage.setItem("mp-uid", response.headers["uid"]);
          router.push("/");
        })
        .catch((error) => console.log(error));
    };
    return {
      user,
      userRegister,
    };
  },
});
</script>

<style></style>
