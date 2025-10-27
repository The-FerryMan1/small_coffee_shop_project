<script setup lang="tsx">
import z from 'zod'
import type { $ZodFlattenedError } from 'zod/v4/core'
definePageMeta({
    title: "Login"
})


const schema = z.object({
  email: z.string(),
  password: z.string().min(8, "Password must be atleast 8 characters")
})

type Schema = z.infer<typeof schema>

const errorMessage = ref<$ZodFlattenedError<Schema>>() 
  
const form = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const submit = async()=>{

  try {
      const parsed = schema.safeParse(form)
      if(!parsed.success){
        errorMessage.value = z.flattenError(parsed.error)
        return
      }
      const response = await $fetch("/api/auth/login", {
        method: 'POST',
        body: form
      })
      console.log("logged in successful", response)
  } catch (error) {
       console.error('Submission failed:', error);
  }


}



</script>

<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="submit">
      <span v-if="errorMessage">{{ errorMessage }}</span>
        <div>
            <label for="">Email</label>
            <input v-model="form.email" type="text" placeholder="example@example.com">
        </div>
        <div>
            <label for="">Password</label>
            <input v-model="form.password" type="password" placeholder="********">
        </div>

        <button>Submit</button>
    </form>
  </div>
</template>