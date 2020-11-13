interface envType {
  NODE_ENV: "production" | "development";
  PORT: string;
}

export const Env = (): envType => {
  return {
    NODE_ENV: process.env.NODE_ENV ?? "",
    PORT: process.env.PORT ?? "",
  };
};

export const validateEnv = () => {
  const env = Env();
  const objects = Object.keys(env);
  objects.map((item) => {
    const nom = env[item];
    if (!nom) {
      throw Error(`${item} is required`);
    }
  });
};
