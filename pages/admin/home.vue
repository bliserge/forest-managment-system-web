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
        <v-card class="m-2" >
          <v-row justify="space-between">
            <v-col>
              <v-row justify="center">
                <v-col cols="1" class="ml-3 mr-2" align-self="center">
                  <v-icon color="#100058" x-large style="padding: 7px !important">
                    mdi-account-group
                  </v-icon>
                </v-col>
                <v-col class="ml-5">
                  <v-card-title>
                    Students
                  </v-card-title>
                  <v-card-subtitle>
                    00000
                  </v-card-subtitle>
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
                  <v-icon color="#2C7221" x-large style="padding: 7px !important">
                    mdi-currency-usd
                  </v-icon>
                </v-col>
                <v-col>
                  <v-card-title>
                    Total payments
                  </v-card-title>
                  <v-card-subtitle>
                    1,000,000 Rwf
                  </v-card-subtitle>
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
                  <v-icon color="#930000" x-large style="padding: 7px !important">
                    mdi-cash-clock
                  </v-icon>
                </v-col>
                <v-col>
                  <v-card-title>
                    Current Subscription
                  </v-card-title>
                  <v-card-subtitle>
                    1,000
                  </v-card-subtitle>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="isAdmin" class="pl-3 pr-3">
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-card>
          <v-card-title>regestratoin Stats</v-card-title>
          <v-card-text>
            <mdb-container>
              <mdb-bar-chart
                :data="barChartData"
                :options="barChartOptions"
                :width="1000"
                :height="400"
              ></mdb-bar-chart>
            </mdb-container>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" lg="2" md="2" sm="2"> </v-col> -->
    </v-row>
    <v-row class="pl-3 pr-3">
      <v-col>
        <v-card>
          <v-card-title> Recent payments </v-card-title>
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
    </v-row>
  </v-app>
</template>

<script>
import { mdbBarChart, mdbContainer } from 'mdbvue'
export default {
  components: {
    mdbBarChart,
    mdbContainer,
  },
  data() {
    return {
      lineChartData: {
        labels: [
          'Jan',
          'Feb',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'sept',
          'oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Offering Rate',
            backgroundColor: 'transparent',
            borderColor: 'rgb(20,18,31)',
            borderWidth: 2,
            data: [50, 5, 100, 60, 110, 80, 150, 100, 120, 40, 200, 150],
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
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
      lineHasData: true,
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
      isAdmin: false,
      isDetails: false,
      user: [],
      questions: [],
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