/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MEALPREP_BACKEND_HOSTNAME: string;
    readonly VITE_MEALPREP_BACKEND_PORT: string;
    readonly VITE_MEALPREP_BACKEND_PROTOCOL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
