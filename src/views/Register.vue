<template>
  <div>
    <h1>新規登録</h1>
    <form @submit.prevent="userRegister">
      <label for="email">email</label>
      <input type="email" id="email" v-model="user.email" />
      <label for="password">password</label>
      <input type="password" id="password" v-model="user.password" />
      <input type="submit" value="新規登録" />
    </form>
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
