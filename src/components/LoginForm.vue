<template>
  <div class="loginform">
    <ValidationObserver v-slot="{ handleSubmit }"> 
        <form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
                <div class="my-2">
                    <label>Email</label>
                    <input 
                        type="email"                         
                        v-model="formData.email"
                        class="px-4 my-2 min-w-full mx-auto border border-grey-500 rounded-full focus:outline-none focus:ring-1 focus:border-blue-300">
                    <span class="text-center text-red-500">{{ errors[0]}}</span>
                </div>    
            </ValidationProvider>    

            <ValidationProvider name="Password" rules="required|max:15|min:6" v-slot="{ errors }">
                <div class="my-2">
                    <label>Password</label>
                    <input 
                        type="password"                         
                        v-model="formData.password"
                        class="px-4 my-2 min-w-full mx-auto border border-grey-500 rounded-full focus:outline-none focus:ring-1 focus:border-blue-300">
                    <span class="text-center text-red-500">{{ errors[0]}}</span>
                </div>    
            </ValidationProvider>    
            <input 
                type="submit" 
                class="border rounded-full bg-sky-400 hover:bg-sky-700 px-6 py-2 my-4" value="Submit">            

        </form>    
    </ValidationObserver>
  </div>
  
</template>

<script>

import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate'

export default {
  name: "LoginForm",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
  }),
  methods: { 
    onSubmit() {
        console.log(this.formData) 
    }
  }
};
</script>
