<script setup lang="ts">
import z from 'zod';
import Default from '@/layouts/default.vue';
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui"
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';


const {login} = useAuthStore()
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



const loading = ref<boolean>(false)
const errorMessage = ref<string | null>(null)
const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.infer<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {

    try {
        loading.value = true
        await login<typeof payload.data>(payload.data)
    } catch (error) {
          if(error instanceof Error){
             errorMessage.value = error.message
     
        }
          console.log(error)

    } finally {
        loading.value = false
    }
}
</script>

<template>
    <Default>
        <UPageSection orientation="horizontal" headline="Authentication" title="Welcome back"
            description="We are happy to see you again!">
            <div class="flex flex-col justify-center items-center">
                <UPageCard class="w-full max-w-md">
                    <UAuthForm :schema="schema" title="Login"
                        description="Enter your credentials to access your account." icon="i-lucide-user"
                        :fields="fields" @submit="onSubmit" :submit="{ loading }">
                        <template #validation>
                            <UAlert v-if="errorMessage" color="error" icon="i-lucide-info" :title="errorMessage" />
                        </template>
                        <template #footer>
                            <div>
                                By signing in, you agree to our <ULink to="#" class="text-primary font-medium">Terms of
                                    Service
                                </ULink>.
                            </div>
                            <div class="mt-2">
                                <ULink class="underline" to="/register">Don't have an account?</ULink>
                            </div>

                        </template>
                    </UAuthForm>

                </UPageCard>
            </div>

        </UPageSection>
    </Default>
</template>