<template>
    <Form v-slot="{ meta }" class="form card card-body mt-5 w-80 center" validate-on-change validate-on-submit
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
            <label class="file-input">
                <input type="file" accept="image/*" @change="onFileChange" />
                <span class="file-input-button">Choisir une image</span>
                <span class="file-input-filename" v-if="fileName">
                    {{ fileName }}
                </span>
            </label>
            <p v-if="fileError" class="error-message">{{ fileError }}</p>
            <img v-if="previewUrl || previewArticleUrl" :src="previewUrl || previewArticleUrl" loading="lazy"
                class="form-preview-img" />
        </div>
        <div class="field">
            <label class="switch">
                <Field name="enabled" type="checkbox" :value="true" :unchecked-value="false" v-slot="{ field }">
                    <input v-bind="field" class="switch-input" type="checkbox" />
                </Field>
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
import { ref } from 'vue'
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
    enabled: props.article?.enabled ?? false,
}))

const file = ref(null)
const fileName = ref(null)
const previewUrl = ref(null)
const fileError = ref(null)
const uploading = ref(false)

const previewArticleUrl = computed(() => {
    if (props.article?.imageName) {
        return `${import.meta.env.VITE_API_UPLOAD_IMAGE_URL}/articles/${props.article.imageName}`
    }

    return null
})

function onFileChange(event) {
    fileError.value = null
    const f = event.target.files?.[0]

    if (!f) {
        file.value = null
        fileName.value = ''
        previewUrl.value = null
        return
    }

    if (f.size > 8 * 1024 * 1024) {
        previewUrl.value = null
        fileName.value = ''
        fileError.value = 'Le fichier doit faire moins de 8 Mo.'
        return
    }

    if (!f.type.startsWith('image/')) {
        fileError.value = 'Le fichier doit être une image.'
        file.value = null
        fileName.value = ''
        previewUrl.value = null
        return
    }

    file.value = f
    previewUrl.value = URL.createObjectURL(f)
    fileName.value = f.name
}

function onSubmit(values) {
    emit('submit', values, file.value)
}
</script>