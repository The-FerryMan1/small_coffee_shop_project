<script setup lang="ts">
import Sidenav from '@/components/Sidenav.vue';


</script>

<template>
    <UDashboardGroup>
        <Sidenav />
        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar title="Dashboard" />
                <slot></slot>
            </template>
        </UDashboardPanel>
    </UDashboardGroup>
</template>