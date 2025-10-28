<script setup lang="ts">
import Logo from '@/components/logo.vue';
import Nabvar from '@/components/Navbar.vue';


</script>

<template>
     <Nabvar/>
    <main>
        <slot></slot>
         
    </main>
</template>