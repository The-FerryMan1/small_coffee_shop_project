<script setup lang="ts">

</script>

<template>
    <header>
        <!-- logo -->
        <section>
            <h1>Coffee Shop </h1>
        </section>

        <nav>
            <ul>
                <li>
                   <NuxtLink :to="{name: 'register'}">Sign up</NuxtLink>
                </li>
                <li>
                   <NuxtLink :to="{name: 'login'}">Login</NuxtLink>
                </li>
                <li>
                   <NuxtLink :to="{name: 'about'}">About</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>    
</template>