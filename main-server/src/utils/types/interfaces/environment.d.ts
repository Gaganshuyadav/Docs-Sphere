declare global{
    namespace NodeJS{
        interface ProcessEnv {
            NODE_ENV ?: string;
            HOST ?: string;
            PORT ?: string;
            DATABASE_URL  ?: string;
            USER ?: string;
            DATABASE ?: string;
            PASSWORD ?: string;  
            DB_HOST ?: string;
            DB_PORT ?: string;
            VITE_SERVER ?: string;
            JWT_SECRET ?: string;
            FROM_EMAIL ?: string;
            PASSWORD_EMAIL ?: string;
        }
    }
}

// This line is necessary to make the file a module
export {};


