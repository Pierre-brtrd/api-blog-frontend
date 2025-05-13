<template>
    <Form v-slot="{ meta }" class="form card mt-3 w-80 center" validate-on-change validate-on-submit
        :validation-schema="schema" :initial-values="initialValues" @submit="onSubmit">
        <div class="field">
            <label for="title">Titre</label>
            <Field name="title" type="text" class="input" placeholder="Titre de votre article" required />
            <ErrorMessage name="title" class="error-message" />
        </div>
        <div class="field">
            <label for="content">Contenu</label>
            <Field name="content" as="textarea" class="input" rows="10" required
                placeholder="Contenu de votre article" />
            <ErrorMessage name="content" class="error-message" />
        </div>
        <div class="field">
            <label class="switch" for="enabled-switch">
                <Field name="enabled" as="input" value="true" type="checkbox" id="enabled-switch"
                    class="visually-hidden" />
                <span class="slider"></span>
                <span class="label-text">Actif</span>
            </label>
            <ErrorMessage name="enabled" class="error-message" />
        </div>
        <button class="btn-primary" :disabled="!meta.valid">
            {{ isNew ? 'Créer' : 'Enregistrer' }}
        </button>
    </Form>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { creationSchema, updateSchema } from '@/validations/articleSchemas'
import { computed } from 'vue'

const props = defineProps({
    article: { type: Object },
    isNew: { type: Boolean, default: true }
})

const emit = defineEmits(['submit'])

const schema = computed(() =>
    props.isNew ? creationSchema : updateSchema
)

const initialValues = computed(() => ({
    title: props.article?.title || '',
    content: props.article?.content || '',
    enabled: props.article?.enabled || false,
}))

function onSubmit(values) {
    emit('submit', values)
}
</script>