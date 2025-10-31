<script setup lang="ts">
import Sidenav from '@/components/Sidenav.vue';
</script>

<template>
    <UDashboardGroup>
        <Sidenav />
        <UDashboardPanel>
            <template #header>

                <UDashboardNavbar title="Dashboard">
                    <template #leading>
                        <UDashboardSidebarCollapse />
                    </template>

                    <template #right>
                        <UUser class="me-2" name="John Doe" :avatar="{
                            icon: 'i-lucide-circle-user'
                        }" />
                       <UColorModeButton />
                        
                    </template>
                </UDashboardNavbar>
                <RouterView />
            </template>
        </UDashboardPanel>
    </UDashboardGroup>
</template>