<template>
  <div class="accountPage">
    <div class="myEvents">
      <div class="d-flex gap-2 align-items-center clickable" @click="eventsCollapsed = !eventsCollapsed">
        <h3>My Events</h3>
        <button v-if="!eventsCollapsed" class="collapseButton">
          <i class="mdi mdi-unfold-less-horizontal fs-2"></i>
        </button>
        <button v-else class="collapseButton">
          <i class="mdi mdi-unfold-more-horizontal fs-2"></i>
        </button>
      </div>
      <div class="eventList" v-if="!eventsCollapsed">
        <EventCard v-for="event in AppState.myEvents" :key="event.id" :event="event" />
      </div>
    </div>
    <div class="myTickets">
      <div class="d-flex gap-2 align-items-center clickable" @click="ticketsCollapsed = !ticketsCollapsed">
        <h3>My Tickets</h3>
        <button v-if="!ticketsCollapsed" class="collapseButton">
          <i class="mdi mdi-unfold-less-horizontal fs-2"></i>
        </button>
        <button v-else class="collapseButton">
          <i class="mdi mdi-unfold-more-horizontal fs-2"></i>
        </button>
      </div>
      <div class="ticketList" v-if="!ticketsCollapsed">
        <TicketCard v-for="ticket in AppState.myTickets" :key="ticket.id" :ticket="ticket" />
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watchEffect, ref } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { eventsService } from '../services/EventsService.js';
import EventCard from '../components/EventCard.vue';
import TicketCard from '../components/TicketCard.vue';
import Pop from '../utils/Pop.js';

// watchEffect(() => {
//   if (AppState.account.id) {
//     // prevent needless gets
//     if (!AppState.myEvents.length) {
//       accountService.getMyEvents()
//     }
//     if (!AppState.myTickets.length) {
//       accountService.getMyTickets()
//     }
//   }
// })

let eventsCollapsed = ref(false)
let ticketsCollapsed = ref(false)


</script>

<style scoped>
.accountPage {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.myEvents {
  display: flex;
  flex-direction: column;
}

.ticketList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
}

.collapseButton {
  background-color: transparent;
  border: none;
  color: inherit;
}

.eventList {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.clickable {
  cursor: pointer;
  user-select: none;
}
</style>
