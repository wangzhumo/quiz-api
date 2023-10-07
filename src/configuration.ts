import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
import * as _ from 'lodash'

const COMMON_CONFIG_FILENAME = 'config.yml'

const filePath = join(__dirname, '../config', COMMON_CONFIG_FILENAME)

const evnPath = join(__dirname, '../config', `config.${process.env.NODE_ENV || 'development'}.yml`)

const commonConfig = yaml.load(readFileSync(filePath, 'utf8'))
const envConfig = yaml.load(readFileSync(evnPath, 'utf8'))

// ConfigModule load function need  function
export default () => {
    return _.merge(commonConfig, envConfig)
}
