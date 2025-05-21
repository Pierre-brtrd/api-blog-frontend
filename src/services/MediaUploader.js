import { useMediaStore } from "@/stores/media";

export default class MediaUploader {
    constructor(loader) {
        this.loader = loader;
        this.mediaStore = useMediaStore();
    }

    async upload() {
        const file = await this.loader.file

        const { url } = await this.mediaStore.upload(file)

        return { default: url }
    }

    abort() {
        // optionnel : si le store gère un cancel token
    }
}