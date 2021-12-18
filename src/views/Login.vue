<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="userLogin">
      <label for="email">email</label>
      <input type="email" id="email" v-model="user.email" />
      <label for="password">password</label>
      <input type="password" id="password" v-model="user.password" />
      <input type="submit" value="ログイン" />
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const url = "http://localhost:3013/v1/auth/sign_in";

    const user = reactive({
      email: "",
      password: "",
    });
    const userLogin = () => {
      axios
        .post(url, user)
        .then((response) => {
          console.log(response.data);
          user.email = "";
          user.password = "";
        })
        .catch((error) => console.log(error));
    };
    return {
      user,
      userLogin,
    };
  },
});
</script>

<style></style>
