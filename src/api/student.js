/**
 * 学生管理相关 API 接口
 * 
 * 本文件封装了所有与学生管理相关的 HTTP 请求
 * 每个函数都返回一个 Promise，可以在组件中使用 async/await 调用
 * 
 * 接口约定：
 * - GET 请求使用 params 传参（查询参数拼接在 URL 后面）
 * - POST/PUT 请求使用 data 传参（请求体 JSON 格式）
 */
import request from '@/utils/request'

/**
 * 获取学生列表（支持分页和条件筛选）
 * @param {Object} params - 查询参数
 * @param {number} params.page - 当前页码
 * @param {number} params.pageSize - 每页条数
 * @param {string} [params.studentId] - 学号（模糊匹配）
 * @param {string} [params.name] - 姓名（模糊匹配）
 * @param {string} [params.gender] - 性别
 * @param {number} [params.grade] - 年级
 * @param {number} [params.className] - 班级
 * @param {string} [params.createTimeStart] - 创建时间起始日期
 * @param {string} [params.createTimeEnd] - 创建时间结束日期
 * @returns {Promise} 返回学生列表和总数
 */
export function getStudentList(params) {
  return request({ url: '/api/students', method: 'get', params })
}

/**
 * 根据学号获取单个学生详情
 * @param {string} studentId - 学号
 * @returns {Promise} 返回学生信息
 */
export function getStudentByStudentId(studentId) {
  return request({ url: `/api/students/${studentId}`, method: 'get' })
}

/**
 * 新增学生
 * @param {Object} data - 学生信息
 * @param {string} data.name - 姓名
 * @param {string} data.gender - 性别
 * @param {number} data.grade - 年级
 * @param {number} data.className - 班级
 * @returns {Promise} 返回新增的学生信息（包含自动生成的学号）
 */
export function addStudent(data) {
  return request({ url: '/api/students', method: 'post', data })
}

/**
 * 更新学生信息
 * @param {string} studentId - 学号
 * @param {Object} data - 需要更新的学生信息
 * @returns {Promise} 返回更新后的学生信息
 */
export function updateStudent(studentId, data) {
  return request({ url: `/api/students/${studentId}`, method: 'put', data })
}

/**
 * 删除学生
 * @param {string} studentId - 学号
 * @returns {Promise} 返回删除结果
 */
export function deleteStudent(studentId) {
  return request({ url: `/api/students/${studentId}`, method: 'delete' })
}
