<script setup lang="ts">
import z from 'zod';
import Default from '@/layouts/default.vue';
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui"
import { useAxios } from '@/axios/useAxios';

const fields: AuthFormField[] = [
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        required: true
    },
    {
        name: 'remember',
        label: 'Remember me',
        type: 'checkbox'
    }
]


const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.infer<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
    
    try {
        const {data, status} = await useAxios.post("/login", payload.data, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <Default>
        <UPageSection headline="Authentication" title="Welcome back" description="We are happy to see you again!">
            <div class="flex flex-col items-center justify-center gap-4 p-4">
                <UPageCard class="w-full max-w-md">
                    <UAuthForm :schema="schema" title="Login"
                        description="Enter your credentials to access your account." icon="i-lucide-user"
                        :fields="fields" @submit="onSubmit" />
                </UPageCard>
            </div>
        </UPageSection>
    </Default>
</template>