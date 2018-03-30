require('dotenv').load({ silent: true })

const env = process.env.NODE_ENV || 'development'

const configuration = {
  port: 5566,
  cors: {
    exposedHeaders: ['Link']
  },
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    host: process.env.DEV_DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
      ssl: true
    },
    jwt_encryption: process.env.DEV_JWT_ENCRYPTION,
    jwt_expiration: process.env.DEV_JWT_EXPIRATION
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
      ssl: true
    },
    jwt_encryption: process.env.PROD_JWT_ENCRYPTION,
    jwt_expiration: process.env.PROD_JWT_EXPIRATION
  }
}

export default configuration[env]
