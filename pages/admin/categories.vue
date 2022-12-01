<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <h2 style="color: #424242" class="ml-4">Categories</h2>
    <v-breadcrumbs :items="crumbsItems">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row class="pl-4 pr-4 mt-5">
      <v-col>
        <v-card>
          <v-row>
            <v-card-title class="ml-3">Categories</v-card-title>
            <v-spacer />
            <v-btn
              color="primary"
              class="mt-5 mr-5"
              elevation="0"
              @click="dialog = true"
            >
              New Categories
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-row>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="categoriesItems"
              :search="search"
              :loading="loading"
            >
            <template v-slot:[`item.action`]>
              <v-btn outlined color="red darken-3" small fab @click="isNewPost = true;"><v-icon>mdi-delete</v-icon></v-btn>
            </template>
            </v-data-table>
          </v-card-text> </v-card
        >
      </v-col>
      <v-dialog v-model="dialog" max-width="490">
        <v-card>
          <v-card-title class="text-h5">
            Tree categories
          </v-card-title>
          <v-card-text class="pl-4 pr-4">
            <validation-observer ref="form">
              <label contenteditable="true">Title </label>
              <validation-provider rules="required" v-slot="{ errors }">
                <v-text-field
                  v-model="title"
                  :error="errors[0] ? true : false"
                  outlined
                  type="text"
                  dense
                  class="new-group-field"
                ></v-text-field>
              </validation-provider>
              <label contenteditable="true">Days To Harvest </label>
              <validation-provider rules="required" v-slot="{ errors }">
                <v-text-field
                  v-model="days"
                  :error="errors[0] ? true : false"
                  outlined
                  type="text"
                  dense
                  class="new-group-field"
                ></v-text-field>
              </validation-provider>
            </validation-observer>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false; title = ''">
              Cancel
            </v-btn>

            <v-btn color="green darken-1" text @click="submit()" :loading="saveLoading">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      crumbsItems: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '',
        },
        {
          text: 'Home',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Categories',
          disabled: true,
          href: 'Categories',
        },
      ],
      dialog: false,
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: true,
          value: 'value',
        },
        { text: 'Title', value: 'text' },
        { text: 'Days to harvest', value: 'days' },
        { text: 'Action', value: 'action' },
      ],
      title: '',
      loading: false,
      saveLoading: false,
      categoriesItems: [],
      search: '',
      isNewPost: false,
      days: '',
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    submit() {
      this.saveLoading = true
      this.$axios
        .post('addNewTreeCategory', {
          title: this.title,
          days: this.days
        })
        .then((res) => {
          this.$toast.success(res.data.message, {
            position: 'top-right'
          })
          this.getCategories()
        })
        .finally(() => {
          this.saveLoading = false
          this.dialog = false
        })
    },
    getCategories() {
      this.loading = true
      this.$axios.get("getAllTreeCategories")
      .then(res => {
        this.categoriesItems = res.data.data
      })
      .finally(() => {
        this.loading = false
      })
    },
    
  },
}
</script>
