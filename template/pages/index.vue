<template>
	<main class="page page--home">
		<section class="intro">
			<HenrisIntro />
		</section>
	</main>
</template>

<script>
import HenrisIntro from '~/components/intro.vue';
export default {
	components: {
		HenrisIntro
	}
};
</script>

<style lang="scss">
@import '~tools';

.page {
	// general page styles
	&--home {
		// specific home styles
	}
}

.intro {
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
