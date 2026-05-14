/**
 * Axios HTTP 请求封装工具
 * 
 * 本文件对 axios 进行二次封装，主要功能：
 * 1. 创建 axios 实例，统一配置 baseURL、超时时间等
 * 2. 请求拦截器：在发送请求前统一处理（如添加 token）
 * 3. 响应拦截器：统一处理响应数据和错误提示
 * 
 * 使用方式：
 * import request from '@/utils/request'
 * request({ url: '/api/xxx', method: 'get', params: {...} })
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

/**
 * 创建 axios 实例
 * @param {Object} config - 实例配置
 * @param {string} config.baseURL - 请求的基础路径（前缀）
 * @param {number} config.timeout - 请求超时时间（毫秒）
 */
const service = axios.create({
  baseURL: '',       // 基础路径，当前为空表示使用相对路径（开发时被 Mock 拦截）
  timeout: 10000     // 请求超时时间：10 秒
})

/**
 * 请求拦截器
 * 在请求发送前执行，可用于：
 * - 添加认证 token 到请求头
 * - 添加全局请求参数
 * - 显示 loading 动画
 */
service.interceptors.request.use(
  // 请求成功回调：config 是请求配置对象
  (config) => config,  // 当前无特殊处理，直接返回
  
  // 请求失败回调：处理请求配置错误
  (error) => Promise.reject(error)
)

/**
 * 响应拦截器
 * 在收到服务器响应后执行，统一处理响应结果
 */
service.interceptors.response.use(
  // 响应成功回调
  (response) => {
    const res = response.data
    
    // 根据后端约定的状态码判断请求是否成功
    // 本项目中后端约定：code === 200 表示成功
    if (res.code !== 200) {
      // 非 200 状态码，显示错误提示
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    
    // 成功时返回完整的响应数据
    return res
  },
  
  // 响应失败回调：处理网络异常、服务器错误等
  (error) => {
    // 显示错误提示（如断网、超时、500 错误等）
    ElMessage.error(error.message || '网络异常')
    return Promise.reject(error)
  }
)

export default service
