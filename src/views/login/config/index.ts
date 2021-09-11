export const rules = {
  name: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_-]{4,16}$/,
      message: '账号4~16位(字母、数字、下划线、减号)',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_-]{6,18}$/,
      message: '密码6~18位(字母、数字、下划线、减号)',
      trigger: 'blur'
    }
  ]
}
