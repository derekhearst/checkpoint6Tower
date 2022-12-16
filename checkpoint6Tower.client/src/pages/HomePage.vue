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
        src="https://s3-alpha-sig.figma.com/img/cd1b/eb35/3224c652f40c0754047c232b09e71cc3?Expires=1672012800&Signature=RW1nLQQV8mXj05s9VlVTLiUq3suFwCVdXGSvgqCseygTB5HSQpBLsn8~rVTExXTnwq2VlhL5C7QVuGPD6fsQsP029P0524QX-tyTB~Nb2n335I0ITFjnW-ziH3D6N0Rb-bRK6FGjR7E~-VDM93YxsoQSXWM7Asbt-FBYhAcfYMWggffjcMa5pSPHHmvf4sI7msLEyLhCZBjCn3xvk~TJr4274BvOiqjoOWYg0e9e3l1mDIkFmTV4~~llzxH~999X6Yqv2jmRXHWcLtDJogvPNS8AL6vHwmQTatIXzN7HSpTlm6Epj7SorOu3SPAPqe3sqc7H~N1rcvL2OjNlHVJwYg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        alt="A picture of a chair in a theater" />


      <div class="heroText">
        <h4>Get ahead of the scalpers</h4>
        <h4>Real events for real people</h4>
        <h4>Reserve your seats now</h4>
      </div>
    </div>
    <div class="optionsSelect">
      <button @click="AppState.currentFilter = 'all'">All</button>
      <button @click="AppState.currentFilter = 'concert'">Concerts</button>
      <button @click="AppState.currentFilter = 'convention'">Conventions</button>
      <button @click="AppState.currentFilter = 'sport'">Sports</button>
      <button @click="AppState.currentFilter = 'digital'">Digital</button>
      <select @change="changeSort" v-model="sort">
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
