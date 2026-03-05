import { DataSource } from "typeorm";

// configuration is read from environment variables so the application can
// run both locally and inside containers. Defaults match the previous hard‑
// coded values used during initial development.
const datasource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  username: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "supersecret",
  database: process.env.PG_DATABASE || "postgres",
  entities: [__dirname + "/entities/**/*.{js,ts}"],
  logging: true,
  synchronize: true,
});

export default datasource;
