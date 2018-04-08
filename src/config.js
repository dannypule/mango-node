require('dotenv').load({ silent: true })

const env = process.env.NODE_ENV || 'development'

const configuration = {
  port: 5566,
  cors: {
    exposedHeaders: ['Link'],
  },
  local: {
    db: {
      username: process.env.LOCAL_DB_USERNAME,
      password: process.env.LOCAL_DB_PASSWORD,
      database: process.env.LOCAL_DB_DATABASE,
      options: {
        host: process.env.LOCAL_DB_HOST,
        dialect: 'postgres',
        operatorsAliases: false,
        dialectOptions: {
          ssl: false,
        },
      },
    },
    jwt_encryption: process.env.LOCAL_JWT_ENCRYPTION,
    jwt_expiration: process.env.LOCAL_JWT_EXPIRATION,
  },
  development: {
    db: {
      username: process.env.DEV_DB_USERNAME,
      password: process.env.DEV_DB_PASSWORD,
      database: process.env.DEV_DB_DATABASE,
      options: {
        host: process.env.DEV_DB_HOST,
        dialect: 'postgres',
        operatorsAliases: false,
        dialectOptions: {
          ssl: true,
        },
      },
    },
    jwt_encryption: process.env.DEV_JWT_ENCRYPTION,
    jwt_expiration: process.env.DEV_JWT_EXPIRATION,
  },
  production: {
    db: {
      username: process.env.PROD_DB_USERNAME,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_DATABASE,
      options: {
        host: process.env.PROD_DB_HOST,
        dialect: 'postgres',
        operatorsAliases: false,
        dialectOptions: {
          ssl: true,
        },
      },
    },
    jwt_encryption: process.env.PROD_JWT_ENCRYPTION,
    jwt_expiration: process.env.PROD_JWT_EXPIRATION,
  },
}
debugger
export default configuration[env]
