<script setup lang="ts">
import Logo from './logo.vue';

</script>

<template>
    <header class="p-2.5">
        <!-- logo -->
        <section>
            <Logo/>
        </section>
        <!-- links -->
         <nav>
            <ul>
                <li>
                    <router-link :to="{name: 'home'}">Home</router-link>
                    <router-link :to="{name: 'register'}">Register</router-link>
                    <router-link :to="{name: 'login'}">Login</router-link>
                </li>
            </ul>
         </nav>
    </header>
</template>