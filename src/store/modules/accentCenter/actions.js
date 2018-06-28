import * as types from './actionTypes'
import { organizationTrees, organizationDetails } from '../../../api/AccountApi/accountCenter'// 账号管理部门列表及详情
export default{
    // 获取发布职位列表
  async [types.HANDEL_ORGLEFTLIST]({ commit, state }) {
    // 等我执行完了再执行下边的东西
    const res = await organizationTrees()
    commit(types.HANDEL_ORGLEFTLIST, res.result)
  },
  // 所属部门
  async [types.HANDEL_ORGDEATIL]({ commit, state }, id) {
    const res = await organizationDetails({
      organizationId: id
    })
    commit(types.HANDEL_ORGDEATIL, res)
  }
}
