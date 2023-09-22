<script>
  import { goto } from '$app/navigation';
  import { pageType } from '../store.js';
  import Button from '../components/Button.svelte';
  import {isLoggedIn} from '../store';

  /**
     * @param {string} type
     */
   export function linkPage (type) {
    // @ts-ignore
    pageType.set(type);
    localStorage.setItem("pageType", type);
    isLoggedIn.subscribe(value => {
      if (value) {
        if (type === "consult") {
          goto("/consult/main")
        } else {
          goto("/share/main")
        }
      } else {
        goto('/auth');
      }
    })
  }
</script>

<div class="text-center">
  <div class="pb-20 pt-20">
    <img src="home.gif" alt="" class="m-auto mb-10">
    <!-- <p class="text-main text-5xl uppercase text-center">
      Neurolien
    </p>
    <p class="text-sky-800 text-sm pt-2 font-bold uppercase text-center">
      partageons nos talents
    </p> -->
  </div>
  
  <div class="flex flex-col items-center justify-center">
    <Button on:click={() => linkPage('consult')}>Consultez nos talents</Button>
    <Button on:click={() => linkPage('share')}>Partager mes talents</Button>
  </div>
</div>
