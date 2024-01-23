<template>
  <div class="edit-page">
    <h2>Edit Invoice</h2>

    <!-- Display dropdown to select an invoice -->
    <div class="select-wrapper">
      <label for="selectedInvoice">Select Invoice:</label>
      <select id="selectedInvoice" v-model="selectedInvoiceId" @change="loadSelectedInvoice">
        <option value="" disabled>Select an invoice</option>
        <option v-for="invoice in allInvoices" :key="invoice.id" :value="invoice.id">
          {{ invoice.clientName }}
        </option>
      </select>
    </div>

    <!-- Display form to edit the selected invoice -->
    <form v-if="editedInvoice" @submit.prevent="updateInvoice">
      <!-- Client Information -->
      <div class="form-group">
        <label for="clientName">Client Name:</label>
        <input type="text" id="clientName" v-model="editedInvoice.clientName" required />
      </div>

      <div class="form-group">
        <label for="clientAddress">Client Address:</label>
        <textarea id="clientAddress" v-model="editedInvoice.clientAddress"></textarea>
      </div>

      <!-- Invoice Information -->
      <div class="form-group">
        <label for="invoiceNumber">Invoice Number:</label>
        <input type="text" id="invoiceNumber" v-model="editedInvoice.invoiceNumber" required />
      </div>

      <div class="form-group">
        <label for="invoiceDate">Invoice Date:</label>
        <input type="date" id="invoiceDate" v-model="editedInvoice.invoiceDate" required />
      </div>

      <div class="form-group">
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" v-model="editedInvoice.dueDate" required />
      </div>

      <!-- Item Details -->
      <div class="form-group">
        <label for="items">Items:</label>
        <textarea id="items" v-model="editedInvoice.items" placeholder="Enter items and quantities"></textarea>
      </div>

      <!-- Total Amount -->
      <div class="form-group">
        <label for="totalAmount">Total Amount:</label>
        <input type="number" id="totalAmount" v-model="editedInvoice.totalAmount" required />
      </div>

      <!-- Additional Notes -->
      <div class="form-group">
        <label for="additionalNotes">Additional Notes:</label>
        <textarea id="additionalNotes" v-model="editedInvoice.additionalNotes"></textarea>
      </div>

      <div class="button-container">
        <button type="submit">Update Invoice</button>
        <!-- Generate PDF Button -->
        <button @click="generatePDF">Generate PDF</button>
      </div>
    </form>

    <!-- Message when no invoice is selected -->
    <div v-else>
      <p>No invoice selected</p>
    </div>
  
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const allInvoices = store.getters.getAllInvoices;
    const selectedInvoiceId = ref(null);
    const editedInvoice = ref(null);

    onMounted(() => {
      // Set the default selectedInvoiceId to the first invoice
      if (allInvoices.length > 0) {
        selectedInvoiceId.value = allInvoices[0].id;
        loadSelectedInvoice();
      }
    });

    const loadSelectedInvoice = () => {
      const selectedInvoice = store.getters.getInvoiceById(selectedInvoiceId.value);

      // Ensure selected invoice is not null
      if (selectedInvoice) {
        // Assign the selected invoice properties to the editedInvoice
        editedInvoice.value = { ...selectedInvoice };
      }
    };

    const updateInvoice = () => {
      console.log('Invoice updated:', editedInvoice.value);
      // Call store action to update the invoice
      store.dispatch('updateInvoice', editedInvoice.value);
      // Redirect to the history page after updating
      router.push('/history');
    };

    const generatePDF = () => {
      // Create a new jsPDF instance
      const pdf = new jsPDF();
      pdf.addFont('times', 'times', 'normal');
      pdf.setFont('times');

      // Set colors
      const bgColor = '#f9f9f9';
      const textColor = '#000000';
      const noteColor = '#808080';

      // Add background color to the entire PDF
      pdf.setFillColor(bgColor);
      pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');

      // Set text color and other styles
      pdf.setTextColor(textColor);
      pdf.setFontSize(16);

      // Add custom-styled text to the PDF
      pdf.text(`Client Name: ${editedInvoice.value.clientName}`, 20, 20);
      pdf.text(`Client Address: ${editedInvoice.value.clientAddress}`, 20, 30);
      pdf.text(`Invoice Number: ${editedInvoice.value.invoiceNumber}`, 20, 40);
      pdf.text(`Invoice Date: ${editedInvoice.value.invoiceDate}`, 20, 50);
      pdf.text(`Due Date: ${editedInvoice.value.dueDate}`, 20, 60);
      pdf.text(`Items: ${editedInvoice.value.items}`, 20, 70);
      pdf.text(`Total Amount: $${editedInvoice.value.totalAmount}`, 20, 80);

      
      pdf.setTextColor(noteColor);
      pdf.text(`Additional Notes: ${editedInvoice.value.additionalNotes}`, 20, 90);

      // Save the PDF with a unique name 
      pdf.save(`edited_invoice_${editedInvoice.value.invoiceNumber}.pdf`);
    };

    return {
      allInvoices,
      selectedInvoiceId,
      editedInvoice,
      loadSelectedInvoice,
      updateInvoice,
      generatePDF,
    };
  },
};
</script>

<style scoped>
.edit-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #3498db;
}
.select-wrapper {
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 5px;
}

button {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.button-container {
  display: flex;
  justify-content: space-between; 
  margin-top: 10px; 
}

</style>
