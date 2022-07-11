<template>
  <div class="loginform">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider
          name="E-mail"
          rules="required|email"
          v-slot="{ errors }"
        >
          <div class="my-2">
            <label>Email</label>
            <input
              type="email"
              v-model="formData.email"
              class="
                px-4
                my-2
                min-w-full
                mx-auto
                border border-grey-500
                rounded-full
                focus:outline-none focus:ring-1 focus:border-blue-300
              "
            />
            <span class="text-center text-red-500">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider
          name="Password"
          rules="required|max:15|min:6"
          v-slot="{ errors }"
        >
          <div class="my-2">
            <label>Password</label>
            <input
              type="password"
              v-model="formData.password"
              class="
                px-4
                my-2
                min-w-full
                mx-auto
                border border-grey-500
                rounded-full
                focus:outline-none focus:ring-1 focus:border-blue-300
              "
            />
            <span class="text-center text-red-500">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <BaseButton variant="btn_green" 
        @click="onSubmit"> Submit </BaseButton>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { ValidationObserver } from "vee-validate";
import BaseButton from "@/components/BaseButton";
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  components: {
    ValidationProvider,
    ValidationObserver,
    BaseButton,
  },
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions(["setUserToState"]),
    onSubmit() {
      this.login(this.formData.email, this.formData.password);
    },
    login(email, password) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      };
      return fetch(
        "https://inventorsoft-vue-2022-users.herokuapp.com/firebase/login",
        requestOptions
      )
        .then(this.handleResponse)
        .then((user) => {
          if (user.stsTokenManager) {
            localStorage.setItem("user", JSON.stringify(user));
            this.setUserToState(user);
          }
          return user;
        });
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
