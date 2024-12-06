export default () => ({
  port: process.env.PORT,
  db_port: process.env.POSTGRES_PORT,
  db_user: process.env.POSTGRES_USER,
  db_password: process.env.POSTGRES_PASSWORD,
  db_host: process.env.POSTGRES_HOST,
  db_name: process.env.POSTGRES_DB,
  secret_jwt: process.env.SECRET,
  expire_jwt: process.env.EXPIRE_JWT,
});
