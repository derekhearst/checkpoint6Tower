<script setup>
import { onMounted, computed, watchEffect, ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';

onMounted(async () => {
  console.log('Home Page Mounted');
  await eventsService.getEvents();

});

let events = ref([]);

watchEffect(() => {
  switch (AppState.currentFilter) {
    case 'all':
      events.value = AppState.allEvents;
      break;
    case 'concert':
      events.value = AppState.allEvents.filter(e => e.type === 'concert');
      break;
    case 'sport':
      events.value = AppState.allEvents.filter(e => e.type === 'sport');
      break;
    case 'digital':
      events.value = AppState.allEvents.filter(e => e.type === 'digital');
      break;
    case 'convention':
      events.value = AppState.allEvents.filter(e => e.type === 'convention');
      break;
  }
});

let sort = ref('newest');
watchEffect(() => {
  switch (sort.value) {
    case 'date':
      events.value = events.value.sort((b, a) => new Date(a.startDate) - new Date(b.startDate))
      break;
    case 'capacity':
      events.value = events.value.sort((b, a) => a.capacity - b.capacity)
      break;
    case 'newest':
      events.value = events.value.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
      break;
  }
})

</script>

<template>
  <div class="homePage">
    <div class="heroContainer">
      <img class="heroImg"
        src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2luZW1hJTIwc2VhdHN8ZW58MHx8MHx8&w=1000&q=80"
        alt="A picture of a chair in a theater" />


      <div class="heroText">
        <h4>Get ahead of the scalpers</h4>
        <h4>Real events for real people</h4>
        <h4>Reserve your seats now</h4>
      </div>
    </div>
    <div class="optionsSelect">
      <button @click="AppState.currentFilter = 'all'" title="filter by all">All</button>
      <button @click="AppState.currentFilter = 'concert'" title="filter only concerts">Concerts</button>
      <button @click="AppState.currentFilter = 'convention'" title="filter only conventioms">Conventions</button>
      <button @click="AppState.currentFilter = 'sport'" title="filter only sports">Sports</button>
      <button @click="AppState.currentFilter = 'digital'" title="filter only digital">Digital</button>
      <select @change="changeSort" v-model="sort" title="sort by" name="filterBy">
        <option value="date">Event Date</option>
        <option value="capacity">Capacity</option>
        <option value="newest">Latest Events</option>
      </select>
    </div>

    <div class="events">
      <!-- <RouterLink v-for="event in events" :key="event.id" :to="{ name: 'Event', params: { id: event._id } }"> -->
      <EventCard :event="event" v-for="event in events" :key="event.id" />
      <!-- </RouterLink> -->
    </div>


  </div>
</template>

<style scoped lang="scss">
.homePage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  color: inherit;
  gap: 2rem;
}

.heroContainer {
  height: 15rem;
  position: relative;
  overflow: visible;
  border: 2px solid lightblue;
  border-radius: 5px;

  .heroImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    filter: blur(2px);
    border-radius: 5px;
  }

  .heroText {
    position: absolute;
    top: 20%;
    left: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h4 {
      font-size: 1.5rem;
      font-weight: 300;
    }
  }


}

.optionsSelect {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  border-radius: 5px;
  padding: 1rem;
  background-color: #474C61;

  button {
    font-size: 1.5rem;
    font-weight: 300;
    background-color: inherit;
    border: inherit;
    color: inherit;
    border-bottom: 1px solid transparent;

    &:focus {
      color: lightgreen;
      border-bottom: 1px solid lightgreen;
    }
  }
}

.events {
  display: flex;
  flex-wrap: wrap;
  color: inherit;
  gap: 1rem;

}
</style>
