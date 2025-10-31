<script setup lang="ts">
import { type NavigationMenuItem } from "@nuxt/ui"
import { useRoute } from 'vue-router';
import Logo from './logo.vue';
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import logoutModal from "./modal/logoutModal.vue";
import { useOverlay } from "@nuxt/ui/runtime/composables/useOverlay.js";



const overlay = useOverlay()
const overlayModal = overlay.create(logoutModal)
const auth = useAuthStore()
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

const authItem = computed<NavigationMenuItem[]>(() => [
    {
        label: "Dashboard",
        to: { name: "dashboard" },
        active: route.path.startsWith("/dashboard")
    }, {
        label: "Logout",
        onSelect: () => {
            overlayModal.open()
        }
    }
])


const navLink = computed<NavigationMenuItem[]>(() => auth.isAuthenticated ? authItem.value : items.value)



</script>

<template>


    <UHeader>

        <template #title>
            <Logo />
        </template>
        
        <UNavigationMenu :items="navLink" />
       
        <template #right>
           <UColorModeButton />
        </template>

        <template #body>
            <UNavigationMenu :items="navLink" orientation="vertical" class="-mx-2.5" />
        </template>


    </UHeader>

</template>