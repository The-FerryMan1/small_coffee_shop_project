<script setup lang="ts">

import { ref } from 'vue';

const plans = ref([
     {
        title: "Americano",
        description: "An espresso shot diluted with hot water.",
        badge: "Most popular",
        price: "₱60.00",
        highlight: true
    },
    {
        title: "Espresso",
        description: "A concentrated coffee brewed by forcing hot water through finely-ground beans.",
        price: "₱50.00",
       
    },
      {
        title: "Latte",
        description: "Espresso with a large amount of steamed milk and a small layer of foam.",
        price: "₱55.00",
       
    },
   
])

const links = ref([
   {
    label: 'Check our coffee',
    to: '/coffee',
    icon: 'i-lucide-coffee',
  },
])
</script>

<template>
    <UPageSection :links  headline="Top ordered coffee" title="Choose your favorite coffee" description="Here is the top ordered coffee in our shop">
         <UPricingPlans :plans />
    </UPageSection>
   
</template>