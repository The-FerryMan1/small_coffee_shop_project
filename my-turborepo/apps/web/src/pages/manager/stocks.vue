<script setup lang="ts">
import { useProductStore } from '@/stores/product';
import type { FormSubmitEvent } from '@nuxt/ui';
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js';
import { reactive, ref } from 'vue';
import z from 'zod';


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
   } catch (error) {
    
   }
}

</script>
<template>
    <UContainer>
        <h1 class="text-2xl font-bold mb-10">Inventory</h1>


        <div class="flex justify-end mb-5">
            <UModal title="Add new product">
                <UButton icon="i-lucide-plus" label="Add new product" color="primary" variant="subtle" />

                <template #body>

                    <UForm :schema="schema" :state="state" @submit="onSubmit">


                        <UFormField label="Name" name="name" required>
                            <UInput v-model="state.name" placeholder="Enter the product name" />
                        </UFormField>

                        <UFormField label="Category" name="category" required>
                            <UInput v-model="state.category" placeholder="Enter the product category" />
                        </UFormField>

                        <UFormField label="Description" name="description" required>
                            <UInput v-model="state.description" placeholder="Enter the product description" />
                        </UFormField>

                        <UFormField label="Price" name="price" required>
                            <UInput v-model="state.price" type="number" placeholder="Enter the product price" />
                        </UFormField>

                        <UFormField label="Stock" name="stock" required>
                            <UInput v-model="state.stock" type="number" placeholder="Enter the product stock" />
                        </UFormField>




                        <div class="flex justify-end w-full gap-2">
                            <UButton type="submit" icon="i-lucide-plus" label="Create" color="primary"
                                variant="subtle" />
                            <UButton icon="i-lucide-x" label="Cancel" color="neutral" variant="subtle" />
                        </div>
                    </UForm>


                </template>

                <template #footer>

                </template>
            </UModal>
        </div>



        <UTable sticky :data="data" class="flex-1 max-h-[312px]" />
    </UContainer>
</template>