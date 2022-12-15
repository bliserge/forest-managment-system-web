<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app class="default-background">
    <v-row>
      <v-col>
        <v-card elevation="0" color="#F8F8F8">
          <v-row>
            <v-col>
              <v-card-title>Hi, {{user.name}}</v-card-title>
              <v-card-subtitle>You are welcome to Dashboard</v-card-subtitle>
            </v-col>
            <v-icon color="#7B0000" size="40" class="mr-5" @click="logout1()"
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
                  <v-card-title> All Forest </v-card-title>
                  <v-card-subtitle> 00000 </v-card-subtitle>
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
                    mdi-currency-usd
                  </v-icon>
                </v-col>
                <v-col>
                  <v-card-title>Harvest Requests </v-card-title>
                  <v-card-subtitle> 1,000,000 Rwf </v-card-subtitle>
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
                    mdi-currency-usd
                  </v-icon>
                </v-col>
                <v-col>
                  <v-card-title> Approved Request</v-card-title>
                  <v-card-subtitle> 1,000,000 Rwf </v-card-subtitle>
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
    <v-row class="pl-4 pr-4 mt-5">
      <v-col>
        <v-card>
          <v-row>
            <v-card-title class="ml-3">Recent Actvities</v-card-title>
            <v-spacer />
          </v-row>
          <v-card-text>
            <v-tabs background-color="#4e776f" centered dark icons-and-text>
              <v-tab>Planted trees</v-tab>
              <v-tab>Harvest Requests</v-tab>
              <v-tab>Forest registration</v-tab>
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
          </v-card-text> </v-card
        >`
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  components: {},
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
          text: 'Date',
          align: 'start',
          sortable: true,
          value: 'date',
        },
        { text: 'Names', value: 'name' },
        { text: 'Phone', value: 'phone' },
        { text: 'District', value: 'district' },
        { text: 'Sector', value: 'sector' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action' },
      ],
      requestItems: [],
      loading: false,
      saveLoading: false,
      isDetails: false,
      isNew: false,
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
      user: [],
    }
  },
  mounted() {
    // this.getAllEmployees()
    // eslint-disable-next-line no-undef
    if (process.browser) {
      if (localStorage.getItem('profile'))
        this.user = JSON.parse(localStorage.getItem('profile'))

      this.getAllPlantations()
      this.getAllRequests()
      this.getForests()
    }
  },
  methods: {
    getAllRequests() {
      this.loading = true
      this.$axios
        .get('getAllRequest')
        .then((res) => {
          this.requestItems = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    getAllPlantations() {
      this.loading = true
      this.$axios
        .get('getAllPlatations')
        .then((res) => {
          this.treesItems = res.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    getForests() {
      this.$axios.get("getForests")
      .then(res => {
        this.forestItems = res.data
      })
    },
    logout1() {
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
