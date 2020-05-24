import { _appConfigs } from '@constants'

const {
  NODE_ENV,
  MONGO_URL = process.env.MONGO_URL || _appConfigs.DEFAULT_MONGODB_URL
} = process.env

const defaultData = {
  type: 'mongodb',
  url: `mongodb://${MONGO_URL}`,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true
}
console.log('MONGO_URL: ', MONGO_URL)

const config = {
  production: {
    ormConfig: {
      ...defaultData,
      entities: ['src/**/**.entity{.ts,.js}']
    }
  },
  development: {
    ormConfig: {
      ...defaultData,
      keepConnectionAlive: true,
      entities: [
        ...(process.env.HOT
          ? [
              ...require
                .context('.', true, /\.entity\.ts$/)
                .keys()
                .map((id) => Object.values(require.context('.', true, /\.entity\.ts$/)(id))[0])
            ]
          : ['src/**/**.entity{.ts,.js}'])
      ]
    }
  }
}

export default config[NODE_ENV || 'development']
