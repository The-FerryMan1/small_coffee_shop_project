<script setup lang="ts">

import Authenticated from '@/layouts/authenticated.vue';
import { useAuthStore } from '@/stores/auth';


const {getUser, user} = useAuthStore()
const test = async()=>{
    await getUser()
}
</script>

<template>
    <Authenticated>
        <div>hello dashboaor</div>
        <UButton @click="test">{{ user??"get user" }}</UButton>
    </Authenticated>
</template>