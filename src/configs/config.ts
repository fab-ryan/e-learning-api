interface Config {
  prefix: string;
  port: number;
}

export const config = (): Config => ({
  prefix: process.env.PREFIX || '!',
  port: parseInt(process.env.PORT, 10) || 3000,
});
