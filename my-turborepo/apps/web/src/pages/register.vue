<script setup lang="ts">
import z from 'zod';
import Default from '@/layouts/default.vue';
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui"
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';


const {register} = useAuthStore()
const fields: AuthFormField[] = [
     {
        name: 'first_name',
        type: 'text',
        label: 'First name',
        placeholder: 'Enter your first name',
        required: true
    },
     {
        name: 'last_name',
        type: 'text',
        label: 'Last name',
        placeholder: 'Enter your last name',
        required: true
    },
     {
        name: 'middle_name',
        type: 'text',
        label: 'Middle name',
        placeholder: 'Enter your middle name',
    },
     {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true
    },
    {
        name: 'confirm_password',
        label: 'Confirm password',
        type: 'password',
        placeholder: 'Confirm your password',
        required: true
    },
   
]



const loading = ref<boolean>(false)
const errorMessage = ref<string|null>(null)
const schema = z.object({
    first_name: z.string("First name is required").max(255),
    last_name: z.string("Last name is required").max(255),
    middle_name: z.string().max(255).optional().default("N/A"),
    email: z.email("Enter a valid email"),
    password: z.coerce.string().min(8, "Password must be atleast 8 characters"),
    confirm_password: z.coerce.string().min(8, "Password must be atleast 8 characters")
}).refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    error: "Password do not match"


})

type Schema = z.infer<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log(payload.data)
    try {
        loading.value = true
        await register<typeof payload.data>(payload.data)
    } catch (error) {
        if(error instanceof Error){
             errorMessage.value = error.message
     
        }
          console.log(error)

    }finally{
        loading.value = false
    }
}
</script>

<template>
    <Default>
        <UPageSection orientation="horizontal" headline="Registration" title="Create an account to get started"
            description="We are glad that you will try our coffee">
            <div class="flex flex-col justify-center items-center">
                <UPageCard class="w-full max-w-md">
                <UAuthForm :schema="schema" title="Registration" description="Enter your information to create an account."
                    icon="i-lucide-user" :fields="fields" @submit="onSubmit" :submit="{loading}">
                    <template #validation>
                        <UAlert v-if="errorMessage" color="error" icon="i-lucide-info" :title="errorMessage" />
                    </template>
                    <template #footer>
                        <div>
                            By submitting in, you agree to our <ULink to="#" class="text-primary font-medium">Terms of Service
                        </ULink>.
                        </div>
                        <div class="mt-2">
                            <ULink class="underline" to="/register">Already have an account?</ULink>
                        </div>
                        
                    </template>
                </UAuthForm>

            </UPageCard>
            </div>
            
        </UPageSection>
    </Default>
</template>