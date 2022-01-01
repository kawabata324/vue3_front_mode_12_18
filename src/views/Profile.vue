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
          <div class="flex items-center justify-center gap-2">
            <h2 class="text-gray-800 text-3xl font-bold" v-show="!editNameRef">
              {{ user.name }}
            </h2>
            <input type="text" v-show="editNameRef" v-model="user.name" />
            <font-awesome-icon :icon="penIcon" @click="editName" />
          </div>
          <p class="mt-2 text-gray-600">
            <span v-show="!editSelfIntroductionRef">
              {{ user.selfIntroduction }}
            </span>
            <textarea
              v-show="editSelfIntroductionRef"
              v-model="user.selfIntroduction"
              rows="10"
              cols="50"
            ></textarea>
            <font-awesome-icon :icon="penIcon" @click="editSelfIntroduction" />
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

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "@vue/runtime-core";
import Client from "../auth/client";
import { getAuthDataFromLocalStorage } from "../utils/auth-data";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const router = useRouter();

    const user = reactive({
      name: "",
      image: "default_user",
      selfIntroduction: "",
    });

    const editNameRef = ref(false);
    const editSelfIntroductionRef = ref(false);

    const editName = async () => {
      if (editNameRef.value === true) {
        await Client.post(
          "/users/name",
          { name: user.name },
          {
            headers: getAuthDataFromLocalStorage(),
          }
        );
        editNameRef.value = false;
      } else if (editNameRef.value === false) {
        editNameRef.value = true;
      }
    };
    const editSelfIntroduction = async () => {
      if (editSelfIntroductionRef.value === true) {
        await Client.post(
          "/users/selfIntroduction",
          { selfIntroduction: user.selfIntroduction },
          {
            headers: getAuthDataFromLocalStorage(),
          }
        );
        editSelfIntroductionRef.value = false;
      } else if (editSelfIntroductionRef.value === false) {
        editSelfIntroductionRef.value = true;
      }
    };

    const penIcon = faPen;

    onMounted(async () => {
      await Client.get("/users/show", {
        headers: getAuthDataFromLocalStorage(),
      })
        .then((res) => {
          user.name = res.data.user.name;
          user.selfIntroduction = res.data.user.selfIntroduction;
          if (res.data.user.selfIntroduction === null) {
            user.selfIntroduction = "This is a sample text message.";
          }
          if (res.data.user.image === null) {
            user.image = "default_user";
          }
        })
        .catch((e) => {
          console.log(e);
          router.push("/login");
        });
    });
    return {
      user,
      penIcon,
      editNameRef,
      editName,
      editSelfIntroduction,
      editSelfIntroductionRef,
    };
  },
});
</script>

<style></style>
