<script setup>
import { onMounted, computed, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import { commentsService } from '../services/CommentsService.js'
import CommentCard from '../components/CommentCard.vue';
import Pop from '../utils/Pop.js';

let route = useRoute();
let event = computed(() => AppState.currentEvent);
let peopleAttending = computed(() => AppState.currentEvent.peopleGoing);
let editEvent = computed(() => { return { ...AppState.currentEvent } });

let attending = ref(false);
watchEffect(() => {
	if (AppState.myTickets.find(t => t.eventId == AppState.currentEvent.id)) {
		attending.value = true
	} else {
		attending.value = false
	}
})

let myEvent = ref(false);
watchEffect(() => {
	if (AppState.account.id == event.value.creatorId) {
		myEvent.value = true
	} else {
		myEvent.value = false
	}
})



async function getEventInfo() {
	try {
		await eventsService.getEventById(route.params.id)
		AppState.currentEvent.startDate = new Date(AppState.currentEvent.startDate).toISOString().slice(0, 16)
	} catch (error) {
		Pop.error("Error getting event")
		logger.log(error)
	}
	try {
		await eventsService.getPeopleGoing(route.params.id)
	} catch (error) {
		logger.log(error)
		Pop.error("Error getting people going")
	}
	try {
		await commentsService.getCommentsByEventId(route.params.id)
	} catch (error) {
		logger.log(error)
		Pop.error("Error getting comments")
	}
}
// Making sure when you create a new event everythng recalcs
watchEffect(() => {

	if (route.params.id) {
		getEventInfo()
	}

})

onMounted(async () => {
	console.log('Event Page Mounted')
	await getEventInfo()

})

async function createComment(e) {
	let form = e.target
	let rawComment = {
		body: form.body.value,
		creatorId: AppState.account.id,
		eventId: route.params.id
	}
	try {
		await commentsService.createComment(rawComment)
		Pop.success("Comment Created")
		form.reset()
	} catch (error) {
		logger.log(error)
		Pop.error("Error creating comment")
	}
}

let modalHidden = ref(true)

async function saveChanges(e) {
	try {
		if (await Pop.confirm("Are you sure you want to save these changes?")) {
			await eventsService.editEvent(route.params.id, editEvent.value)
			Pop.success("Event Updated")
			modalHidden.value = true
		}
	} catch (error) {
		logger.log(error)
		Pop.error("Error updating event")
	}
}

async function cancelEvent() {
	try {
		if (await Pop.confirm("Are you sure you want to cancel this event?")) {
			await eventsService.cancelEvent(route.params.id)
			Pop.success("Event Canceled")
			modalHidden.value = true
		}
	} catch (error) {
		logger.log(error)
		Pop.error("Error canceling event")
	}
}

async function joinEvent() {
	try {
		await eventsService.joinEvent(route.params.id)
		Pop.success("Event Joined")
	} catch (error) {
		logger.log(error)
		Pop.error("Error joining event")
	}
}

async function leaveEvent() {
	try {
		await eventsService.leaveEvent(route.params.id)
		Pop.success("Event Left")
	} catch (error) {
		logger.log(error)
		Pop.error("Error leaving event")
	}
}

</script>
<template>
	<div class="eventPage" v-if="event.id">
		<div class="eventCard" :style="{ 'background-image': `url(${event.coverImg})` }">
			<div class="fancyBlur">
				<img src="https://www.onlygfx.com/wp-content/uploads/2017/12/cancelled-stamp-1.png" v-if="event.isCanceled"
					class="canceled" />
				<img src="https://www.freeiconspng.com/thumbs/sold-out-png/sold-out-png-31.png" v-else-if="!event.capacity"
					class="canceled" />
				<img :src="event.coverImg" class="coverImg" name="cover image" alt="coverImage" />
				<div class="eventDetails">
					<div class="eventHeader">
						<div>{{ event.name }}</div>
						<div>{{ new Date(event.startDate).toLocaleDateString() }}</div>
					</div>
					<div class="eventSubHeader">
						<div>{{ event.location }}</div>
						<div>{{ event.type }}</div>
						<div>{{ new Date(event.startDate).toLocaleTimeString() }}</div>
					</div>
					<div class="eventDesc">
						{{ event.description }}
					</div>
					<div class="eventFooter">
						<div class="eventCapacity">{{ event.capacity }} <span>spots left</span></div>
						<div class="d-flex gap-2" v-if="AppState.account.id">
							<button v-if="myEvent && !event.isCanceled" class="btn editButton btn-success"
								@click="modalHidden = false" title="edit your event">
								<i class="mdi mdi-pencil"></i>
							</button>
							<button v-if="!attending && !event.isCanceled && event.capacity" @click="joinEvent"
								class="btn btn-primary" title="attend this event">Attend</button>
							<button v-else-if="!event.isCanceled && attending" @click="leaveEvent" class="btn btn-warning"
								title="leave this event">Unattend</button>
							<button v-else class="btn btn-danger" disabled>Sold out</button>
						</div>
					</div>

				</div>

			</div>
		</div>

		<div class="attending">
			<label v-if="peopleAttending?.length">See who is attending</label>
			<label v-else>Nobody attending</label>
			<div v-if="peopleAttending?.length" class="attendingCard">
				<img v-for="person in peopleAttending" :src="person.profile.picture" class="attendingPicture"
					:title="person.profile.name" />
			</div>

		</div>

		<div class="commentSection">
			<label v-if="event.comments?.length">What people are saying</label>
			<label v-else>Nobody has said anything yet!</label>
			<div class="commentBackground" v-if="event.comments?.length || AppState.account.id">
				<form @submit.prevent="createComment" v-if="AppState.account.id">
					<label for="body">Make a Comment</label>
					<textarea id="body" name="body" rows="3"></textarea>
					<button class="btn btn-primary" title="post a comment">Post Comment</button>
				</form>
				<div class="commentList">
					<CommentCard v-for="comment in event.comments" :key="comment.id" :comment="comment" />
				</div>
			</div>
		</div>
	</div>

	<div class="editModal" :hidden="modalHidden" @click="modalHidden = true">
		<form @click.stop="">
			<div class="d-flex justify-content-between align-items-center">
				<h3 class="m-0">Edit Event</h3>
				<button class="closeButton" @click.prevent="modalHidden = true" title="stop editing this event">X</button>
			</div>


			<fieldset>
				<label for="editName">Name</label>
				<input name="name" id="editName" required v-model="editEvent.name" />
			</fieldset>
			<fieldset>
				<label for="edescription">Description</label>
				<textarea name="description" id="edescription" rows="3" required v-model="editEvent.description"></textarea>
			</fieldset>
			<fieldset>
				<label for="ecoverImg">Cover Image</label>
				<input name="coverImg" id="ecoverImg" type="url" required v-model="editEvent.coverImg" />
			</fieldset>
			<fieldset>
				<label for="elocation">Location</label>
				<input name="location" id="elocation" required v-model="editEvent.location" />
			</fieldset>
			<fieldset>
				<label for="estartDate">Start Date</label>
				<input name="startDate" id="estartDate" type="datetime-local" required v-model="editEvent.startDate" />
			</fieldset>
			<fieldset>
				<label for="ecapacity">Capacity</label>
				<input name="capacity" id="ecapacity" type="number" required v-model="editEvent.capacity" />
			</fieldset>
			<fieldset>
				<label for="etype">Type</label>
				<select id="etype" v-model="editEvent.type" required>
					<option value="concert">Concert</option>
					<option value="convention">Convention</option>
					<option value="sport">Sport</option>
					<option value="digital">Digital</option>
				</select>
			</fieldset>


			<div class="d-flex justify-content-between mt-3 ">
				<button class="btn btn-danger" type="button" @click="cancelEvent" title="cancel your event">Cancel
					Event</button>
				<div class="justify-content-end gap-2 d-flex">
					<button class="btn btn-warning" type="button" @click="modalHidden = true"
						title="cancel your edits">Cancel</button>
					<button class="btn btn-primary" @click.prevent="saveChanges" title="save your changes">Save</button>
				</div>
			</div>



		</form>

	</div>



</template>
<style lang="scss" scoped>
.eventPage {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.eventCard {

	display: flex;

	.editButton {
		padding: 0.5rem 1rem !important;

	}

	.canceled {
		position: absolute;

		width: 100%;
		height: 100%;
		pointer-events: none;
		object-fit: cover;

	}

	.fancyBlur {
		position: relative;
		background-color: rgba(0, 13, 33, 0.441);
		backdrop-filter: blur(15px);
		padding: 1rem;
		display: flex;
		flex-grow: 1;
	}



	.coverImg {
		width: 15rem;
		object-fit: cover;
		height: 100%;
	}

	.eventDetails {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex-grow: 1;
		padding-left: 1rem;

		.eventHeader {
			display: flex;
			justify-content: space-between;
			font-size: x-large;
		}

		.eventSubHeader {
			display: flex;
			justify-content: space-between;
			font-size: large;
		}

		.eventDesc {
			color: rgba(255, 255, 255, 0.92);
			flex: 1;
		}

		.eventFooter {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			.eventCapacity {
				color: lightblue;
				font-size: larger;

				span {
					color: white;
					font-size: medium;
				}
			}

			button {

				padding: 0.5rem 2rem;

				font-size: larger;
				cursor: pointer;
			}
		}
	}
}

.attending {
	display: flex;
	flex-direction: column;
	gap: .5rem;

	label {
		color: rgba(255, 255, 255, 0.547);
	}

	.attendingCard {
		display: flex;
		gap: .5rem;
		flex-wrap: wrap;
		background-color: #474C61;
		padding: .5rem;
	}

	.attendingPicture {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		object-fit: cover;
	}
}

.commentSection {
	display: flex;
	flex-direction: column;
	gap: .5rem;
	padding-left: 5rem;
	padding-right: 5rem;


	label {
		color: rgba(255, 255, 255, 0.547);
	}

	.commentBackground {
		display: flex;
		flex-direction: column;
		background-color: #474C61;
		gap: 1rem;
		padding: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: .25rem;
		padding: 1rem;

		button {
			align-self: flex-end;
		}
	}

	.commentList {
		display: flex;
		flex-direction: column;
		gap: .5rem;


	}
}

.editModal {
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