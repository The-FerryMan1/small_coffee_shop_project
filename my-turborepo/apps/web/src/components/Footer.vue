<script setup lang="ts">
import { type NavigationMenuItem } from "@nuxt/ui"
import { computed } from "vue";
import Logo from "./logo.vue";
import { useRoute } from "vue-router";

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: "Coffee",
        to: { name: "coffee" },
        active: route.path.startsWith("/coffee")
    },

    {
        label: "Register",
        to: { name: "register" },
        active: route.path.startsWith("/register"),
    },
    {
        label: "Login",
        to: { name: "login" },
        active: route.path.startsWith("/login")
    },
])
</script>

<template>
    <UFooter>
        <template #left>
            <Logo />
        </template>
        <UNavigationMenu :items="items" />

        <template #right>

        </template>

        <template #body>
            <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
        </template>
    </UFooter>
</template>