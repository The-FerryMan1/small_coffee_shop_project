<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';


const auth = useAuthStore()
const test = async () => {
    await auth.getUser()
}
</script>

<template>

    <UDashboardPanel class="p-7">
        <div>hello dashboaor</div>
        <UButton @click="test">{{ auth.user ?? "get user" }}</UButton>
    </UDashboardPanel>

</template>