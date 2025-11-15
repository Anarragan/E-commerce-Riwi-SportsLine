export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DB_URI ?? 'mongodb://localhost:27017/riwi-sportline',
});