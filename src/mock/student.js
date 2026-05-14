/**
 * 学生数据 Mock 模块
 * 
 * 本文件用于在开发环境下模拟后端 API，拦截 axios 请求并返回假数据
 * 主要功能：
 * 1. 生成随机学生数据（姓名、性别、年级、班级、时间等）
 * 2. 拦截 axios 请求，根据 URL 和方法名路由到对应的处理函数
 * 3. 模拟分页、筛选、新增、编辑、删除等操作
 * 
 * 使用场景：
 * - 后端接口未开发完成时，前端可以先开发和测试
 * - 演示或教学时不需要真实的后端服务器
 * 
 * 注意：生产环境不会使用此文件（main.js 中 import 了此模块）
 */
import axios from 'axios'

// ========== 全局计数器 ==========
// idCounter：数据库主键 ID 计数器（模拟自增 ID）
let idCounter = 0
// studentIdCounter：学号生成计数器（用于生成 STU000001, STU000002 等学号）
let studentIdCounter = 0

// 随机姓名池：用于生成模拟数据
const names = [
  '张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十',
  '钱一', '冯二', '陈明', '褚亮', '卫华', '蒋强', '沈静', '韩磊',
  '杨帆', '朱伟', '秦芳', '尤丽', '许刚', '何敏', '吕超', '施蕾',
  '张伟', '李娜', '王芳', '刘洋', '陈晨', '赵阳'
]

/**
 * 生成随机日期
 * @param {number} daysAgo - 最多往前推多少天
 * @returns {string} 返回 ISO 8601 格式的日期字符串
 */
function generateRandomDate(daysAgo) {
  const now = new Date()
  // 在 0 到 daysAgo 之间随机一个天数
  const offset = Math.floor(Math.random() * daysAgo)
  // 计算随机日期
  const date = new Date(now.getTime() - offset * 24 * 60 * 60 * 1000)
  // 随机设置时分秒
  date.setHours(Math.floor(Math.random() * 24))
  date.setMinutes(Math.floor(Math.random() * 60))
  date.setSeconds(Math.floor(Math.random() * 60))
  return date.toISOString()
}

/**
 * 创建单个学生对象
 * @param {string} name - 姓名
 * @param {string} gender - 性别
 * @param {number} grade - 年级（1-12）
 * @param {number} className - 班级（1-12）
 * @param {string} createTime - 创建时间
 * @returns {Object} 学生对象
 */
function createStudent(name, gender, grade, className, createTime) {
  idCounter++
  studentIdCounter++
  // 生成学号：STU + 6 位数字（如 STU000001）
  const studentId = 'STU' + String(studentIdCounter).padStart(6, '0')
  const updateTime = createTime
  return {
    id: idCounter,
    studentId,
    name,
    gender,
    grade,
    className,
    createTime,
    updateTime
  }
}

// 学生数据列表（内存中的“数据库”）
const studentList = []

/**
 * 初始化 Mock 数据
 * 生成 30 条随机学生记录
 */
function initMockData() {
  for (let i = 0; i < 30; i++) {
    const name = names[i % names.length]  // 从姓名池中循环取值
    const gender = i % 2 === 0 ? '男' : '女'  // 奇数女性，偶数男性
    const grade = (i % 12) + 1  // 年级 1-12 循环
    const className = (i % 6) + 1  // 班级 1-6 循环
    const createTime = generateRandomDate(30)  // 30 天内的随机日期
    studentList.push(createStudent(name, gender, grade, className, createTime))
  }
}

// 模块加载时立即初始化数据
initMockData()

/**
 * 生成新的学号
 * @returns {string} 新学号
 */
function generateStudentId() {
  studentIdCounter++
  return 'STU' + String(studentIdCounter).padStart(6, '0')
}

/**
 * 构建符合 axios 响应格式的 Mock 响应
 * @param {number} code - 状态码（200 表示成功）
 * @param {string} message - 提示信息
 * @param {*} data - 响应数据
 * @returns {Object} 模拟的 axios 响应对象
 */
function buildResponse(code, message, data) {
  return {
    data: { code, message, data },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
  }
}

/**
 * 处理查询学生列表请求（支持分页和筛选）
 * @param {Object} config - axios 请求配置
 * @returns {Object} 响应对象
 */
