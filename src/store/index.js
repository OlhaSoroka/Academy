import Vue from "vue";
import Vuex from "vuex";
import courses from "./modules/courses";
import user from "./modules/user";
import users from "./modules/users";
import mentors from "./modules/mentors.store";
import toast from "./modules/toast.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    courses,
    user,
    users,
    mentors,
    toast,
  },
});
