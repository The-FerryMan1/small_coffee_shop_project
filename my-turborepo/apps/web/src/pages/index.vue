<script setup lang="ts">
import Default from '@/layouts/default.vue';
import { ref } from 'vue';

const title = "Coffeeshhh"
const description = "The official app for Coffeeshhh. Order, Pay, Pick up, but don't run. View our daily specials. Fast, Fresh and Friendly."
const links = ref([
    {
        label: "Create an account",
        to: "/login",
        icon: "i-lucide-log-in",
        color: "primary",
    },
    {
        label: "View Coffee",
        to: "/coffee",
        icon: "i-lucide-coffee",
        color: "neutral",
        trailingIcon: 'i-lucide-arrow-right'
    }
])
</script>

<template>
    <Default>
        <UPageHero :title :description :links/>
    </Default>
</template>