<template>
  <BaseModal
    ref="addCommentModal"
    :header="'Add comment'"
  >
    <template #body>
      <div>
        <ValidationProvider rules="required">
          <div class="mt-2">
            <textarea
              v-model="comments"
              class="border"
              cols="45"
              rows="3"
            />
          </div>
          <ValidationObserver v-slot="{ invalid }">
            <form
              class="flex items-center flex-col mt-4"
              @submit.prevent="submit"
            >
              <div class="flex">
                <BaseButton
                  class="mr-4"
                  :disabled="invalid"
                  type="submit"
                >
                  Submit
                </BaseButton>
                <BaseButton
                  :variant="'btn_red'"
                  type="button"
                  @click="cancel"
                >
                  Cancel
                </BaseButton>
              </div>
            </form>
          </ValidationObserver>
        </validationprovider>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
import BaseModal from '@/components/BaseComponents/BaseModal.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
	computed: {
		...mapGetters('courses', ['getCourseById']),
		...mapGetters('user', ['user']),
	},
	components: { BaseModal, BaseButton, ValidationObserver, ValidationProvider },
	props: {
		toggleModal: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			comments: '',
		};
	},
	watch: {
		toggleModal() {
			this.$refs.addCommentModal.openModal();
		},
	},
	methods: {
		...mapActions('courses', ['addNewComment']),
		submit() {
			let currentItem = this.getCourseById(this.$route.params.id);
			currentItem.comments.push({
				id: Date.now(),
				message: this.comments,
				createdAt: new Date().toLocaleString(),
				author: this.user.fullName,
				author_id: this.user.id,
				author_email: this.user.email,
			});
			let payload = {
				currentItemUpdate: currentItem,
				id: this.$route.params.id,
			};
			this.addNewComment(payload);
			this.comments = '';
		},
		cancel() {
			this.comments = '';
			this.$refs.addCommentModal.closeModal();
		},
	},
};
</script>
