import { ref } from 'vue'

export function useFormValidation() {
  const errors = ref({})
  const isValid = ref(true)

  const validateField = (fieldName, value, rules) => {
    if (rules.required && !value?.toString().trim()) {
      errors.value[fieldName] = `${fieldName} is required`
      return false
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.value[fieldName] = `Minimum ${rules.minLength} characters required`
      return false
    }

    delete errors.value[fieldName]
    return true
  }

  const clearError = (fieldName) => {
    delete errors.value[fieldName]
  }

  const clearAllErrors = () => {
    errors.value = {}
  }

  const hasErrors = () => {
    return Object.keys(errors.value).length > 0
  }

  return {
    errors,
    isValid,
    validateField,
    clearError,
    clearAllErrors,
    hasErrors
  }
}
