import * as todoActions from './modules/todolist'
import * as loginActions from './modules/login'

const actions = Object.assign({}, todoActions, loginActions)

export default actions