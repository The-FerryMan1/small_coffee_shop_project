<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { Reactive } from 'vue';
import type { ZodObject } from 'zod';


interface SchemaData {
    name: string;
    category: string;
    description: string;
    stock: number;
    price: number;
}

const props = defineProps<{
    schema: ZodObject,
    onSubmit: (event: FormSubmitEvent<SchemaData>)=> Promise<void> | void ,
    state: Reactive<Partial<SchemaData>>,
}>()
</script>

<template>
    <UModal title="Add new product">
        
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
                    <UButton type="submit" icon="i-lucide-plus" label="Create" color="primary" variant="subtle" />
                    <UButton icon="i-lucide-x" label="Cancel" color="neutral" variant="subtle" />
                </div>
            </UForm>
        </template>
        <template #footer>
        </template>
    </UModal>

</template>