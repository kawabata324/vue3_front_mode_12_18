<template>
  <div>
    <ul v-for="user in users" :key="user.id">
      <li>id:{{ user.id }} {{ user.email }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "@vue/runtime-core";
import axios from "axios";

interface User {
  allow_password_change: boolean;
  created_at: Date;
  email: string;
  id: number;
  image?: string;
  name?: string;
  nickname?: string;
  provider: string;
  uid: string;
  updated_at: Date;
}
export default defineComponent({
  setup() {
    const users: User[] = reactive([]);
    const url = "http://localhost:3013/hello";
    onMounted(async () => {
      await axios.get(url).then((res) =>
        res.data.users.forEach((element: User) => {
          users.push(element);
        })
      );
    });
    return {
      users,
    };
  },
});
</script>

<style></style>
