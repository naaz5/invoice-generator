import { createStore } from 'vuex';

export default createStore({
  state: {
    invoices: [],
  },
  mutations: {
    addInvoice(state, invoice) {
      state.invoices.push({ ...invoice, id: state.invoices.length + 1 });
    },
    updateInvoice(state, updatedInvoice) {
      const index = state.invoices.findIndex((invoice) => invoice.id === updatedInvoice.id);
      if (index !== -1) {
        // Using spread operator to create a new object for reactivity
        state.invoices.splice(index, 1, { ...updatedInvoice });
      }
    },
  },
  actions: {
    saveInvoice({ commit }, invoice) {
      commit('addInvoice', invoice);
    },
    updateInvoice({ commit }, updatedInvoice) {
      commit('updateInvoice', updatedInvoice);
    },
  },
  getters: {
    getAllInvoices: (state) => state.invoices,
    getInvoiceById: (state) => (id) => state.invoices.find((invoice) => invoice.id === id),
  },
});
