<!-- 
  学生列表页面
  * 
  * 此页面提供以下功能：
  * - 多条件搜索：学号、姓名、性别、年级、班级、创建时间范围
  * - 数据表格展示：显示学生信息列表
  * - 分页功能：支持页码切换和每页条数调整
  * - 编辑/删除操作：对已有学生信息进行管理
 -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getStudentList, deleteStudent } from '@/api/student'

// 获取路由实例，用于页面跳转（编辑操作）
const router = useRouter()

/**
 * 搜索表单数据
 * 每个字段对应表单中的一项筛选条件
 */
const searchForm = ref({
  studentId: '',         // 学号
  name: '',              // 姓名
  gender: '',            // 性别
  grade: '',             // 年级
  className: '',         // 班级
  createTimeRange: []    // 创建时间范围（日期区间）
})

/**
 * 表格数据
 * tableData：当前页显示的学生列表
 * loading：表格加载状态（显示/隐藏 loading 动画）
 */
const tableData = ref([])
const loading = ref(false)

/**
 * 分页配置
 * currentPage：当前页码
 * pageSize：每页显示的条数
 * total：数据总条数
 */
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

/**
 * 年级选项：1-12年级
 * Array.from({ length: 12 }, (_, i) => ...) 生成 [1,2,...,12] 的数组
 */
const gradeOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}年级`,
  value: i + 1
}))

/**
 * 班级选项：1-12班
 */
const classOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}班`,
  value: i + 1
}))

/**
 * 构建 API 请求参数
 * 将搜索表单和分页数据合并，过滤掉空值字段
 * @returns {Object} 请求参数对象
 */
function buildParams() {
  const params = {
    page: pagination.value.currentPage,
    pageSize: pagination.value.pageSize
  }
  // 只有字段非空时才添加到参数中
  if (searchForm.value.studentId) params.studentId = searchForm.value.studentId
  if (searchForm.value.name) params.name = searchForm.value.name
  if (searchForm.value.gender) params.gender = searchForm.value.gender
  if (searchForm.value.grade) params.grade = searchForm.value.grade
  if (searchForm.value.className) params.className = searchForm.value.className
  // 创建时间范围：确保有起止两个日期
  if (searchForm.value.createTimeRange && searchForm.value.createTimeRange.length === 2) {
    params.createTimeStart = searchForm.value.createTimeRange[0]
    params.createTimeEnd = searchForm.value.createTimeRange[1]
  }
  return params
}

/**
 * 获取数据
 * 调用 API 获取学生列表并更新表格数据和分页总数
 */
async function fetchData() {
  loading.value = true
  try {
    const res = await getStudentList(buildParams())
    tableData.value = res.data.list
    pagination.value.total = res.data.total
  } finally {
    loading.value = false
  }
}

/**
 * 搜索按钮点击处理
 * 重置到第一页并重新获取数据
 */
function handleSearch() {
  pagination.value.currentPage = 1
  fetchData()
}

/**
 * 重置按钮点击处理
 * 清空所有搜索条件并重新获取数据
 */
function handleReset() {
  searchForm.value = {
    studentId: '',
    name: '',
    gender: '',
    grade: '',
    className: '',
    createTimeRange: []
  }
  pagination.value.currentPage = 1
  fetchData()
}

/**
 * 每页条数变化处理
 * @param {number} size - 新的每页条数
 */
function handleSizeChange(size) {
  pagination.value.pageSize = size
  pagination.value.currentPage = 1  // 改变每页条数时回到第一页
  fetchData()
}

/**
 * 页码变化处理
 * @param {number} page - 新的页码
 */
function handleCurrentChange(page) {
  pagination.value.currentPage = page
  fetchData()
}

/**
 * 编辑按钮点击处理
 * 跳转到学生编辑页面
 * @param {Object} row - 表格行数据（学生信息）
 */
function handleEdit(row) {
  router.push(`/students/edit/${row.studentId}`)
}

/**
 * 删除按钮点击处理
 * 先弹出确认框，用户确认后再执行删除操作
 * 删除成功后判断是否需要回到上一页
 * @param {Object} row - 表格行数据（学生信息）
 */
