<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';

let props = defineProps({
	event: {
		type: Object,
		required: true
	}
})
let router = useRouter();
function navigateToEvent() {
	router.push({ name: 'Event', params: { id: props.event._id } })
}

</script>
<template>
	<div class="eventCard" @click="navigateToEvent">
		<img :src="event.coverImg" class="coverImg" alt="The cover image" />
		<img v-if="event.isCanceled" src="https://www.onlygfx.com/wp-content/uploads/2017/12/cancelled-stamp-1.png"
			class="cancelled" alt="canceled" />
		<img v-else-if="!event.capacity" src="https://www.freeiconspng.com/thumbs/sold-out-png/sold-out-png-31.png"
			class="cancelled" alt="sold out" />

		<div class="eventDetails">
			<div class="eventName">{{ event.name }}</div>
			<div>{{ event.location }}</div>
			<div>{{ new Date(event.startDate).toLocaleDateString() }}</div>
			<div class="eventCapacity">{{ event.capacity }} <span>spots left</span></div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.cancelled {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}

.eventCard {
	display: flex;
	flex: 1 1 20rem;
	height: 20rem;
	color: inherit;
	position: relative;
	gap: 2rem;
	border: 2px solid #474C61;
	cursor: pointer;

	.coverImg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}



	.eventDetails {
		position: absolute;
		bottom: 0;
		left: 0;
		padding: .25rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: .5rem;
		background-color: rgba(0, 0, 0, 0.164);
		backdrop-filter: blur(10px);

		.eventName {
			font-size: 1.5rem;
			font-weight: 300;
		}

		.eventCapacity {
			text-align: right;
			margin-top: -2.6rem;
			font-size: 1.5rem;
			font-weight: 600;
			color: lightblue;

			span {
				color: white;
				font-weight: 300;
			}
		}
	}
}
</style>