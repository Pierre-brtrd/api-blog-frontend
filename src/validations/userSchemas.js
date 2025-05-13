import * as yup from 'yup'

export const creationSchema = yup.object({
    username: yup
        .string()
        .required('Le nom d’utilisateur est requis')
        .min(3, 'Au moins 3 caractères'),

    firstName: yup
        .string()
        .required('Le prénom est requis')
        .min(2, 'Au moins 2 caractères')
        .max(255, 'Au maximum 255 caractères'),

    lastName: yup
        .string()
        .required('Le nom est requis')
        .min(2, 'Au moins 2 caractères')
        .max(255, 'Au maximum 255 caractères'),

    plainPassword: yup
        .string()
        .required('Le mot de passe est requis')
        .min(6, 'Le mot de passe doit faire au moins 6 caractères'),

    confirmPassword: yup
        .string()
        .required('La confirmation est requise')
        .oneOf([yup.ref('plainPassword')], 'Les mots de passe ne correspondent pas'),
})

export const updateSchema = yup.object({
    username: yup
        .string()
        .required('Le nom d’utilisateur est requis')
        .min(3, 'Au moins 3 caractères')
        .max(180, 'Au maximum 180 caractères'),

    firstName: yup
        .string()
        .required('Le prénom est requis')
        .min(2, 'Au moins 2 caractères')
        .max(255, 'Au maximum 255 caractères'),

    lastName: yup
        .string()
        .required('Le nom est requis')
        .min(2, 'Au moins 2 caractères')
        .max(255, 'Au maximum 255 caractères'),

    plainPassword: yup
        .string()
        .nullable()
        .transform((v) => (v === '' ? undefined : v))
        .notRequired()
        .min(6, 'Le mot de passe doit faire au moins 6 caractères'),

    confirmPassword: yup
        .string()
        .nullable()
        .transform((v) => (v === '' ? undefined : v))
        .notRequired()
        .test('confirm',
            'Les mots de passe ne correspondent pas',
            function (value) {
                const { plainPassword } = this.parent
                if (!plainPassword) {
                    return true
                }
                return value === plainPassword
            }),
})
