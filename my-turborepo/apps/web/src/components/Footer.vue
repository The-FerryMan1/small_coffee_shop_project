<script setup lang="ts">
import {type NavigationMenuItem} from "@nuxt/ui"
import { computed } from "vue";
import Logo from "./logo.vue";

const items = computed<NavigationMenuItem[]>(()=>[
    {

    }
])
</script>

<template>
     <UFooter>
        <template #left>
            <Logo/>
        </template>
    </UFooter>
</template>