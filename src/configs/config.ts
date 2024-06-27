interface Config {
  prefix: string;
  port: number;
  secret: string;
}

export const config = (): Config => ({
  prefix: process.env.PREFIX || '!',
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.JWT_SECRET || 'secret',
});
