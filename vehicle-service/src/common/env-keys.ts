const envKeys = {
  database: {
    host: 'DATABASE_HOST',
    port: 'DATABASE_PORT',
    user: 'DATABASE_USER',
    password: 'DATABASE_PASSWORD',
    name: 'DATABASE_NAME',
  },
} as const

export default envKeys
