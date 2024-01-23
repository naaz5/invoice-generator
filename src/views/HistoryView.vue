<template>
  <div class="history-page">
    <h2>Invoice History</h2>
    <ul>
      <li v-for="invoice in invoices" :key="invoice.id">
        <strong>Client Name:</strong> {{ invoice.clientName }}<br>
        <strong>Billing Address:</strong> {{ invoice.billingAddress }}<br>
        <strong>Invoice Number:</strong> {{ invoice.invoiceNumber }}<br>
        <strong>Invoice Date:</strong> {{ invoice.invoiceDate }}<br>
        <strong>Due Date:</strong> {{ invoice.dueDate }}<br>
        <strong>Items:</strong> {{ invoice.items }}<br>
        <strong>Total Amount:</strong> ${{ invoice.amount }}<br>
        <strong>Additional Notes:</strong> {{ invoice.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const invoices = ref([]);

    onMounted(() => {
      // Fetch saved invoices from the store on component mount
      invoices.value = store.getters.getAllInvoices;
    });

    return {
      invoices,
    };
  },
};
</script>

<style scoped>
.history-page {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  color: #3498db;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  margin: 10px 0;
  padding: 15px;
}
</style>
