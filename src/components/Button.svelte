<script>
	export let textSize = '';
</script>

<button on:click
	on:focus
	on:mouseover
	on:mouseenter
	on:mouseleave 
	class="rounded-md bg-main w-full px-3 py-2 mb-5 {textSize == '' ? 'text-xl' : textSize} font-semibold text-white shadow-sm hover:bg-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main">
	<slot/>
</button>