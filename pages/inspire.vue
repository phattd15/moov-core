<template>
  <v-row>
    <v-col class="text-center">
      <v-btn @click="procQ">
        CLICK
      </v-btn>
      <v-btn @click="clDel">
        CLICK DEL
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
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  created() {
    this.$store.dispatch('movie/getData');
  },
  computed: {

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
    }
  },
  data() {
    return {
      stepIdx: 1,
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
