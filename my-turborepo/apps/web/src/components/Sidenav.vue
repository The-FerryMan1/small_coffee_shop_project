<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const items = computed<NavigationMenuItem[][]>(() => [
    [
        {
            label: "dashboard",
            icon: "i-lucide-house",
            to: { name: "dashboard" },
            active: route.path.startsWith("/dashboard")
        }
    ]
])
</script>

<template>
    <UDashboardSidebar open toggle-side="right">
        <template #header>
            <Logo class="h-5 w-auto" />
        </template>

        <UNavigationMenu :items="items[0]" orientation="vertical" />

    </UDashboardSideBar>
</template>