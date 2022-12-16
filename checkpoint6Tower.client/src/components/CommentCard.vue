<script setup>
import { ref, computed, onMounted } from 'vue'
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';

let props = defineProps({
	comment: {
		type: Object,
		required: true
	}
})

async function deleteComment() {
	try {
		if (await Pop.confirm('Are you sure you want to delete this comment?')) {
			await commentsService.deleteComment(props.comment._id)
			Pop.success('Comment deleted')
		}
	} catch (error) {
		Pop.error('Error deleting comment')
		logger.error(error)
	}
}
</script>
<template>
	<div class="comment">
		<img :src="comment.creator.picture" />
		<div class="commentBody">
			<div class="commentHeader">
				<div class="commentName">{{ comment.creator.name }}</div>
				<div class="commentDate">{{ new Date(comment.createdAt).toLocaleDateString() }}</div>
				<div v-if="comment.creatorId == AppState.account.id">
					<i class="mdi mdi-delete text-danger" @click="deleteComment"></i>
				</div>
			</div>
			<div class="commentText">{{ comment.body }}</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.comment {
	display: flex;
	padding: 0rem 1rem;
	align-items: center;

	gap: 1rem;
}

i {
	cursor: pointer;
}

img {
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	object-fit: cover;
}


.commentBody {
	display: flex;
	flex-direction: column;
	background-color: #E2F9FF;
	color: black;
	flex: 1;
	padding: .25rem;
}

.commentHeader {
	display: flex;
	gap: .25rem;
}

.commentDate {
	color: rgba(0, 0, 0, 0.547);
}
</style>