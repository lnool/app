export const accountRules = {
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

export const phoneRules = {
  num: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: '手机号码格式不正确',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    {
      pattern: /^\d{6}$/,
      message: '请输入6位验证码',
      trigger: 'blur'
    }
  ]
}
