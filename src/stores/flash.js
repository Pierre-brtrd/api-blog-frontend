import { defineStore } from 'pinia';

export const useFlashStore = defineStore('flash', {
    state: () => ({
        message: '',
        type: '',
    }),
    actions: {
        flash(message, type = 'success') {
            this.message = message;
            this.type = type;
        },
        clear() {
            this.message = '';
            this.type = '';
        }
    }
})