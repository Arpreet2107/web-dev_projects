const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const databaseUrl = env("DATABASE_URL");
  const parsed = databaseUrl ? parse(databaseUrl) : undefined;

  const sslEnabled = env.bool("DATABASE_SSL", false);
  const sslRejectUnauthorized = env.bool(
    "DATABASE_SSL_REJECT_UNAUTHORIZED",
    true
  );

  return {
    connection: {
      client: env("DATABASE_CLIENT", "postgres"),
      connection: {
        host: parsed?.host || env("DATABASE_HOST", "127.0.0.1"),
        port: parsed?.port ? Number(parsed.port) : env.int("DATABASE_PORT", 5432),
        database: parsed?.database || env("DATABASE_NAME", "pmipune_db"),
        user: parsed?.user || env("DATABASE_USERNAME", "postgres"),
        password: parsed?.password || env("DATABASE_PASSWORD", "postgres"),
        ssl:
          sslEnabled &&
          {
            rejectUnauthorized: sslRejectUnauthorized,
          },
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 0),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
  };
};

