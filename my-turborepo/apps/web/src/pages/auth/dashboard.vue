<script setup lang="ts">

import Authenticated from '@/layouts/authenticated.vue';
import { useAuthStore } from '@/stores/auth';


const auth = useAuthStore()
const test = async()=>{
    await auth.getUser()
}
</script>

<template>
    <Authenticated>
        <div>hello dashboaor</div>
        <UButton @click="test">{{ auth.user??"get user" }}</UButton>
    </Authenticated>
</template>