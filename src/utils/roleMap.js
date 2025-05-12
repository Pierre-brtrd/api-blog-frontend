export const roleLabels = {
    ROLE_ADMIN: 'Admin',
    ROLE_USER: 'User',
}

export function mapRoles(roles) {
    return roles.map(role => roleLabels[role] || role)
}