function handleListRequest(config) {
  const params = config.params || {}
  const page = parseInt(params.page) || 1
  const pageSize = parseInt(params.pageSize) || 10

  // 先获取所有数据的副本
  let filtered = [...studentList]

  // 按学号模糊筛选
  if (params.studentId) {
    filtered = filtered.filter((s) =>
      s.studentId.toLowerCase().includes(params.studentId.toLowerCase())
    )
  }

  // 按姓名模糊筛选
  if (params.name) {
    filtered = filtered.filter((s) =>
      s.name.includes(params.name)
    )
  }

  // 按性别精确筛选
  if (params.gender) {
    filtered = filtered.filter((s) => s.gender === params.gender)
  }

  // 按年级精确筛选
  if (params.grade) {
    filtered = filtered.filter((s) => s.grade === Number(params.grade))
  }

  // 按班级精确筛选
  if (params.className) {
    filtered = filtered.filter((s) => s.className === Number(params.className))
  }

  // 按创建时间范围筛选
  if (params.createTimeStart && params.createTimeEnd) {
    const start = new Date(params.createTimeStart).getTime()
    const end = new Date(params.createTimeEnd).getTime()
    filtered = filtered.filter((s) => {
      const t = new Date(s.createTime).getTime()
      return t >= start && t <= end
    })
  }

  // 计算分页
  const total = filtered.length
  const startIdx = (page - 1) * pageSize
  const list = filtered.slice(startIdx, startIdx + pageSize)

  return buildResponse(200, 'success', { list, total, page, pageSize })
}

/**
 * 处理根据学号查询单个学生请求
 * @param {string} url - 请求 URL
 * @returns {Object} 响应对象
 */
function handleGetByStudentId(url) {
  // 从 URL 中提取学号：/api/students/STU000001 -> STU000001
  const studentId = url.split('/').pop()
  const student = studentList.find((s) => s.studentId === studentId)
  if (student) {
    return buildResponse(200, 'success', student)
  }
  return buildResponse(404, '学生不存在', null)
}

/**
 * 处理新增学生请求
 * @param {Object} config - axios 请求配置
 * @returns {Object} 响应对象
 */
function handleAdd(config) {
  const data = JSON.parse(config.data)
  const now = new Date().toISOString()
  const newStudent = {
    id: ++idCounter,
    studentId: generateStudentId(),
    name: data.name,
    gender: data.gender,
    grade: data.grade,
    className: data.className,
    createTime: now,
    updateTime: now
  }
  studentList.push(newStudent)
  return buildResponse(200, '新增成功', newStudent)
}

/**
 * 处理更新学生信息请求
 * @param {Object} config - axios 请求配置
 * @returns {Object} 响应对象
 */
function handleUpdate(config) {
  // 从 URL 中提取学号
  const studentId = config.url.split('/').pop()
  const data = JSON.parse(config.data)
  const idx = studentList.findIndex((s) => s.studentId === studentId)
  if (idx !== -1) {
    // 更新学生信息，保持学号不变，更新 updateTime
    studentList[idx] = {
      ...studentList[idx],
      name: data.name,
      gender: data.gender,
      grade: data.grade,
      className: data.className,
      updateTime: new Date().toISOString()
    }
    return buildResponse(200, '更新成功', studentList[idx])
  }
  return buildResponse(404, '学生不存在', null)
}

/**
 * 处理删除学生请求
 * @param {string} url - 请求 URL
 * @returns {Object} 响应对象
 */
function handleDelete(url) {
  const studentId = url.split('/').pop()
  const idx = studentList.findIndex((s) => s.studentId === studentId)
  if (idx !== -1) {
    studentList.splice(idx, 1)  // 从数组中删除
    return buildResponse(200, '删除成功', null)
  }
  return buildResponse(404, '学生不存在', null)
}

/**
 * 自定义 axios 适配器
 * 拦截所有 axios 请求，根据 URL 和 HTTP 方法分发到对应的处理函数
 * @param {Object} config - axios 请求配置
 * @returns {Promise} 返回响应
 */
const mockAdapter = (config) => {
  return new Promise((resolve) => {
    const method = config.method.toUpperCase()
    const url = config.url

    // 模拟网络延迟（100ms），使请求看起来更像真实的网络请求
    setTimeout(() => {
      // 路由匹配：根据请求方法和 URL 分发到不同处理函数
      if (method === 'GET' && url === '/api/students') {
        // 查询列表
        resolve(handleListRequest(config))
      } else if (method === 'GET' && url.startsWith('/api/students/')) {
        // 根据学号查询
        resolve(handleGetByStudentId(url))
      } else if (method === 'POST' && url === '/api/students') {
        // 新增
        resolve(handleAdd(config))
      } else if (method === 'PUT' && url.startsWith('/api/students/')) {
        // 更新
        resolve(handleUpdate(config))
      } else if (method === 'DELETE' && url.startsWith('/api/students/')) {
        // 删除
        resolve(handleDelete(url))
      } else {
        // 未匹配的接口
        resolve(buildResponse(404, '接口不存在', null))
      }
    }, 100)
  })
}

// 替换 axios 默认适配器为 Mock 适配器
// 此后所有 axios 请求都会经过 mockAdapter 处理，而不会真正发送到网络
axios.defaults.adapter = mockAdapter
