import * as yup from 'yup'

export const creationSchema = yup.object({
    title: yup
        .string()
        .required('Le titre est requis')
        .min(3, 'Au moins 3 caractères')
        .max(255, 'Au maximum 255 caractères'),

    shortContent: yup
        .string()
        .required('Le contenu est requis')
        .min(2, 'Au moins 10 caractères')
        .max(255, 'Au maximum 255 caractères'),

    content: yup
        .string()
        .required('Le contenu est requis')
        .min(10, 'Au moins 10 caractères')
        .max(20000, 'Au maximum 20000 caractères'),
    enabled: yup
        .boolean()
        .default(false)
})

export const updateSchema = yup.object({
    title: yup
        .string()
        .required('Le titre est requis')
        .min(3, 'Au moins 3 caractères')
        .max(255, 'Au maximum 255 caractères'),

    content: yup
        .string()
        .required('Le contenu est requis')
        .min(10, 'Au moins 10 caractères')
        .max(20000, 'Au maximum 20000 caractères'),

    shortContent: yup
        .string()
        .required('Le contenu est requis')
        .min(2, 'Au moins 10 caractères')
        .max(255, 'Au maximum 255 caractères'),

    enabled: yup
        .boolean()
        .default(false)
})