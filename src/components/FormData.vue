<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Dynamic Form</v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container v-if="formBlocks" class="d-flex justify-space-between">
                  <div v-for="(block, index) in formBlocks" :key="index" class="pb-6 mb-6">
                    <h3>{{ block.title }}</h3>

                    <v-row v-for="(field, fieldIndex) in block.fields" :key="fieldIndex">
                      <v-col cols="12">
                        <template v-if="field.type === 'text' || field.type === 'email' || field.type === 'date'">
                          <v-text-field v-if="field.type !== 'date'" :label="field.label" :type="field.type"
                            v-model="formData[index][field.name]" :required="field.required"
                            :error-messages="getFieldErrorMessages(index, field.name)"></v-text-field>
                          <v-date-picker v-else :label="field.label" v-model="formData[index][field.name]"
                            :required="field.required"
                            :error-messages="getFieldErrorMessages(index, field.name)"></v-date-picker>
                        </template>
                        <template v-else-if="field.type === 'checkbox'">
                          <v-checkbox v-model="formData[index][field.name]" :label="field.label"
                            :required="field.required"
                            :error-messages="getFieldErrorMessages(index, field.name)"></v-checkbox>
                        </template>
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="submitForm" v-on:click="$emit('button-clicked', post)" variant="outlined" color="success"
                depressed>Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>FormData</v-card-title>
            <!-- <v-card-text>
              {{ tableData }}
              <v-data-table :headers="headers" :items="tableData" item-key="id"></v-data-table>
            </v-card-text> -->
            <v-table>
              <!-- <template> -->
              <thead>
                <tr>
                  <th class="text-center">ID</th>
                  <th class="text-center">Name</th>
                  <th class="text-center">Email</th>
                  <th class="text-center">Birthdate</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableData" :key="index">
                  <td :style="item.estado ? 'text-decoration:line-through;' : 'text-decoration:none;'"
                    class="text-center">{{ item.id }}</td>
                  <td class="text-center"><v-chip close-icon="mdi-close-outline" dark
                      :color="item.estado ? 'green' : ''">{{ item.name }}</v-chip></td>
                  <td class="text-center"><v-btn id="mark" depressed color="primary">{{ item.email }}</v-btn></td>
                  <td class="text-center"><v-btn id="edit" depressed color="primary">{{ item.birthdate }}</v-btn></td>
                </tr>
              </tbody>
              <!-- </template> -->
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const post = ref('verified')
    const formBlocks = ref([
      {
        title: 'Block 1',
        fields: [
          { label: 'Name', name: 'name', type: 'text', required: true },
          { label: 'Email', name: 'email', type: 'email', required: true },
          { label: 'Birth Date', name: 'birthdate', type: 'date', required: true },
          { label: 'Subscribe', name: 'subscribe', type: 'checkbox', required: true }
        ]
      },
      {
        title: 'Block 2',
        fields: [
          { label: 'Name', name: 'name', type: 'text', required: true },
          { label: 'Email', name: 'email', type: 'email', required: true },
          { label: 'Birth Date', name: 'birthdate', type: 'date', required: true },
          { label: 'Subscribe', name: 'subscribe', type: 'checkbox', required: true }
        ]
      },
      // Add more blocks as needed
    ]);

    const formData = ref([]);
    const headers = [
      { text: 'ID', value: 'id' },
      { text: 'Name', value: 'name' },
      // Add more headers as needed
    ];
    const tableData = ref([
      // Add more table data as needed
    ]);

    function initFormData() {
      formData.value = formBlocks.value.map(block => {
        const fields = {};
        block.fields.forEach(field => {
          fields[field.name] = field.type === 'date' ? new Date() : '';
        });
        return fields;
      });
    }

    initFormData();

    function validateForm() {
      let isValid = true;
      formBlocks.value.forEach((block, index) => {
        block.fields.forEach(field => {
          if (field.required && !formData.value[index][field.name]) {
            isValid = false;
          }
          if (field.type === 'email' && formData.value[index][field.name]) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.value[index][field.name])) {
              isValid = false;
            }
          }
          if (field.type === 'date' && formData.value[index][field.name]) {
            // Date validation logic can be added here if needed
          }
          if (field.type === 'checkbox' && field.required && !formData.value[index][field.name]) {
            isValid = false;
          }
        });
      });
      return isValid;
    }

    function getFieldErrorMessages(blockIndex, fieldName) {
      const field = formBlocks.value[blockIndex].fields.find(field => field.name === fieldName);
      if (!field.required) return []; // No error messages if field is not required
      if (field.type === 'checkbox' && !formData.value[blockIndex][fieldName]) {
        return [`Field "${field.label}" is required.`];
      }
      if (!formData.value[blockIndex][fieldName]) {
        return [`Field "${field.label}" is required.`];
      }
      if (field.type === 'email' && formData.value[blockIndex][fieldName]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.value[blockIndex][fieldName])) {
          return [`Invalid email format for "${field.label}".`];
        }
      }
      // Additional validation for other field types can be added here
      return [];
    }

    function submitForm() {
      const isFormValid = validateForm();
      if (isFormValid) {
        // Push form data into tableData array
        formData.value.forEach((item, index) => {

          tableData.value.push({
            id: tableData.value.length + 1,
            name: formData.value[index].name,
            email: formData.value[index].email,
            birthdate: formData.value[index].birthdate,
            subscribe: formData.value[index].subscribe ? 'Yes' : 'No'
          });
        })
        

        console.log('Table data:', tableData.value);

        // Clear form data
        initFormData();
      } else {
        // If form is not valid, focus on the first invalid field
        const firstInvalidField = document.querySelector('.v-text-field.error--text, .v-checkbox.error--text, .v-date-picker.error--text') || null;
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        console.error('Form validation failed.');
      }
    }

    return {
      formBlocks,
      formData,
      headers,
      tableData,
      submitForm,post,
      getFieldErrorMessages
    };
  }
};
</script>
