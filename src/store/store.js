import { createStore } from 'vuex';

export const store = createStore({
  state: () => ({
    users: [] // Initialize users array
  }),
  getters: {},
  mutations: {
    SAVE_USERS(state, users) {
      state.users = users; // Update users array
    }
  },
  actions: {
    async loadUsers({ commit }) { // Make the action asynchronous
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const json = await response.json();
        commit('SAVE_USERS', json); // Commit mutation to save users
        console.log(json);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  }
});
