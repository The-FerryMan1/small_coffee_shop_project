<script setup lang="ts">
import  {type NavigationMenuItem} from "@nuxt/ui"
import { useRoute } from 'vue-router';
import Logo from './logo.vue';
import { computed } from "vue";


const route = useRoute()
const items = computed<NavigationMenuItem[]>(()=>[
    {
        label: "Coffee",
        to: {name:"coffee"},
        active: route.path.startsWith("/coffee")
    },
    
    {
        label: "Register",
        to: {name: "register"},
        active: route.path.startsWith("/register"),
    },
    {
        label: "Login",
        to: {name: "login"},
        active: route.path.startsWith("/login")
    },

])
</script>

<template>
   <UHeader>
    <template #title>
        <Logo/>
    </template>
    
    <UNavigationMenu :items="items"/>
    
     <template #right>
       
    </template>

    <template #body> 
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>


   </UHeader>

</template>