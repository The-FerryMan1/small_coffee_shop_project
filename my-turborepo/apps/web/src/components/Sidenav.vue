<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"
import { computed } from "vue";
import { useRoute } from "vue-router";
import logoutModal from "./modal/logoutModal.vue";
import { useOverlay } from "@nuxt/ui/runtime/composables/useOverlay.js";
import { useAuthStore } from "@/stores/auth";

const overlay = useOverlay()
const modal = overlay.create(logoutModal)
const route = useRoute()
const auth = useAuthStore()
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
        {
            label: "Settings",
            icon: "i-lucide-settings",
            children: [
                {
                    label: "Logout",
                    onSelect: () => {
                        modal.open()
                    }
                }
            ]
        }
    ],
])


const managerItem = computed<NavigationMenuItem[][]>(() => [
    [
        {
            label: "Manager",
            icon: "i-lucide-house",
            to: { name: "manager" },
            active: route.path.startsWith("/manager")
        },
        {
            label: "Customers",
            icon: "i-lucide-circle-user-round",
            to: { name: "customer" },
            active: route.path.startsWith("/customer")
        },
        {
            label: "Orders",
            icon: "i-lucide-list-ordered",
            to: { name: "orders" },
            active: route.path.startsWith("/orders")
        },
        {
            label: "Invetory",
            icon: "i-lucide-coffee",
            to: { name: "stocks" },
            active: route.path.startsWith("/stocks")
        },


        {
            label: "Settings",
            icon: "i-lucide-settings",
            children: [
                {
                    label: "Logout",
                    onSelect: () => {
                        modal.open()
                    }
                }
            ]
        }
    ],
])

const selectedItems = computed(() => auth.user?.role === "manager" ? managerItem.value : items.value)
</script>

<template>
    <UDashboardSidebar resizable collapsible open toggle-side="right">
        <template #header="{ collapsed }">
            <Logo v-if="!collapsed" />
            <span class="text-2xl font-bold" v-if="collapsed">C</span>
        </template>

        <UNavigationMenu :items="selectedItems" orientation="vertical" />

    </UDashboardSideBar>
</template>