<!-- 
  学生表单页面
  * 
  * 此页面用于新增或编辑学生信息，通过路由参数区分模式：
  * - /students/add：新增模式
  * - /students/edit/:studentId：编辑模式
  * 
  * 功能包括：
  * - 表单校验（必填项检查）
  * - 新增/编辑模式自动切换
  * - 编辑时自动加载现有数据
  * - 提交成功后返回列表页
 -->
<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getStudentByStudentId, addStudent, updateStudent } from '@/api/student'

// useRoute：获取当前路由信息，用于获取动态参数（如 studentId）和判断模式
const route = useRoute()
// useRouter：路由实例，用于页面跳转
const router = useRouter()

/**
 * 判断当前是否为编辑模式
 * 如果路由参数中存在 studentId，则为编辑模式
 */
const isEdit = computed(() => !!route.params.studentId)

/**
 * 表单组件引用
 * 用于调用表单的 validate 方法进行校验
 */
const formRef = ref(null)

/**
 * 表单数据对象
 * reactive 是 Vue 3 的响应式 API，适合复杂对象
 */
const form = reactive({
  studentId: '',     // 学号（编辑时自动填充，新增时为空）
  name: '',          // 姓名
  gender: '',        // 性别
  grade: '',         // 年级
  className: ''      // 班级
})

/**
 * 表单校验规则
 * 每个字段可以配置多个规则，如 required、min、max、pattern 等
 * trigger：触发校验的时机（blur 失去焦点、change 值变化）
 */
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  grade: [{ required: true, message: '请选择年级', trigger: 'change' }],
  className: [{ required: true, message: '请选择班级', trigger: 'change' }]
}

/**
 * 年级选项：1-12年级
 * 使用 Array.from 动态生成，避免手写 12 个对象
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
 * 加载学生数据（编辑模式）
 * 根据路由中的 studentId 从 API 获取学生信息并填充到表单
 */
async function loadStudentData() {
  try {
    const res = await getStudentByStudentId(route.params.studentId)
    const student = res.data
    // 将后端返回的数据映射到表单字段
    form.studentId = student.studentId
    form.name = student.name
    form.gender = student.gender
    form.grade = student.grade
    form.className = student.className
  } catch {
    ElMessage.error('加载学生信息失败')
  }
}

/**
 * 表单提交处理
 * 1. 校验表单
 * 2. 根据模式调用不同的 API（新增/更新）
 * 3. 成功后返回列表页
 */
async function handleSubmit() {
  // 确保表单引用存在
  if (!formRef.value) return
  
  // 执行表单校验，校验不通过会抛出异常
  await formRef.value.validate()
  
  try {
    // 构建提交数据（学号不需要提交，后端自动生成）
    const data = {
      name: form.name,
      gender: form.gender,
      grade: form.grade,
      className: form.className
    }
    
    // 根据模式调用不同的 API
    if (isEdit.value) {
      // 编辑模式：更新学生信息
      await updateStudent(route.params.studentId, data)
      ElMessage.success('更新成功')
    } else {
      // 新增模式：添加新学生
      await addStudent(data)
      ElMessage.success('新增成功')
    }
    
    // 提交成功后返回列表页
    router.push('/students')
  } catch {
    // 校验不通过或接口异常时不执行任何操作
    // 校验错误会自动在表单字段下方显示错误信息
  }
}

/**
 * 返回按钮处理
 * 直接跳转到学生列表页
 */
function handleBack() {
  router.push('/students')
}

/**
 * 组件挂载时执行
 * 如果是编辑模式，加载学生数据
 */
onMounted(() => {
  if (isEdit.value) {
    loadStudentData()
  }
})
</script>

<template>
  <!-- 表单页面容器 -->
  <div class="student-form">
    <!-- 卡片容器：shadow="never" 表示不显示阴影 -->
    <el-card shadow="never">
      <!-- 卡片头部：根据模式显示不同的标题 -->
      <template #header>
        <span>{{ isEdit ? '编辑学生信息' : '新增学生信息' }}</span>
      </template>
      
      <!-- 
        表单组件
        ref="formRef"：表单引用，用于调用 validate 方法
        :model="form"：表单数据绑定
        :rules="rules"：校验规则绑定
        label-width="100px"：标签宽度
        style="max-width: 500px"：表单最大宽度，避免过宽影响美观
      -->
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        style="max-width: 500px"
      >
        <!-- 学号字段：仅在编辑模式下显示，禁用编辑 -->
        <el-form-item v-if="isEdit" label="学号">
          <el-input v-model="form.studentId" disabled />
        </el-form-item>
        
        <!-- 姓名字段：必填，有校验规则 -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        
        <!-- 性别字段：必填，下拉选择 -->
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        
        <!-- 年级字段：必填，下拉选择，使用 gradeOptions 数据 -->
        <el-form-item label="年级" prop="grade">
          <el-select v-model="form.grade" placeholder="请选择年级">
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        
        <!-- 班级字段：必填，下拉选择，使用 classOptions 数据 -->
        <el-form-item label="班级" prop="className">
          <el-select v-model="form.className" placeholder="请选择班级">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">{{ isEdit ? '更新' : '提交' }}</el-button>
          <el-button @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
