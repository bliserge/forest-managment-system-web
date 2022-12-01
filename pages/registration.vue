<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <body>
      <main class="d-flex w-100">
        <div class="container d-flex flex-column">
          <div class="row vh-100">
            <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
              <div class="d-table-cell align-middle">
                <div class="card">
                  <div class="card-body">
                    <div class="text-center mt-4">
                      <h1 class="h2">Welcome to forest managment system</h1>
                      <p class="lead">Register your account to continue</p>
                    </div>
                    <div class="m-sm-4">
                      <div class="text-center">
                        <img
                          src="@/assets/images/avatars/avatar.jpg"
                          alt="Charles Hall"
                          class="img-fluid rounded-circle"
                          width="132"
                          height="132"
                        />
                      </div>
                      <div class="mb-3">
                        <validation-observer ref="form">
                          <label>Personal info</label>
                          <v-row>
                            <v-col>
                              <label class="mb-3"
                                >Full Names
                              </label>
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
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
                              <label class="mb-3"
                                >Phone
                              </label>
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
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
                          <label class="mb-3"
                            >ID Number
                          </label>
                          <validation-provider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="idNumber"
                              hint="ID Number"
                              :error="errors[0] ? true : false"
                              outlined
                              type="text"
                              dense
                              class="new-group-field"
                            ></v-text-field>
                          </validation-provider>
                          <label class="mb-3"
                            >Password
                          </label>
                          <validation-provider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="Password"
                              hint="Password"
                              :error="errors[0] ? true : false"
                              outlined
                              type="password"
                              dense
                              class="new-group-field"
                            ></v-text-field>
                          </validation-provider>
                          <v-divider inset class="mt-4" />
                          <label>Adress</label>
                          <v-row>
                            <v-col>
                              <label class="mb-3"
                                >Prorince
                              </label>
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
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
                              <label class="mb-3"
                                >District
                              </label>
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
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
                              <label class="mb-3"
                                >Sector
                              </label>
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <v-autocomplete
                                  v-model="sector"
                                  :items="sectorItems"
                                  outlined
                                  dense
                                  :error="errors[0] ? true : false"
                                  chips
                                  small-chips
                                  label="Sector"
                                  @change="getCells()"
                                ></v-autocomplete>
                              </validation-provider>
                            </v-col>
                            <v-col>
                              <label class="mb-3"
                                >Cell
                              </label>
                              <validation-provider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <v-autocomplete
                                  v-model="cell"
                                  :items="cellItems"
                                  outlined
                                  dense
                                  :error="errors[0] ? true : false"
                                  chips
                                  small-chips
                                  label="Cell"
                                ></v-autocomplete>
                              </validation-provider>
                            </v-col>
                          </v-row>
                        </validation-observer>
                        <div class="mb-3">
                          <small>
                            <!-- <a href="pages-reset-password.html">Forgot password?</a> -->
                            <nuxt-link to="/">
                              <a>Have an account? Login</a>
                            </nuxt-link>
                          </small>
                        </div>
                        <div class="text-center mt-3">
                          <button @click="register()" class="btn btn-lg btn-primary">
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
  </v-app>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'
export default {
  layout: 'auth',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      Phone: '',
      Password: '',
      names: '',
      idNumber: '',
      province: '',
      provinceItems: [],
      district: '',
      districtItems: [],
      sector: '',
      sectorItems: [],
      cell: '',
      cellItems: [],
    }
  },
  mounted() {
    this.getProvinces()
  },
  methods: {
    register() {
      this.$axios.post("register",{
        name: this.names,
        phone: this.Phone,
        password: this.Password,
        location: this.cell,
        id: this.idNumber,
      })
      .then(res => {
        this.$toast.success(res.data.message, {
          position: 'top-right'
        })
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
    getCells() {
      this.$axios.get("getCells/" + this.sector)
      .then(res => {
        this.cellItems = res.data.data
      })
    },
  },
}
</script>
