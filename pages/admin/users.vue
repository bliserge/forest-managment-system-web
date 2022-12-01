<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <h2 style="color: #424242" class="ml-4">Users</h2>
    <v-breadcrumbs :items="crumbsItems">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row class="pl-4 pr-4 mt-5">
      <v-col>
        <v-card>
          <v-row>
            <v-card-title class="ml-3">Users</v-card-title>
            <v-spacer />
            <v-btn
              color="primary"
              class="mt-5 mr-5"
              elevation="0"
              @click="dialog = true"
            >
              New Users
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-row>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="UserItems"
              :search="search"
              :loading="loading"
            >
            <template v-slot:[`item.action`]>
              <v-btn outlined color="#4E776F" @click="isNewPost = true; getDeptFormItems() ; getDeductionsForm()">add Post</v-btn>
            </template>
            </v-data-table>
          </v-card-text> </v-card
        >
      </v-col>
      <v-col v-if="isNewPost" cols="12" md="5" lg="5">
        <v-card>
          <v-row justify="space-between" class="pl-4 pr-4">
            <v-card-title> Add Post in User </v-card-title>
            <v-btn
              x-small
              class="mr-3 mt-3"
              @click="isNewPost = false"
              fab
              elevation="0"
              color="error"
              dark
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-row>
          <validation-observer ref="form">
            <v-card-text class="py-0">
              <v-col class="pb-0">
                <label contenteditable="true">Post Title </label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="postTitle"
                    :error="errors[0] ? true : false"
                    outlined
                    type="text"
                    dense
                    class="new-group-field"
                  ></v-text-field>
                </validation-provider>
                <label>User</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="postDept"
                    :error="errors[0] ? true : false"
                    :items="deptFormItems"
                    dense
                    outlined
                    class="new-group-field"
                  ></v-select>
                </validation-provider>
                <v-divider inset/>
                <v-card-subtitle>
                  Finances
                </v-card-subtitle>
                <label>Salary</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="salary"
                    :error="errors[0] ? true : false"
                    dense
                    outlined
                    class="new-group-field"
                  ></v-text-field>
                </validation-provider>
                <label>Deductions</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-autocomplete
                    v-model="postddct"
                    :error="errors[0] ? true : false"
                    :items="ddtionItems"
                    dense
                    outlined
                    class="new-group-field"
                    chips
                    small-chips
                    multiple
                  ></v-autocomplete>
                </validation-provider>
              </v-col>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="info"
                elevation="0"
                @click="addJobPost"
                :loading="saveLoading"
                :disabled="saveLoading">
                Save
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" max-width="490">
        <v-card>
          <v-card-title class="text-h5">
            User title
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
          text: 'Users',
          disabled: true,
          href: 'Users',
        },
      ],
      dialog: false,
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: 'Names', value: 'name' },
        { text: 'Phone Number', value: 'phone' },
        { text: 'Province', value: 'province' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action' },
      ],
      title: '',
      loading: false,
      saveLoading: false,
      UserItems: [],
      search: '',
      isNewPost: false,
      postTitle: '',
      postDept: '',
      salary: '',
      postddct: [],
      deptFormItems: [],
      ddtionItems: [],
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    submit() {
      this.saveLoading = true
      this.$axios
        .post('addUser', {
          title: this.title,
        })
        .then((res) => {
          this.getUsers()
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
        .finally(() => {
          this.saveLoading = false
          this.dialog = false
        })
    },
    getUsers() {
      this.loading = true
      this.$axios.get("getUsers")
      .then(res => {
        this.UserItems = res.data.data
      })
      .finally(() => {
        this.loading = false
      })
    },

    getDeptFormItems() {
      this.$axios.get("getUsersForm")
      .then(res => {
        this.deptFormItems = res.data.data
      })
    },
    getDeductionsForm() {
      this.$axios.get("getDeductionsForm")
      .then(res => {
        this.ddtionItems = res.data.data
      })
    },
    addJobPost() {
      this.saveLoading = true
      this.$axios.post(
        "addJobPost",
        {
          title : this.postTitle,
          deptId: this.postDept,
          salary: this.salary,
          ddctn : this.postddct
        }
      )
      .then(res => {
        console.log(res.data);
      })
      .finally(() => {
        this.saveLoading = false
        this.isNewPost = false
        this.postTitle = ''
        this.postDept = ''
        this.salary = ''
        this.postddct =[]
      })
    }
    
  },
}
</script>
