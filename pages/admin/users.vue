<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <v-row>
      <v-col>
        <v-card elevation="0" color="#F8F8F8" class="pa-0">
          <v-row>
            <v-col>
              <v-card-title class="ml-5">Users</v-card-title>
              <v-card-subtitle>
                <v-breadcrumbs :items="crumbsItems">
                  <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                  </template>
                </v-breadcrumbs>
              </v-card-subtitle>
            </v-col>
            <v-icon color="#7B0000" size="40" class="mr-5" @click="logout()">mdi-logout</v-icon>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
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
              <template v-slot:[`item.action`] = '{ item }'>
                <v-btn
                  x-small
                  color="#4E776F"
                  outlined
                  fab
                  @click="
                    dialog = true
                    slctItem = item
                  "
                  ><v-icon>mdi-lead-pencil</v-icon></v-btn
                >
              </template>
              <template v-slot:[`item.id`] = '{ index }'>
                {{( index + 1)}}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" max-width="790">
        <v-card>
          <v-card-title class="text-h5"> Regster New User </v-card-title>
          <v-card-text class="pl-4 pr-4">
            <validation-observer ref="form">
              <v-row>
                <v-col>
                  <label class="mb-3">Full Names </label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-text-field
                      v-model="names"
                      hint="Full Names"
                      :error="errors[0] ? true : false"
                      outlined
                      type="text"
                      dense
                      class="new-group-field"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col>
                  <label class="mb-3">Phone </label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-text-field
                      v-model="Phone"
                      hint="Phone Number"
                      :error="errors[0] ? true : false"
                      outlined
                      type="text"
                      dense
                      class="new-group-field"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <label class="mb-3">Prorince </label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-autocomplete
                      v-model="province"
                      :items="provinceItems"
                      outlined
                      dense
                      :error="errors[0] ? true : false"
                      chips
                      small-chips
                      label="Province"
                      @change="getDistricts()"
                    ></v-autocomplete>
                  </validation-provider>
                </v-col>
                <v-col>
                  <label class="mb-3">District </label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-autocomplete
                      v-model="district"
                      :items="districtItems"
                      outlined
                      dense
                      :error="errors[0] ? true : false"
                      chips
                      small-chips
                      label="district"
                      @change="getSectors()"
                    ></v-autocomplete>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <label class="mb-3">Sector </label>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <v-autocomplete
                      v-model="sector"
                      :items="sectorItems"
                      outlined
                      dense
                      :error="errors[0] ? true : false"
                      chips
                      small-chips
                      label="Sector"
                    ></v-autocomplete>
                  </validation-provider>
                </v-col>
              </v-row>
            </validation-observer>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="
                dialog = false
                title = ''
              "
            >
              Cancel
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="submit()"
              :loading="saveLoading"
            >
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
        { text: 'Names', value: 'fullname' },
        { text: 'Phone Number', value: 'phone' },
        { text: 'Province', value: 'province' },
        { text: 'District', value: 'district' },
        { text: 'Sector', value: 'sector' },
        { text: 'Action', value: 'action' },
      ],
      loading: false,
      saveLoading: false,
      UserItems: [],
      search: '',
      slctItem: [],
      Phone: '',
      names: '',
      province: '',
      provinceItems: [],
      district: '',
      districtItems: [],
      sector: '',
      sectorItems: [],
    }
  },
  mounted() {
    this.getUsers()
    this.getProvinces()
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/')
    },
    submit() {
      this.saveLoading = true
      this.$axios
        .post('addUser', {
          name: this.names,
          phone: this.Phone,
          location: this.sector
        })
        .then((res) => {
          this.getUsers()
          this.$toast.success(res.data.message)
        })
        .finally(() => {
          this.saveLoading = false
          this.dialog = false
        })
    },
    getUsers() {
      this.loading = true
      this.$axios
        .get('getUsers')
        .then((res) => {
          this.UserItems = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },

    getProvinces() {
      this.$axios.get("getProvinces")
      .then(res => {
        this.provinceItems = res.data.data
      })
    },
    getDistricts() {
      this.$axios.get("getDistricts/" + this.province)
      .then(res => {
        this.districtItems = res.data.data
      })
    },
    getSectors() {
      this.$axios.get("getSector/" + this.district)
      .then(res => {
        this.sectorItems = res.data.data
      })
    },
  },
}
</script>
