<template>
  <v-row>
    <v-col class="text-center">
      <v-btn @click="reset" block style="color:green">
        RESET
      </v-btn>
      <v-stepper v-model="stepIdx" vertical>
        <v-stepper-step :complete="stepIdx > 1" step="1">
          {{stepData[0].question}}
        </v-stepper-step>
        <v-stepper-content step="1">
          <div class="pa-2 ma-1"  v-for="(item, index) in stepData[0].answers" :key="index">
            <v-btn block @click="chooseOption(item)">
              {{item.title}}
            </v-btn>
          </div>
        </v-stepper-content>
        
        <v-stepper-step :complete="stepIdx > 2" step="2">
          {{stepData[1].question}}
        </v-stepper-step>
        <v-stepper-content step="2">
          <div class="pa-2 ma-1"  v-for="(item, index) in stepData[1].answers" :key="index">
            <v-btn block @click="chooseOption(item)">
              {{item.title}}
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="stepIdx > 3" step="3">
          {{stepData[2].question}}
        </v-stepper-step>
        <v-stepper-content step="3">
          <div class="pa-2 ma-1"  v-for="(item, index) in stepData[2].answers" :key="index">
            <v-btn block @click="chooseOption(item)">
              {{item.title}}
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="stepIdx > 4" step="4">
          {{stepData[3].question}}
        </v-stepper-step>
        <v-stepper-content step="4">
          <div class="pa-2 ma-1"  v-for="(item, index) in stepData[3].answers" :key="index">
            <v-btn block @click="chooseOption(item)">
              {{item.title}}
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="stepIdx > 5" step="5">
          Pick your poison (at most 3)
        </v-stepper-step>
        <v-stepper-content step="5">
          <v-select
          :items="tags"
          v-model="select1"
          label="Standard"
          dense
          ></v-select>
          <v-select
          v-model="select2"
            :items="tags"
            label="Standard"
            dense
          ></v-select>
          <v-select
          v-model="select3"
            :items="tags"
            label="Standard"
            dense
          ></v-select>
          <v-btn block @click="getTag">
            Get your movies
          </v-btn>
        </v-stepper-content>

        <v-stepper-step step="6">
          Your Movie
        </v-stepper-step>
        <v-stepper-content step="6">
          <v-card v-if="loading">
            We are getting you your movies
          </v-card>
          <v-card v-else>
            <div v-if="wholeData.length === 0">
              Sorry, no movie fits your criteria :( Please reset :(
            </div>
            <div v-else>
              <p>Your movie is "{{sl.title}}", created in {{sl.year}} with the length of {{sl.runtime}} minutes. The movie's genres are {{sl.genres}}</p>
              <v-btn :href="'https://www.imdb.com/title/' + sl.id" target="_blank">
                Link to your movie on IMDB
              </v-btn>
            </div>
          </v-card>
        </v-stepper-content>
      </v-stepper>
      <v-btn @click="reset" block style="color:green">
        RESET
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  computed: {
    wholeData() {
      return this.$store.state.movie.wholeData;
    },
    loading() {
      return this.$store.state.movie.loading;
    }
  },
  methods: {
    chooseOption(item) {
      this.stepIdx++;
      console.log(item);
      this.$store.dispatch('movie/push', item);
      // this.pushLayer(layer);
    },
    procQ() {
      this.$store.dispatch('movie/proc');
    },
    clDel() {
      localStorage.removeItem("MOOV_DATA");
    },
    reset() {
      this.stepIdx = 1;
      this.$store.dispatch('movie/reset');
    },
    getTag() {
      let lst = [this.select1, this.select2, this.select3];
      for (let tag of lst) {
        if (tag) {
          this.$store.dispatch('movie/push', {
            op: (movie) => movie.genres.includes(tag)
          });
        }
      }
      this.stepIdx++;
      this.$store.dispatch('movie/proc');
    }
  },
  watch: {
    loading(e) {
      if (!e) {
        let index = Math.floor(Math.random() * this.wholeData.length);
        this.sl = this.wholeData[index];
      }
    }
  },
  data() {
    return {
      stepIdx: 1,
      select1: null,
      select2: null,
      select3: null,
      sl: {"id": "tt3882074", "rating": 7.4, "votes": 3895, "title": "The Eagle Huntress", "year": 2016, "runtime": 87, "genres": ["Adventure","Documentary","Sport"]},
      tags: ['Adventure', 'Drama', 'Fantasy', 'Crime', 'Horror', 'History', 'Comedy', 'War', 'Romance', 'Action', 'Mystery', 'Thriller', 'Sci-Fi', 'Western', 'Family', 'Documentary', 'Biography', 'Animation', 'Sport', 'Music', 'Musical', 'Film-Noir', 'Adult', 'News'], 
      stepData: [
        {
          question: "How old should the movie be ?",
          answers: [{
            title: "Newly released",
            op: (movie) => movie.year >= 2021
          }, {
            title: "The last 5 years",
            op: (movie) => movie.year >= 2017
          }, {
            title: "The last 20 years",
            op: (movie) => movie.year >= 2000
          }, {
            title: "The old school (from 70s til now)",
            op: (movie) => movie.year >= 1970
          }, {
            title: "I'm a historian (all time)",
            op: (movie) => true
          }]
        },
        {
          question: "How long should your movie be ?",
          answers: [{
            title: "At most 1 hours",
            op: (movie) => movie.runtime <= 60
          }, {
            title: "From 1 to 1.5 hours",
            op: (movie) => movie.runtime >= 60 && movie.runtime <= 150
          }, {
            title: "From 1.5 to 2 hours",
            op: (movie) => movie.runtime >= 90 && movie.runtime <= 120
          }, {
            title: "From 2 to 2.5 hours",
            op: (movie) => movie.runtime >= 120 && movie.runtime <= 150
          }, {
            title: "I have the whole day",
            op: (movie) => true
          }]
        },
        {
          question: "How quality should the movie be ?",
          answers: [{
            title: "Whatever",
            op: (movie) => true
          }, {
            title: "An okay movie",
            op: (movie) => movie.rating >= 6.0
          }, {
            title: "A nice movie (maybe)",
            op: (movie) => movie.rating >= 7.0
          }, {
            title: "Superb",
            op: (movie) => movie.rating >= 8.0
          }, {
            title: "One of the bst",
            op: (movie) => movie.rating >= 9.0
          }]
        },
        {
          question: "How popular should the movie be ?",
          answers: [{
            title: "Whatever",
            op: (movie) => true
          }, {
            title: "Small fanclub on reddit",
            op: (movie) => movie.rating >= 10000
          }, {
            title: "Very well-known",
            op: (movie) => movie.votes >= 100000
          }, {
            title: "Every movies fan knows",
            op: (movie) => movie.votes >= 500000
          }]
        }
      ]
    }
  }
}
</script>
