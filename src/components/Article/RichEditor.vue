<template>
    <ckeditor v-if="editor" :editor="editor" :config="config" :model-value="modelValue" @update:modelValue="onUpdate"
        @ready="onReady" />
</template>

<script setup>
import { computed } from 'vue'
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue'
import MediaUploader from '@/services/MediaUploader.js'

const props = defineProps({
    modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue', 'ready'])

function onUpdate(value) {
    emit('update:modelValue', value)
}

function onReady(editor) {
    emit('ready', editor)
}

const cloud = useCKEditorCloud({
    version: '45.1.0',
    premium: true
});

const editor = computed(() => {
    if (!cloud.data.value) {
        return null;
    }

    return cloud.data.value.CKEditor.ClassicEditor;
});

function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new MediaUploader(loader)
    }
}

const config = computed(() => {
    if (!cloud.data.value) {
        return null;
    }

    const { Essentials, Paragraph, Bold, Italic, Strikethrough, Underline, Code, Heading, Highlight,
        HorizontalLine, BlockQuote, CodeBlock, Font, List, SourceEditing, Table, TableToolbar,
        TableCellProperties, TableProperties, TableColumnResize, Alignment, PasteFromMarkdownExperimental,
        Image, ImageUpload, ImageCaption, ImageResize, ImageStyle, ImageToolbar, LinkImage,
        ImageResizeEditing, ImageResizeHandles
    } = cloud.data.value.CKEditor;

    return {
        licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY,
        plugins: [
            Essentials, Paragraph, Bold, Italic, Strikethrough,
            Underline, Code, Heading, Highlight, HorizontalLine, BlockQuote, CodeBlock,
            Font, List, SourceEditing, Table, TableToolbar, TableCellProperties, TableProperties,
            TableColumnResize, Alignment, PasteFromMarkdownExperimental, Image, ImageUpload,
            CustomUploadAdapterPlugin, ImageCaption, ImageResize, ImageStyle, ImageToolbar, LinkImage,
            ImageResizeEditing, ImageResizeHandles
        ],
        toolbar: [
            'undo', 'redo', '|', 'heading', 'bold', 'italic', 'underline', 'strikethrough', 'code', '|',
            'alignment', 'fontSize', 'fontFamily', 'fontColor', '|', 'bulletedList', 'numberedList', '|', 'blockQuote', 'codeBlock', '|',
            'insertTable', 'uploadImage', '|', 'horizontalLine', 'highlight', '|', 'sourceEditing'
        ],
        placeholder: 'Contenu de l\'article',
        heading: {
            options: [
                { model: 'paragraph', title: 'Texte', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Titre 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Titre 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Titre 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Titre 4', class: 'ck-heading_heading4' },
            ]
        },
        image: {
            toolbar: [
                'imageStyle:block',
                'imageStyle:side',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'linkImage'
            ],
            insert: {
                // If this setting is omitted, the editor defaults to 'block'.
                // See explanation below.
                type: 'auto'
            }
        },
        codeBlock: {
            languages: [
                { language: 'css', label: 'CSS' },
                { language: 'html', label: 'HTML' },
                { language: 'javascript', label: 'JavaScript' },
                { language: 'php', label: 'PHP' },
                { language: 'twig', label: 'Twig' },
                { language: 'bash', label: 'Bash' },
                { language: 'python', label: 'Python' },
                { language: 'json', label: 'JSON' },
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn', 'tableRow', 'mergeTableCells',
                'tableProperties', 'tableCellProperties'
            ],
        }
    };
});
</script>

<style lang="scss">
.ck-editor__editable {
    background-color: $dark-soft !important;
    color: $white;
    min-height: 200px;
    max-height: 500px;
    overflow-y: scroll;
}
</style>
