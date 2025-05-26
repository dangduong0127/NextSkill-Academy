declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string | number;
      JWT_COOKIE_EXPIRES_IN: string;
    }
  }
}

export {};
