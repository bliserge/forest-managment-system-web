<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <v-btn color="primary" outlined>Get Started</v-btn>
      <nuxt-link to="/login"
        ><v-btn color="primary" elevation="0" class="ml-3"
          >Sign In</v-btn
        ></nuxt-link
      >
    </el-header>

    <el-carousel
      :interval="5000"
      arrow="hover"
      height="550px"
      indicator-position="none"
    >
      <el-carousel-item v-for="(item, i) in items" :key="i">
        <img :src="item.src" alt="main-img" style="opacity: 20%" />
        <div style="position: absolute; top: 30%; width: 100%">
          <span style="color: #fff; text-align: center; font-weight: bold"
            ><h1>Lorem ipsum dolor sit amet</h1>
          </span>
          <v-row justify="center" class="mt-5">
            <v-col cols="6">
              <span style="color: #fff; text-align: center"
                >Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed libero sapien, venenatis sed
                diam a, sollicitudin dapibus augue. Phasellus posuere blandit
                libero, vel tincidunt ligula lacinia at
              </span>
              <v-row justify="center" class="mt-5">
                <nuxt-link to="#newCase">
                  <input
                    type="button"
                    class="fadeIn fourth"
                    value="Get Started"
                  />
                </nuxt-link>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="regsterCase">
      <v-row justify="center">
        <v-col cols="12" lg="6" md="6">
          <img
            src="main.png"
            alt="main-img"
            width="600px"
            style="border-radius: 20px"
          />
        </v-col>
        <v-col cols="12" lg="5" md="5" align-self="center">
          <v-row justify="center" class="mb-5">
            <h1>Lorem ipsum dolor sit</h1>
          </v-row>
          <span class="pt-4">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed libero sapien, venenatis sed diam a,
            sollicitudin dapibus augue. Phasellus posuere blandit libero, vel
            tincidunt ligula lacinia at
          </span>
          <v-row class="mt-5">
            <input
              id="login"
              v-model="id"
              type="text"
              placeholder="Enter Id to find your Cases"
              class="fadeIn second"
            />
            <v-btn fab elevation="0" color="primary" @click="getCases()"
              ><v-icon>mdi-magnify</v-icon></v-btn
            >
          </v-row>
          <v-row justify="center" class="mt-5">
            <nuxt-link to="#newCase">
              <!-- <input type="button" class="fadeIn fourth" value="Get Started" /> -->
            </nuxt-link>
          </v-row>
        </v-col>
      </v-row>
    </div>

      <v-row justify="center" v-if="isCases" class="mycases">
        <v-col>
          <h1 class mb-5>Your Submited cases</h1>
          <el-table
            :data="casesItem"
            :default-sort="{ prop: 'date', order: 'descending' }"
            style="width: 86%"
          >
            <el-table-column prop="date" label="Date" sortable>
            </el-table-column>
            <el-table-column prop="names" sortable label="Names">
            </el-table-column>
            <el-table-column prop="phone" label="Phone">
            </el-table-column>
            <el-table-column prop="id_number" label="D Number">
            </el-table-column>
            <el-table-column
              prop="category"
              sortable
              label="Category"
            >
            </el-table-column>
            <el-table-column
              prop="attorney"
              label="Attorney"
              sortable
            >
            </el-table-column>
            <el-table-column prop="status" label="Status" sortable>
            </el-table-column>
            <el-table-column label="Operations">
              <template slot-scope="scope" >
                <el-button
                  size="mini"
                  @click="questions = scope.row; isDetails = true"
                  >View</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </v-col>
        <v-col v-if="isDetails" cols="12" lg="5" md="5">
        <v-card elevation="10">
          <v-card-title>Case Details</v-card-title>
          <v-divider inset/>
          <v-card-text>
            <div width="150px" class="text-muted" v-html="questions.problem" />
          </v-card-text>
          <v-divider inset/>
          <v-card-actions class="justify-end">
            <v-btn outlined color="error" @click="isDetails = false; questions = ''">Cancel</v-btn>
            <v-btn outlined color="warning" @click="handleEdit()">Delete</v-btn>
            <v-btn outlined color="success" @click="handleEdit()">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      </v-row>

    <div id="newCase" class="newC">
      <v-row justify="center">
        <v-col cols="12" lg="5" md="5">
          <v-text-field
            v-model="names"
            label="Names"
            placeholder="Enter Your names"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="phone"
            label="Phone"
            placeholder="Enter your phone"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="idNumber"
            label="ID Number"
            placeholder="Enter Your Id number"
            outlined
            dense
          ></v-text-field>
          <v-autocomplete
            v-model="categoryId"
            :items="caregoriesItems"
            dense
            chips
            small-chips
            label="Category"
            outlined
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" lg="6" md="6">
          <quill
            v-model="caseDetails"
            placeholder="Enter details of your case"
          />
        </v-col>
        <v-btn elevation="0" color="primary" @click="saveCase()"
          >Send Case</v-btn
        >
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      items: [
        {
          src: 'black.jpg',
        },
      ],
      id: '',
      caseDetails: '',
      names: '',
      phone: '',
      idNumber: '',
      categoryId: '',
      caregoriesItems: [],
      casesItem: [],
      questions: [],
      isDetails: false,
      isCases: false,
    }
  },
  mounted() {
    this.getCategores()
  },
  methods: {
    getCategores() {
      this.$axios
        .get('getCategories')
        .then((res) => {
          this.caregoriesItems = res.data.data
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response.data.message)
        })
    },
    saveCase() {
      this.$axios
        .post('saveCase', {
          caseDetails: this.caseDetails,
          names: this.names,
          phone: this.phone,
          idNumber: this.idNumber,
          categoryId: this.categoryId,
        })
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res.data)
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response.data)
        })
    },

    getCases() {
      this.isCases = true
      this.$axios
        .post('getCases', {
          ownerId: this.id,
        })
        .then((res) => {
          this.casesItem = res.data
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err.response.data.message)
        })
    },
    formatter(row, column) {
      return row.address
    },
    handleEdit(idx, data) {

    },
    handleDelete(idx, data) {

    },
  },
}
</script>

<style scoped>
.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
}
.el-carousel__item h3 {
  color: #1b1c1d;
  font-size: 18px;
  opacity: 0.75;
  line-height: 1000px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #020202;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #0f0f0f;
}

input[type='button'],
input[type='submit'],
input[type='reset'] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type='button']:hover,
input[type='submit']:hover,
input[type='reset']:hover {
  background-color: #39ace7;
}

input[type='button']:active,
input[type='submit']:active,
input[type='reset']:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
.regsterCase {
  margin-top: 10%;
  margin-bottom: 10%;
}
.mycases {
  margin-bottom: 10%;
}
.newC {
  margin-bottom: 10%;
}
input[type='text'],
input[type='password'] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type='text']:focus,
input[type='password']:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type='text']:placeholder,
input[type='password']:placeholder {
  color: #cccccc;
}
</style>
