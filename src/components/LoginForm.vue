<template>
  <div class="loginform">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        {{ user }}
        <BaseInput
          type="email"
          label="Email"
          vid="email"
          placeholder="aaa@gmail.com"
          @input="receiveEmail"
        />
        <BaseInput
          type="password"
          label="Password"
          vid="password"
          placeholder="qwe123"
          @input="receivePassword"
        />

        <BaseButton variant="btn_green" 
                    type="submit"> Submit </BaseButton>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import BaseButton from "@/components/BaseButton";
import BaseInput from "@/components/BaseInput";
import { mapGetters, mapActions } from "vuex";
import { logIn } from "@/api/user/index";

export default {
  name: "LoginForm",
  components: {
    ValidationObserver,
    BaseButton,
    BaseInput,
  },
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
    user: "",
  }),
  conputed: {
    ...mapGetters({ user: "user" }),
  },
  methods: {
    ...mapActions(["setUserToState"]),
    onSubmit() {
      logIn(this.formData).then((user) => {
        if (user.stsTokenManager.accessToken) {
          localStorage.setItem("user", JSON.stringify(user));
          this.setUserToState(user);          
        }
        return user;
      });
    },
    receiveEmail(email) {
      this.formData.email = email;
    },
    receivePassword(password) {
      this.formData.password = password;
    },
    logout() {
      localStorage.removeItem("user");
    },
    handleResponse(response) {
      return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if (response.status === 401) {
            this.logout();
          }
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        return data;
      });
    },
  },
};
</script>
