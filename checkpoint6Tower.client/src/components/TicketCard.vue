<script setup>
import { computed, onMounted, watchEffect, ref } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

let props = defineProps({
	ticket: {
		type: Object,
		required: true
	}
})

async function cancelTicket() {
	try {
		if (await Pop.confirm('Are you sure you want to cancel your ticket?')) {
			await eventsService.leaveEvent(props.ticket.event.id)
		}
		Pop.success('Ticket Cancelled')

	} catch (error) {
		console.error(error)
		Pop.error("Couldn't cancel ticket")
	}
}

</script>
<template>
	<div class="ticket">
		<img :src="props.ticket.event.coverImg" :alt="props.ticket.event.name" class="ticketImg" />
		<div class="ticketDetails">
			<h4>{{ props.ticket.event.name }}</h4>
			<p>{{ props.ticket.event.location }}</p>
			<p>{{ new Date(props.ticket.event.startDate).toLocaleDateString() }}</p>
			<button class="cancelButton" @click="cancelTicket">
				not going
			</button>
		</div>
		<div class="ticketCutout"></div>
	</div>

</template>
<style lang="scss" scoped>
.ticket {
	display: flex;
	background-color: inherit;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	position: relative;
	border-radius: 5px;
}

.ticketCutout {
	position: absolute;
	top: 1.5rem;
	right: -3.5rem;
	width: 7rem;
	height: 7rem;
	z-index: 1;
	background-color: #2a2d3a;
	border-radius: 50%;
}

.ticketImg {
	width: 15rem;
	height: 10rem;
	object-fit: cover;
}

.ticketDetails {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: .25rem;
	padding: .5rem;
	background-color: #474c61;

	h4 {
		margin: 0;

	}

	p {
		margin: 0;
		color: rgba(204, 243, 253, 1);
	}

	.cancelButton {
		background-color: #ff5977;
		border: none;
		margin-top: auto;
		padding: .5rem 1rem;
		width: 8rem;
		color: black;

	}
}
</style>