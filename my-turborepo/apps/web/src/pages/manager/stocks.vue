<script setup lang="ts">
import CreateProductFormModal from '@/components/modal/createProductFormModal.vue';
import { useProductStore } from '@/stores/product';
import type { FormSubmitEvent } from '@nuxt/ui';
import { useOverlay } from '@nuxt/ui/runtime/composables/useOverlay.js';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';
import { reactive, ref } from 'vue';
import z from 'zod';

const overlay = useOverlay()
const modal = overlay.create(CreateProductFormModal)
const toast = useToast()
const product = useProductStore()
const data = ref([

])

const schema = z.object({
    name: z.string().max(255),
    category: z.string().max(255),
    description: z.string().max(255),
    stock: z.number().min(1).nonnegative(),
    price: z.number().min(1).nonnegative()
})

type Schema = z.infer<typeof schema>

const state = reactive<Partial<Schema>>({
    name: undefined,
    category: undefined,
    description: undefined,
    stock: undefined,
    price: undefined
})




const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    try {
        await product.createProduct(event.data)
        toast.add({ title: "Create product", description: "Successfully created a new product", color: "success" })
    } catch (error) {

    }finally{
        Object.keys(state).forEach(key =>{
            state[key as keyof Schema] = undefined
        })
        modal.close()
    }
}

const open = async() => {
    const instance = modal.open({
        schema: schema,
        state:state,
        onSubmit: (event: FormSubmitEvent<Schema>) => onSubmit(event)
    })
}

</script>
<template>
    <UContainer>
        <h1 class="text-2xl font-bold mb-10">Inventory</h1>

       <UButton @click="open" icon="i-lucide-plus" label="Add new product" color="primary" variant="subtle" />
        <UTable sticky :data="data" class="flex-1 max-h-[312px]" />
    </UContainer>
</template>