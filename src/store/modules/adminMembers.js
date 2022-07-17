import {
  getAllUsers,
  updateUserByID,
  registerUser,
  deleteUserById,
} from "../../api/user/index";
const token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXVkIjoiaW52ZW50b3Jzb2Z0LXZ1ZS0yMDIyLWQ1NjZjIiwiYXV0aF90aW1lIjoxNjU4MDQ1MzUwLCJ1c2VyX2lkIjoiOTFLeE11NkxyRWdFUE5kWDFsS3hhTXZISFFNMiIsInN1YiI6IjkxS3hNdTZMckVnRVBOZFgxbEt4YU12SEhRTTIiLCJpYXQiOjE2NTgwNDUzNTAsImV4cCI6MTY1ODA0ODk1MCwiZW1haWwiOiJ3ZWJwb3J0YWxhZG1pbkBpbnZlbnRvcnNvZnQuY28iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2VicG9ydGFsYWRtaW5AaW52ZW50b3Jzb2Z0LmNvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.FZiTaIFB78C23F__0MQplPyoT9sWTn37mTdDf1F_lWPkkv5Q2HJZsfEFb25y0MH7V_8NhhhVbYARrjADPmS0VMUEEUBDTI90e92z3pa3On7UVFzU98WSL9mrwroHqmC-GHNJS8WNME02hAXCeT0ZoUGWXm4IRYrKT4WuAIjivJteffZthVQVZIxsRUFDGA_YdgnYKwHN17lweMZCEItUG1mq9JznevhkRpmN6n4s5FBhhGytrppibtAbxB8l37NkpUYyvp_Pt2-QAafAuBCyCorjpwRS1MHPTcggg_PQ6bKyXcUhZFuhm4-n1B4aCoMPHB0S7tcv6ykJPVl_Rme6zQ";

export default {
  state() {
    return {
      users: null,
      usersToggleLoading: true,
    };
  },

  getters: {
    users: (state) => state.users,
    usersLoadingStatus: (state) => state.usersToggleLoading,
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_LOADIN_STATUS(state) {
      state.usersToggleLoading = !state.usersToggleLoading;
    },
  },

  actions: {
    async fetchUsers(store) {
      const users = await getAllUsers(token);
      store.commit("SET_USERS", users);
      store.commit("SET_LOADIN_STATUS");
    },
    async updateUser(store, data) {
      await updateUserByID(data.id, data, token);
      store.dispatch("fetchUsers");
    },
    async createNewUser(store, data) {
      await registerUser(data);
      store.dispatch("fetchUsers");
    },
    async deleteUser(store, id) {
      await deleteUserById(id, token);
      store.dispatch("fetchUsers");
    },
  },
};
