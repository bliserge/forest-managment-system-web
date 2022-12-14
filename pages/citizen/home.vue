<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app class="default-background">
    <v-row>
      <v-col>
        <v-card elevation="0" color="#F8F8F8">
          <v-row>
            <v-col>
              <v-card-title>Hi, John</v-card-title>
              <v-card-subtitle>You are welcome to Dashboard</v-card-subtitle>
            </v-col>
            <v-icon color="#7B0000" size="40" class="mr-5" @click="logout()"
              >mdi-logout</v-icon
            >
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pl-3 pr-3">
      <v-col cols="12" lg="3" md="3" sm="3">
        <v-card
          class="m-2 top"
          style="border-bottom: 10px solid #100058 !important"
        >
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
                  <v-card-title> My Forest </v-card-title>
                  <v-card-subtitle> 002 </v-card-subtitle>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="3">
        <v-card
          class="m-2 top"
          style="border-bottom: 10px solid #a58a05 !important"
        >
          <v-row justify="space-between">
            <v-col>
              <v-row justify="center">
                <v-col cols="1" class="ml-3 mr-2" align-self="center">
                  <v-icon
                    color="#A58A05"
                    x-large
                    style="padding: 7px !important"
                  >
                    mdi-package
                  </v-icon>
                </v-col>
                <v-col>
                  <v-card-title>Harvest Requests </v-card-title>
                  <v-card-subtitle> 0002 </v-card-subtitle>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="3">
        <v-card
          class="m-2 top"
          style="border-bottom: 10px solid #2c7221 !important"
        >
          <v-row justify="space-between">
            <v-col>
              <v-row justify="center">
                <v-col cols="1" class="ml-3 mr-2" align-self="center">
                  <v-icon
                    color="#2C7221"
                    x-large
                    style="padding: 7px !important"
                  >
                    mdi-package-check
                  </v-icon>
                </v-col>
                <v-col>
                  <v-card-title> Approved Request</v-card-title>
                  <v-card-subtitle> 0002 </v-card-subtitle>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="3" sm="3">
        <v-card
          class="m-2 top"
          style="border-bottom: 10px solid #930000 !important"
        >
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
                  <v-card-title>Trees Harvested </v-card-title>
                  <v-card-subtitle> 1,000 </v-card-subtitle>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pl-4 pr-4 mt-5" v-if="!isNewPlot">
      <v-col>
        <v-card>
          <v-row>
            <v-card-title class="ml-3">Recent Actvities</v-card-title>
            <v-spacer />
            <v-btn
              elevation="0"
              color="primary"
              v-if="isTrees"
              class="mr-5 mt-3"
              @click="dialog = true"
              >Register New Tress Planted
              <v-icon>mdi-plus-circle</v-icon></v-btn
            >
            <v-btn
              elevation="0"
              color="primary"
              v-if="isRequest"
              class="mr-5 mt-3"
              @click="dialogRequest = true"
              >Request Harvest <v-icon>mdi-plus-circle</v-icon></v-btn
            >
            <v-btn
              elevation="0"
              color="primary"
              v-if="isPlot"
              class="mr-5 mt-3"
              @click="isNewPlot = true"
              >Register New Forest <v-icon>mdi-plus-circle</v-icon></v-btn
            >
          </v-row>
          <v-card-text>
            <v-tabs background-color="#4e776f" centered dark icons-and-text>
              <v-tab
                @click="
                  isTrees = true
                  isRequest = false
                  isPlot = false
                "
                >Planted trees</v-tab
              >
              <v-tab
                @click="
                  isTrees = false
                  isRequest = true
                  isPlot = false
                "
                >Harvest Requests</v-tab
              >
              <v-tab
                @click="
                  isTrees = false
                  isRequest = false
                  isPlot = true
                "
                >Forest registration</v-tab
              >
              <v-tab-item>
                <v-data-table
                  :headers="treesHeaders"
                  :items="treesItems"
                  :search="search"
                  :loading="loading"
                >
                </v-data-table>
              </v-tab-item>
              <v-tab-item>
                <v-data-table
                  :headers="headers"
                  :items="requestItems"
                  :search="search"
                  :loading="loading"
                >
                </v-data-table>
              </v-tab-item>
              <v-tab-item>
                <v-data-table
                  :headers="forestHeaders"
                  :items="forestItems"
                  :search="search"
                  :loading="loading"
                >
                </v-data-table>
              </v-tab-item>
            </v-tabs>
            <v-dialog v-model="dialog" max-width="490">
              <v-card>
                <v-card-title class="text-h5"
                  >Register New Plantation</v-card-title
                >
                <v-card-text class="pl-4 pr-4">
                  <validation-observer ref="form">
                    <label contenteditable="true">Forest (*choose using UPI) </label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-autocomplete
                        v-model="forest"
                        :error="errors[0] ? true : false"
                        :items="forestItems"
                        outlined
                        dense
                        chips
                        small-chips
                        label="Outlined"
                        multiple
                      ></v-autocomplete>
                    </validation-provider>
                    <label contenteditable="true">Category </label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-autocomplete
                        v-model="category"
                        :error="errors[0] ? true : false"
                        :items="categoryItems"
                        outlined
                        dense
                        chips
                        small-chips
                        label="Outlined"
                        multiple
                      ></v-autocomplete>
                    </validation-provider>
                    <label contenteditable="true">Quantity</label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-text-field
                        v-model="quantity"
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
                    @click="saveRequest()"
                    :loading="saveLoading"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogRequest" max-width="490">
              <v-card>
                <v-card-title class="text-h5"
                  >Register New Plantation</v-card-title
                >
                <v-card-text class="pl-4 pr-4">
                  <validation-observer ref="form">
                    <label contenteditable="true">Forest (*choose using UPI) </label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-autocomplete
                        v-model="forest"
                        :error="errors[0] ? true : false"
                        :items="forestItems"
                        outlined
                        dense
                        chips
                        small-chips
                        label="Outlined"
                        multiple
                      ></v-autocomplete>
                    </validation-provider>
                    <label contenteditable="true">Tree Category </label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-autocomplete
                        v-model="category"
                        :error="errors[0] ? true : false"
                        :items="categoryItems"
                        outlined
                        dense
                        chips
                        small-chips
                        label="Outlined"
                        multiple
                      ></v-autocomplete>
                    </validation-provider>
                    <label contenteditable="true">Quantity</label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-text-field
                        v-model="quantity"
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
                    @click="savePlantation()"
                    :loading="saveLoading"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-text> </v-card
        >`
      </v-col>
    </v-row>
    <v-row v-if="isNewPlot" justify="center" class="mt-5 mr-2 ml-2">
      <v-col cols="12" md="12" lg="12">
        <v-card>
          <v-row justify="space-between" class="pl-4 pr-4">
            <v-col>
              <v-card-title> Register Forest </v-card-title>
              <v-card-subtitle> Fill out this form </v-card-subtitle>
            </v-col>
            <v-btn
              x-small
              class="mr-3 mt-3"
              @click="isNewPlot = false"
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
                <v-row>
                  <v-col>
                    <label contenteditable="true">Forest UPI </label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-text-field
                        v-model="upi"
                        :error="errors[0] ? true : false"
                        outlined
                        type="text"
                        dense
                        class="new-group-field"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col>
                    <label>Forest Area (in m<sup>2</sup>)</label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-text-field
                        v-model="area"
                        :error="errors[0] ? true : false"
                        dense
                        outlined
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
                        @change="getCells()"
                      ></v-autocomplete>
                    </validation-provider>
                  </v-col>
                  <v-col>
                    <label class="mb-3">Cell </label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-autocomplete
                        v-model="cell"
                        :items="cellItems"
                        outlined
                        dense
                        :error="errors[0] ? true : false"
                        chips
                        small-chips
                        label="Cell"
                        @change="getvillages()"
                      ></v-autocomplete>
                    </validation-provider>
                  </v-col>
                  <v-col>
                    <label class="mb-3">Village </label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-autocomplete
                        v-model="village"
                        :items="villageItems"
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
                <v-row>
                  <v-col>
                    <label class="mb-3">Forest owner permission (.pdf) </label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-file-input
                        v-model="pdfFiles"
                        color="green darken-4"
                        counter
                        dense
                        accept=".pdf"
                        label="Permission"
                        :error="errors[0] ? true : false"
                        placeholder="Select your UPI pdf file"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="green darken-4"
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>

                          <span
                            v-else-if="index === 2"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                    </validation-provider>
                  </v-col>
                  <v-col>
                    <label class="mb-3">Picture of land UPI (*Image) </label>
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-file-input
                        v-model="imgFiles"
                        color="red darken-4"
                        counter
                        dense
                        accept="image/*"
                        label="UPI Image"
                        :error="errors[0] ? true : false"
                        placeholder="Select your UPI image files"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="red darken-4"
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>

                          <span
                            v-else-if="index === 2"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                    </validation-provider>
                  </v-col>
                </v-row>
              </v-col>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="info"
                elevation="0"
                @click="saveForest()"
                :loading="saveLoading"
                :disabled="saveLoading"
              >
                Save
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </v-card>
      </v-col>
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
      pieChartData: {
        labels: ['Sold', 'In stock', 'damaged'],
        datasets: [
          {
            data: [100, 50, 20],
            backgroundColor: ['#46BFBD', '#FDB45C', '#E30415'],
            hoverBackgroundColor: ['#5AD3D1', '#FFC870', '#FC2638'],
          },
        ],
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            color: 'white',
            align: 'left',
            font: {
              size: 16,
            },
            formatter: (value) => {
              const [dataset] = this.pieChartData.datasets
              const setValue = dataset.data.reduce((a, b) => a + b)

              return `${Math.round((value / setValue) * 100)}%`
            },
          },
        },
      },
      barChartData: {
        labels: ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C'],
        datasets: [
          {
            label: '# of Members',
            data: [32, 72, 54, 32, 72, 54, 32, 72, 54, 32, 72, 54],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
          ],
        },
      },
      search: '',
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: 'Names', value: 'names' },
        { text: 'Phone', value: 'phone' },
        { text: 'District', value: 'district' },
        { text: 'Sector', value: 'sector' },
        { text: 'Status', value: 'status' },
        // { text: 'Action', value: 'action' },
      ],
      forestHeaders: [
        {
          text: '#',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: 'Owner Names', value: 'names' },
        { text: 'UPI', value: 'text' },
        { text: 'Area', value: 'area' },
        { text: 'Sector', value: 'sector' },
      ],
      forestItems:[],
      requestItems: [
        {
          id: 1,
          names: 'John',
          phone: '07842314',
          district: 'Gasabo',
          sector: 'Gisozi',
          status: 'Pending',
        },
        {
          id: 2,
          names: 'John',
          phone: '07842314',
          district: 'Gasabo',
          sector: 'Gisozi',
          status: 'Approved',
        },
      ],
      loading: false,
      saveLoading: false,
      isDetails: false,
      isNewPlot: false,
      genderItems: [
        { value: 'M', text: 'Male' },
        { value: 'F', text: 'Female' },
      ],
      treesHeaders: [
        {
          text: 'Date',
          align: 'start',
          sortable: true,
          value: 'date',
        },
        { text: 'Names', value: 'names' },
        { text: 'Phone', value: 'phone' },
        { text: 'District', value: 'district' },
        { text: 'Sector', value: 'sector' },
        { text: 'Number of Tress', value: 'trees' },
      ],
      treesItems: [],
      isTrees: true,
      isRequest: false,
      isPlot: false,
      dialog: false,
      dialogRequest: false,
      category: '',
      quantity: '',
      categoryItems: [],
      province: '',
      provinceItems: [],
      district: '',
      districtItems: [],
      sector: '',
      sectorItems: [],
      cell: '',
      cellItems: [],
      village: '',
      villageItems: [],
      upi: '',
      area: '',
      pdfFiles: [],
      imgFiles: [],
      forest: '',
    }
  },
  mounted() {
    // this.getAllEmployees()
    // eslint-disable-next-line no-undef
    if (process.browser) {
      if (localStorage.getItem('profile'))
        this.user = JSON.parse(localStorage.getItem('profile'))
        
      this.getProvinces()
      this.getAllPlantations()
      this.getAllRequests()
      this.getForests()
      this.getCategories()
    }
  },
  methods: {
    getCategories() {
      this.loading = true
      this.$axios.get("getAllTreeCategories")
      .then(res => {
        this.categoryItems = res.data.data
      })
      .finally(() => {
        this.loading = false
      })
    },
    getAllRequests() {
      this.loading = true
      this.$axios
        .get('getAllRequests/'+this.user.id)
        .then((res) => {
          this.requestItems = res.data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    getAllPlantations() {
      this.loading = true
      this.$axios
        .get('getAllPlatations/'+this.user.id)
        .then((res) => {
          this.treesItems = res.data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    getProvinces() {
      this.$axios.get('getProvinces').then((res) => {
        this.provinceItems = res.data.data
      })
    },
    getDistricts() {
      this.$axios.get('getDistricts/' + this.province).then((res) => {
        this.districtItems = res.data.data
      })
    },
    getSectors() {
      this.$axios.get('getSector/' + this.district).then((res) => {
        this.sectorItems = res.data.data
      })
    },
    getCells() {
      this.$axios.get('getCells/' + this.sector).then((res) => {
        this.cellItems = res.data.data
      })
    },
    getvillages() {
      this.$axios.get('getvillages/' + this.cell).then((res) => {
        this.villageItems = res.data.data
      })
    },
    saveForest() {
      let formData = new FormData()
      formData.append('province', this.province)
      formData.append('district', this.district)
      formData.append('sector', this.sector)
      formData.append('cell', this.cell)
      formData.append('village', this.village)
      formData.append('upi', this.upi)
      formData.append('area', this.area)
      formData.append('pdfFiles', this.pdfFiles)
      formData.append('imgFiles', this.imgFiles)
      formData.append('uid', this.user.id)

      this.$axios
        .post('saveForest', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.$toast.success(res.data.message, {
            position: 'top-right',
          })
        })
        .finally(() => {
          this.isTrees = false
          this.isRequest = false
          this.isPlot = true
          this.isNewPlot = false
          this.getForests()
        })
    },
    getForests() {
      this.$axios.get("getForests/"+this.user.id)
      .then(res => {
        this.forestItems = res.data
      })
    },
    saveRequest() {
      this.$axios.post(
        "saveRequest",
        {
          forest: this.forest,
          trc: this.category,
          qty: this.quantity,
          owner: this.user.id
        }
      )
      .then(res => {
        this.$toast.success(res.data.message, {
            position: 'top-right',
          })
      })
      .finally(() => {
        this.dialogRequest = false
      })
    },
    savePlantation() {
      this.$axios.post(
        "",
        {
          forest: this.forest,
          trc: this.category,
          qty: this.quantity,
          owner: this.user.id
        }
      )
      .then(res => {
        this.$toast.success(res.data.message, {
            position: 'top-right',
          })
      })
      .finally(() => {
        this.dialog = false
      })
    },
    logout() {
      localStorage.clear()
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.v-application--wrap {
  background: #f8f8f8 !important;
}
</style>
