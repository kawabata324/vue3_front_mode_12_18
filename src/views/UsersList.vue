<template>
  <div>
    <ul>
      ここにユーザーのリストを表示する
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  setup(){
    const url = "http://localhost:3013/v1/auth/sign_in";
    onMounted(()=>{
      axios.get(url).then(res => console.log(res))
    })
    return{

    }
  }
})
</script>

<style>

</style>
