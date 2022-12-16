<template>
  <div class="loginMenu">
    <div class="loginItems" v-if="!user.isAuthenticated">
      <button class="btn btn-primary" @click="login">
        Login
      </button>
      <RouterLink to="/">
        <button class="btn">
          Home
        </button>
      </RouterLink>
    </div>
    <div v-else class="loginItems">
      <div v-if="account.picture || user.picture">
        <img :src="account.picture || user.picture" alt="account photo" />
      </div>

      <RouterLink to="/">
        <button class="btn">
          Home
        </button>
      </RouterLink>
      <RouterLink to="/Account">
        <button class="btn">
          Account
        </button>
      </RouterLink>
      <button class="btn btn-success text-white" @click="modalHidden = false">
        New Event
      </button>
      <button class="btn btn-outline-info" @click="logout">
        Logout
      </button>
    </div>
  </div>

  <div class="modal" :hidden="modalHidden">
    <form @click.stop="">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="m-0">Create Event</h3>
        <button class="closeButton" @click.prevent="modalHidden = true">X</button>
      </div>

      <fieldset>
        <label>Name</label>
        <input name="name" required v-model="newEvent.name" />
      </fieldset>
      <fieldset>
        <label>Description</label>
        <textarea name="description" rows="3" required v-model="newEvent.description"></textarea>
      </fieldset>
      <fieldset>
        <label>Cover Image</label>
        <input name="coverImg" type="url" required v-model="newEvent.coverImg" />
      </fieldset>
      <fieldset>
        <label>Location</label>
        <input name="location" required v-model="newEvent.location" />
      </fieldset>
      <fieldset>
        <label>Start Date</label>
        <input name="startDate" type="datetime-local" required v-model="newEvent.startDate" />
      </fieldset>
      <fieldset>
        <label>Capacity</label>
        <input name="capacity" type="number" required v-model="newEvent.capacity" />
      </fieldset>
      <fieldset>
        <label>Type</label>
        <select v-model="newEvent.type" required>
          <option value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="sport">Sport</option>
          <option value="digital">Digital</option>
        </select>
      </fieldset>

      <div class="d-flex justify-content-end gap-2 mt-3 ">
        <button class="btn btn-danger" type="button" @click.prevent="modalHidden = true">Cancel</button>
        <button class="btn btn-primary" @click.prevent="createEvent">Create</button>
      </div>
    </form>
  </div>

</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js';


let user = computed(() => AppState.user)
let account = computed(() => AppState.account)
async function login() {
  AuthService.loginWithPopup()
}
async function logout() {
  AuthService.logout({ returnTo: window.location.origin })
}
let router = useRouter()

async function createEvent() {
  try {
    let returnedEvent = await eventsService.createEvent(newEvent.value)
    Pop.success('Event Created')
    modalHidden.value = true
    logger.log("Navigating to event", returnedEvent.id)
    router.push({ name: 'Event', params: { id: returnedEvent.id } })
  } catch (error) {
    Pop.error('Error Creating Event')
    console.error(error)
  }


}
let modalHidden = ref(true)

let newEvent = ref({
  name: 'Example Event',
  description: 'Example Description',
  coverImg: 'https://thiscatdoesnotexist.com/',
  location: 'Ur moms house',
  startDate: new Date().toISOString().substring(0, 16),
  capacity: 200,
  type: 'concert'
})

</script>

<style lang="scss" scoped>
.loginMenu {
  display: flex;
  color: rgba(204, 243, 253, 1);
  flex-direction: column;
  padding: .5rem;
  width: 10rem;
  max-height: 40rem;
  overflow: hidden;
  background: linear-gradient(180deg, #474C61 0%, rgba(71, 76, 97, 0) 100%);
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: 1px solid lightblue;
  border-radius: 5px;
}

button {
  border-radius: 5px;
  color: rgba(204, 243, 253, 1);

}

a {
  color: rgba(204, 243, 253, 1);
  width: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:hover {
    color: rgba(204, 243, 253, .7);
  }

  &:visited {
    color: rgba(204, 243, 253, 1);
  }

  button {
    color: rgba(204, 243, 253, 1);

  }
}

.loginItems {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem
}

.modal {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    height: min-content;
    width: 60%;
    gap: .25rem;
    padding: 1rem;
    padding-top: .25rem;
    background-color: #474C61;
    border-radius: 1rem;

    .closeButton {
      padding: 0;
      margin: 0;
      background-color: transparent;
      color: white;
      border: 0;
      cursor: pointer;
      font-size: 2rem
    }


    fieldset {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
