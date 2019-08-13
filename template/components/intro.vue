<template>
	<div class="logo">
		<h1>h's</h1>
	</div>
</template>

<style lang="scss">
@import '~tools';

.logo {
	position: relative;
	background-color: color(Blue);
	width: grid(10);
	height: grid(10);
	animation: comeIn $base-transition $base-cubic-bezier forwards;
	@at-root {
		@keyframes comeIn {
			to {
				clip-path: inset(0 0 0 0);
			}
		}
	}
	clip-path: inset(100% 0 0 0);
	h1 {
		color: color(White);
		position: absolute;
		left: 40%;
		bottom: 0;
		transform: translateY(100%);
		font-size: grid(6);
		animation: comeUp $base-transition $base-transition $base-cubic-bezier forwards;
		@at-root {
			@keyframes comeUp {
				to {
					transform: translateY(0%);
				}
			}
		}
	}
}
</style>