async function handleDelete(row) {
  try {
    // 显示删除确认对话框
    await ElMessageBox.confirm('确定要删除该学生信息吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    // 调用删除 API
    await deleteStudent(row.studentId)
    ElMessage.success('删除成功')

    // 删除后若当前页仅剩一条且非第一页，回到上一页
    if (tableData.value.length === 1 && pagination.value.currentPage > 1) {
      pagination.value.currentPage--
    }
    fetchData()
  } catch {
    // 用户取消删除操作，不执行任何动作
  }
}

/**
 * 格式化时间戳为可读字符串
 * @param {string|number} time - 时间戳或 ISO 日期字符串
 * @returns {string} 格式化后的时间，如 "2024-01-15 14:30:00"
 */
function formatTime(time) {
  if (!time) return ''
  const d = new Date(time)
  const pad = (n) => String(n).padStart(2, '0')  // 数字补零（如 9 -> 09）
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

// 组件挂载时立即获取数据
onMounted(() => {
  fetchData()
})
</script>

<template>
  <!-- 
    学生列表页面容器
    使用 class="student-list" 便于全局样式覆盖
  -->
  <div class="student-list">
    <!-- 搜索卡片：包含搜索表单 -->
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" inline>
        <!-- 学号搜索：文本输入框 -->
        <el-form-item label="学号">
          <el-input v-model="searchForm.studentId" placeholder="请输入学号" clearable />
        </el-form-item>

        <!-- 姓名搜索：文本输入框 -->
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable />
        </el-form-item>

        <!-- 性别搜索：下拉选择框 -->
        <el-form-item label="性别">
          <el-select v-model="searchForm.gender" placeholder="请选择" clearable>
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>

        <!-- 年级搜索：下拉选择框，使用 gradeOptions 数据 -->
        <el-form-item label="年级">
          <el-select v-model="searchForm.grade" placeholder="请选择" clearable>
            <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <!-- 班级搜索：下拉选择框，使用 classOptions 数据 -->
        <el-form-item label="班级">
          <el-select v-model="searchForm.className" placeholder="请选择" clearable>
            <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <!-- 创建时间范围搜索：日期范围选择器 -->
        <el-form-item label="创建时间">
          <el-date-picker v-model="searchForm.createTimeRange" type="daterange" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="YYYY-MM-DD" />
        </el-form-item>

        <!-- 搜索和重置按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格卡片：包含数据表格和分页组件 -->
    <el-card shadow="never" style="margin-top: 16px">
      <!-- 
        数据表格组件
        :data：表格数据源
        v-loading：加载时显示 loading 动画
        stripe：斑马纹效果（隔行变色）
        border：显示表格边框
      -->
      <el-table :data="tableData" v-loading="loading" stripe border style="width: 100%">
        <el-table-column prop="studentId" label="学号" min-width="120" />
        <el-table-column prop="name" label="姓名" min-width="100" />
        <el-table-column prop="gender" label="性别" min-width="80" />

        <!-- 年级列：使用模板插槽拼接"年级"后缀 -->
        <el-table-column prop="grade" label="年级" min-width="80">
          <template #default="{ row }">{{ row.grade }}年级</template>
        </el-table-column>

        <!-- 班级列：使用模板插槽拼接"班"后缀 -->
        <el-table-column prop="className" label="班级" min-width="80">
          <template #default="{ row }">{{ row.className }}班</template>
        </el-table-column>

        <!-- 创建时间列：使用 formatTime 函数格式化 -->
        <el-table-column label="创建时间" min-width="170">
          <template #default="{ row }">{{ formatTime(row.createTime) }}</template>
        </el-table-column>

        <!-- 更新时间列：使用 formatTime 函数格式化 -->
        <el-table-column label="更新时间" min-width="170">
          <template #default="{ row }">{{ formatTime(row.updateTime) }}</template>
        </el-table-column>

        <!-- 操作列：固定到右侧，包含编辑和删除按钮 -->
        <el-table-column label="操作" fixed="right" min-width="160">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 
        分页组件
        v-model:current-page：双向绑定当前页码
        v-model:page-size：双向绑定每页条数
        :page-sizes：可选的每页条数列表
        :total：数据总数
        layout：分页组件布局（总条数、每页条数选择器、上一页、页码、下一页、跳转输入框）
      -->
      <div class="pagination-wrapper">
        <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
/* 分页容器：右对齐显示 */
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

/* 搜索表单中的下拉选择框统一宽度 */
.search-card :deep(.el-select) {
  width: 200px;
}
</style>
