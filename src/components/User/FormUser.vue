<template>
    <Form :key="props.user.id" @submit="onSubmit" v-slot="{ handleSubmit, meta }"
        class="form card card-body mt-3 w-70 center" :validation-schema="schema" :initial-values="initialValues"
        validate-on-mount validate-on-change validate-on-submit>
        <div class="field">
            <label for="username">Username</label>
            <Field name="username" as="input" placeholder="JohnDoe" autocomplete="username" />
            <ErrorMessage name="username" class="error-message" />
        </div>

        <div class="field">
            <label for="firstName">Prénom</label>
            <Field name="firstName" as="input" placeholder="John" />
            <ErrorMessage name="firstName" class="error-message" />
        </div>

        <div class="field">
            <label for="lastName">Nom</label>
            <Field name="lastName" as="input" placeholder="Doe" />
            <ErrorMessage name="lastName" class="error-message" />
        </div>

        <div class="field">
            <label for="plainPassword">Mot de passe</label>
            <Field name="plainPassword" as="input" type="password" placeholder="S3CR3T" autocomplete="new-password" />
            <ErrorMessage name="plainPassword" class="error-message" />
        </div>

        <div class="field">
            <label for="confirmPassword">Confirmer mot de passe</label>
            <Field name="confirmPassword" as="input" type="password" placeholder="S3CR3T" autocomplete="new-password" />
            <ErrorMessage name="confirmPassword" class="error-message" />
        </div>

        <button class="btn-primary" :disabled="!meta.valid">
            {{ isNew ? 'Créer' : 'Enregistrer' }}
        </button>
    </Form>
</template>

<script setup>
import { computed } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { creationSchema, updateSchema } from '@/validations/userSchemas'

const props = defineProps({
    user: { type: Object, required: true },
    isNew: { type: Boolean, default: true }
})

const emit = defineEmits(['submit'])

const schema = computed(() =>
    props.isNew ? creationSchema : updateSchema
)

const initialValues = computed(() => ({
    username: props.user.username,
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    plainPassword: '',
    confirmPassword: '',
}))

function onSubmit(values) {
    emit('submit', values)
}
</script>
