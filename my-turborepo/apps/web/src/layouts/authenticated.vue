<script setup lang="ts">
import Sidenav from '@/components/Sidenav.vue';
import { useAuthStore } from '@/stores/auth';


const auth = useAuthStore()
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
                        <UUser class="me-2" :name="`${auth.user?.firstName} ${auth.user?.lastName}`" :avatar="{
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