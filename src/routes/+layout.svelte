<script>
// @ts-nocheck
  import { onMount } from 'svelte';
  import "../app.css";
  import { pageType, user, isLoggedIn } from '../store.js';
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
  import { initFirebase } from '$lib/client/firebase';
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  onMount(() => {
    pageType.set(localStorage.getItem("pageType") ? localStorage.getItem("pageType") : null);
    
    initFirebase();
    const auth = getAuth();

    onAuthStateChanged(auth, function(userRes) {
    if (userRes) {
      // User is signed in, check if the session is expired
      var now = new Date().getTime();
      var expirationTime = (userRes.metadata.lastLoginAt * 1) + (userRes.stsTokenManager.expiresIn * 1000);

      if (now >= expirationTime) {
        // Perform any necessary actions, such as signing the user out
        signOut(auth);
        localStorage.setItem("user", null);
      } else {
        user.set(userRes);
        localStorage.setItem("user", userRes);
        isLoggedIn.set(true);
      }
    } else {
      // User is signed out
      console.log($page.route.id)
      if ($page.route.id != "/auth" && $page.route.id != "/" && $page.route.id != "/auth/confirm") {
        goto("/");
      }
    }
  });
  })
</script>

<div class="flex items-center justify-center">
  <div class="w-[400px] xs:w-full px-5">
    <slot />
  </div>
</div>

