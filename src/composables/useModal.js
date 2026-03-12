import { ref } from 'vue'

export function useModal() {
  const isOpen = ref(false)
  const modalData = ref(null)

  const openModal = (data = null) => {
    modalData.value = data
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
    modalData.value = null
  }

  const toggleModal = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    toggleModal
  }
}
