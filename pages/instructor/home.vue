<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app class="default-background">
    <v-row>
      <v-col>
        <v-card elevation="0" color="#F8F8F8">
          <v-card-title>Hi, {{ user.name }}</v-card-title>
          <v-card-subtitle>You are welcome to Dashboard</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pl-3 pr-3">
      <v-col cols="12" lg="4" md="4" sm="4">
        <v-card class="m-2">
          <v-row justify="space-between">
            <v-col>
              <v-row justify="center">
                <v-col cols="1" class="ml-3 mr-2" align-self="center">
                  <v-icon
                    color="#100058"
                    x-large
                    style="padding: 7px !important"
                  >
                    mdi-account-group
                  </v-icon>
                </v-col>
                <v-col class="ml-5">
                  <v-card-title> Students </v-card-title>
                  <v-card-subtitle> 00000 </v-card-subtitle>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="4">
        <v-card class="m-2">
          <v-row justify="space-between">
            <v-col>
              <v-row justify="center">
                <v-col cols="1" class="ml-3 mr-2" align-self="center">
                  <v-icon
                    color="#2C7221"
                    x-large
                    style="padding: 7px !important"
                  >
                    mdi-currency-usd
                  </v-icon>
                </v-col>
                <v-col>
                  <v-card-title> Total payments </v-card-title>
                  <v-card-subtitle> 1,000,000 Rwf </v-card-subtitle>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="4">
        <v-card class="m-2">
          <v-row justify="space-between">
            <v-col>
              <v-row justify="center">
                <v-col cols="1" class="ml-3 mr-2" align-self="center">
                  <v-icon
                    color="#930000"
                    x-large
                    style="padding: 7px !important"
                  >
                    mdi-cash-clock
                  </v-icon>
                </v-col>
                <v-col>
                  <v-card-title> Current Subscription </v-card-title>
                  <v-card-subtitle> 1,000 </v-card-subtitle>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pl-3 pr-3 mt-5 pt-5">
      <v-col>
        <v-card>
          <v-row justify="space-between" class="pl-4 pr-4">
            <v-card-title> List Of Courses </v-card-title>
            <v-btn
              elevation="0"
              color="green darken-3"
              dark
              class="mt-3"
              @click="addVideos = true"
              >New Course <v-icon>mdi-plus</v-icon></v-btn
            >
          </v-row>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="caseItems"
              :search="search"
              :loading="loading"
            >
              <template #[`item.action`]="{ item }">
                <v-btn
                  small
                  outlined
                  color="primary"
                  @click="
                    isDetails = true
                    questions = item
                  "
                  >View</v-btn
                >
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="addVideos" cols="12" lg="5" md="5" sm="5">
        <v-card>
          <v-row justify="space-between" class="pl-4 pr-4">
            <v-card-title> New Instractor </v-card-title>
            <v-btn
              x-small
              class="mr-3 mt-3"
              @click="addVideos = false"
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
                <label contenteditable="true">Names </label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="userName"
                    :error="errors[0] ? true : false"
                    outlined
                    type="text"
                    dense
                    class="new-group-field"
                  ></v-text-field>
                </validation-provider>
                <label>User Phone</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="userPhone"
                    :error="errors[0] ? true : false"
                    dense
                    outlined
                    class="new-group-field"
                  ></v-text-field>
                </validation-provider>
                <label>User Email</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="userEmail"
                    :error="errors[0] ? true : false"
                    dense
                    outlined
                    class="new-group-field"
                  ></v-text-field>
                </validation-provider>

                <label>Prefered Language</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="lang"
                    :items="langs"
                    item-value="id"
                    item-text="name"
                    :error="errors[0] ? true : false"
                    dense
                    outlined
                    class="new-group-field"
                  ></v-select>
                </validation-provider>
              </v-col>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="info"
                elevation="0"
                @click="submit"
                :loading="loading"
                :disabled="btnDisabled"
              >
                Save
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" max-width="590">
        <v-card>
          <v-card-title class="text-h5"> New Course </v-card-title>

          <v-card-text>
            <validation-observer ref="form">
              <v-card-text class="py-0">
                <v-col class="pb-0">
                  <label contenteditable="true">Names </label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-text-field
                      v-model="userName"
                      :error="errors[0] ? true : false"
                      outlined
                      type="text"
                      dense
                      class="new-group-field"
                    ></v-text-field>
                  </validation-provider>
                  <label>User Phone</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-text-field
                      v-model="userPhone"
                      :error="errors[0] ? true : false"
                      dense
                      outlined
                      class="new-group-field"
                    ></v-text-field>
                  </validation-provider>
                  <label>User Email</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-text-field
                      v-model="userEmail"
                      :error="errors[0] ? true : false"
                      dense
                      outlined
                      class="new-group-field"
                    ></v-text-field>
                  </validation-provider>

                  <label>Prefered Language</label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-select
                      v-model="lang"
                      :items="langs"
                      item-value="id"
                      item-text="name"
                      :error="errors[0] ? true : false"
                      dense
                      outlined
                      class="new-group-field"
                    ></v-select>
                  </validation-provider>
                </v-col>
              </v-card-text>
              <!-- <v-card-actions class="justify-end">
                <v-btn
                  color="info"
                  elevation="0"
                  @click="submit"
                  :loading="loading"
                  :disabled="btnDisabled"
                >
                Save
                </v-btn>
              </v-card-actions> -->
            </validation-observer>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">
              Disagree
            </v-btn>

            <v-btn
              color="green darken-1"
              dark
              elevation="0"
              @click="dialog = false"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: true,
          value: 'date',
        },
        { text: 'Names', value: 'names' },
        { text: 'Phone', value: 'phone' },
        { text: 'Category', value: 'category' },
        { text: 'Attorney', value: 'attorney' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action' },
      ],
      caseItems: [],
      withAtt: '',
      hasAtt: false,
      loading: false,
      dialog: false,
      user: [],
      addVideos: false,
    }
  },
  mounted() {
    this.getCases()
    // eslint-disable-next-line no-undef
    if (process.browser) {
      if (localStorage.getItem('profile'))
        this.user = JSON.parse(localStorage.getItem('profile'))
      if (this.user.position === '1') {
        this.withAtt = 'With Attorney'
        this.isAdmin = true
      } else {
        this.withAtt = 'My Cases'
        this.isAdmin = false
      }
    }
  },
  methods: {
    getCases(hasAttorney = 0) {
      this.loading = true
      this.$axios
        .get('getCasesAdmin/' + hasAttorney)
        .then((res) => {
          this.caseItems = res.data
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    getChartData() {
      this.$axios
        .get('getAllData')
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res.data)
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response.data)
        })
    },
    takeCase() {
      this.$axios
        .post('takeCase', {
          caseId: this.questions.id,
        })
        .then((res) => {
          this.$toast.success(res.data.message)
          this.isDetails = false
          this.questions = []
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message)
        })
    },
    closeCase() {
      this.$axios
        .post('closeCase', {
          caseId: this.questions.id,
        })
        .then((res) => {
          this.$toast.success(res.data.message)
          this.isDetails = false
          this.questions = []
        })
    },
  },
}
</script>

<style scoped>
.v-application--wrap {
  background: #f8f8f8 !important;
}
</style>
