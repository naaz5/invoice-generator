
<template>
  <div class="create-invoice-page">
    <h2>Create Invoice</h2>
    <form @submit.prevent="submitAndGeneratePDF">
      <!-- Client Information -->
      <div class="form-group">
        <label for="clientName">Client Name:</label>
        <input type="text" id="clientName" v-model="invoice.clientName" required pattern="[A-Za-z ]+" />
      </div>

      <div class="form-group">
        <label for="billingAddress">Billing Address:</label>
        <textarea id="billingAddress" v-model="invoice.billingAddress" required pattern="[A-Za-z0-9 ]+"></textarea>
      </div>

      <!-- Invoice Details -->
      <div class="form-group">
        <label for="invoiceNumber">Invoice Number:</label>
        <input type="text" id="invoiceNumber" v-model="nextInvoiceNumber" readonly />
      </div>

      <div class="form-group">
        <label for="invoiceDate">Invoice Date:</label>
        <input type="date" id="invoiceDate" v-model="invoice.invoiceDate" required />
      </div>

      <div class="form-group">
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" v-model="invoice.dueDate" required />
      </div>

      <!-- Items -->
      <div class="form-group">
        <label for="items">Invoice Items:</label>
        <textarea id="items" v-model="invoice.items" placeholder="Enter items and quantities" required></textarea>
      </div>

      <!-- Amount -->
      <div class="form-group">
        <label for="amount">Total Amount:</label>
        <input type="number" id="amount" v-model="invoice.amount" required pattern="\d*\.?\d*" />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Additional Notes:</label>
        <textarea id="description" v-model="invoice.description"></textarea>
      </div>

      <!-- Merged Submit and Generate PDF Button -->
      <div class="form-group">
        <button type="submit">Submit and Generate PDF</button>
      </div>
    </form>

    <!-- Notification Message -->
    <div v-if="notification" class="notification fixed-notification">
      {{ notification }}
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const invoice = ref({
      clientName: '',
      billingAddress: '',
      invoiceNumber: '',
      invoiceDate: '',
      dueDate: '',
      items: '',
      amount: 0,
      description: '',
    });

    const notification = ref(null);
    const nextInvoiceNumber = ref(1); 

    const pdfData = ref({
      clientName: '',
      billingAddress: '',
      invoiceNumber: '',
      invoiceDate: '',
      dueDate: '',
      items: '',
      amount: 0,
      description: '',
    });

    const submitInvoice = () => {
      console.log('Invoice submitted:', invoice.value);
      store.dispatch('saveInvoice', invoice.value);

      // Show a success message to the user
      notification.value = 'Invoice submitted successfully!';

      // Generate next invoice number
      generateNextInvoiceNumber();

      setTimeout(() => {
        notification.value = null; // Clear the message after a few seconds
      }, 3000);
    };

// Function to generate the PDF with enhanced styling
const generatePDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();
  pdf.addFont('times', 'times', 'normal');
  pdf.setFont('times');

  // Set colors
  const bgColor = '#f9f9f9'; // Background color for the entire PDF
  const textColor = '#000000'; // Text color
  const noteColor = '#808080'; // Color for additional notes

  // Added background color to the entire PDF
  pdf.setFillColor(bgColor);
  pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');

  // Set text color and other styles
  pdf.setTextColor(textColor);
  pdf.setFontSize(16);

  // Added custom-styled text to the PDF
  pdf.text(`Client Name: ${pdfData.value.clientName}`, 20, 20);
  pdf.text(`Billing Address: ${pdfData.value.billingAddress}`, 20, 30);
  pdf.text(`Invoice Number: ${pdfData.value.invoiceNumber}`, 20, 40);
  pdf.text(`Invoice Date: ${pdfData.value.invoiceDate}`, 20, 50);
  pdf.text(`Due Date: ${pdfData.value.dueDate}`, 20, 60);
  pdf.text(`Invoice Items: ${pdfData.value.items}`, 20, 70);
  pdf.text(`Total Amount: $${pdfData.value.amount}`, 20, 80);

  // Set text color for additional notes
  pdf.setTextColor(noteColor);
  pdf.text(`Additional Notes: ${pdfData.value.description}`, 20, 90);

  // Save the PDF with a unique name 
  pdf.save(`invoice_${pdfData.value.invoiceNumber}.pdf`);

  // Show a success message to the user
  notification.value = 'PDF generated successfully!';
  setTimeout(() => {
    notification.value = null; // Clear the message after a few seconds
  }, 3000);
};



    const resetFields = () => {
      // Reset form fields
      invoice.value = {
        clientName: '',
        billingAddress: '',
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
        items: '',
        amount: 0,
        description: '',
      };
    };

    const generateNextInvoiceNumber = () => {
      // Logic to generate the next invoice number
      nextInvoiceNumber.value += 1;
    };

    const submitAndGeneratePDF = () => {
      submitInvoice();
      // Set pdfData to the submitted form data before generating the PDF
      pdfData.value = { ...invoice.value };
      generatePDF();
      // Reset form fields after generating the PDF
      resetFields();
    };

    return {
      invoice,
      notification,
      nextInvoiceNumber,
      submitAndGeneratePDF,
    };
  },
};
</script>

<style scoped>
.create-invoice-page {
  position: relative; /* Ensure relative positioning for child elements */
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

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Styling for fixed notification */
.fixed-notification {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 999; 
}

.notification {
  padding: 10px;
  background-color: #2ecc71;
  color: #fff;
  border-radius: 5px;
  text-align: center;
}
</style>
