<template>
  <div>
    <h1 class="text-red-500">Login</h1>
    <form @submit.prevent="userLogin">
      {{ errorMessage }}
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
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const url = "http://localhost:3013/v1/auth/sign_in";

    const user = reactive({
      email: "",
      password: "",
    });
    const errorMessage = ref("");

    const userLogin = () => {
      axios
        .post(url, user)
        .then((response) => {
          console.log(response);
          router.push("/");
        })
        .catch(
          () => (errorMessage.value = "パスワードかメールアドレスが違います")
        );
    };
    return {
      user,
      userLogin,
      errorMessage,
    };
  },
});
</script>

<style></style>
