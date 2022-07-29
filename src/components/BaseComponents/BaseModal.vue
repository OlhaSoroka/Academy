<template>
  <div>
    <transition name="fade">
      <div
        v-if="show"
        class="modal"
      >
        <div
          class="modal__backdrop"
          @click="closeModal()"
        />

        <div class="modal__dialog">
          <div class="modal__header">
            {{ header }}
          </div>

          <div class="modal__body">
            <slot name="body" />
          </div>

          <div class="modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },

  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },
  },
};
/* 
 use example: 
  <div @click="$refs.modal.openModal()">LoginView</div>     ===>   use $ref to open or close modal 
  <BaseModal :header="'Custom Header' ref="modal">           ===>   header text comes from props
    <template v-slot:body><h1>Custom content</h1></template>  ===>   slot for custom content
    <template v-slot:footer>                                      
      <div class="mx-2 inline-block">
        <BaseButton @click="confirm" :variant="'btn_green'>Yes</BaseButton> ===> slot for adding buttons with custom methods
      </div>
      <div class="mx-2 inline-block">
        <BaseButton @click="cancel" :variant="'btn_red'">No</BaseButton>     
      </div>
    </template>
  </BaseModal>
*/
</script>

<style lang="postcss" scoped>
.modal {
  @apply overflow-x-hidden overflow-y-auto fixed top-0 right-0 bottom-0 left-0 z-20;
}

.modal__backdrop {
  @apply bg-black opacity-30 fixed top-0 right-0 bottom-0 left-0 z-10 p-2;
}
.modal__dialog {
  @apply bg-white relative w-2/6 my-60 mx-auto flex flex-col rounded-md z-20 p-3;
}

.modal__dialog {
  @apply bg-white relative w-2/5 my-60 mx-auto flex flex-col rounded-md z-20 p-3;
}

.modal__header {
  @apply px-5 pt-3.5 flex align-middle justify-center font-semibold text-2xl;
}

.modal__body {
  @apply px-5 pt-2.5 flex flex-col items-center overflow-auto;
}

.modal__footer {
  @apply px-5 pt-2.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
