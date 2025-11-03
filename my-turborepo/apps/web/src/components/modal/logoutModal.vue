<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
const emit = defineEmits<{ close: [boolean] }>()
const auth = useAuthStore()


const router = useRouter()
const closeButton = async () => {
 
    emit('close', false)

}


const logoutSubmit = async () => {
    try {
        await auth.logout()
        router.replace({name: "login"})
    } catch (error) {
        throw error
    } finally {
        emit('close', false)
    }
}


</script>

<template>
    <UModal ref="UModal" title="Log out" description="Are you sure you want to log out?" close-icon="i-lucide-arrow-right">
        <template #footer>
            <div class="flex justify-end item-center w-full">
                <UButton @click="logoutSubmit" class="me-5" label="Confirm" color="neutral" variant="subtle" />
                <UButton @click="closeButton" class="me-5" label="Close" color="primary" variant="subtle" />
            </div>
        </template>
    </UModal>
</template>