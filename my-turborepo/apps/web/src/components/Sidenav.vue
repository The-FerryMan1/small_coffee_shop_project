<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const items = computed<NavigationMenuItem[][]>(() => [
    [
        {
            label: "Dashboard",
            icon: "i-lucide-house",
            to: { name: "dashboard" },
            active: route.path.startsWith("/dashboard")
        },
        {
            label: "Order",
            icon: "i-lucide-coffee",
            to: { name: "order" },
            active: route.path.startsWith("/order")
        },
    ]
])
</script>

<template>
    <UDashboardSidebar resizable collapsible open toggle-side="right">
        <template #header="{ collapsed }">
            <Logo v-if="!collapsed" />
            <span class="text-2xl font-bold" v-if="collapsed">C</span>
        </template>

        <UNavigationMenu :items="items[0]" orientation="vertical" />

    </UDashboardSideBar>
</template>