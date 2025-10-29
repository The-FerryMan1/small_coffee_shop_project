<script setup lang="ts">
import Foot from '@/components/Footer.vue';
import Nabvar from '@/components/Navbar.vue';


</script>

<template>
    <Nabvar />
    <UMain>
        <UContainer>
             <slot></slot>
        </UContainer>
    </UMain>
    <Foot/>

</template>