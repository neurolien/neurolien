<script>
  import { onMount } from 'svelte';
  import InputForm from "../../components/InputForm.svelte";
  import Button from "../../components/Button.svelte";
  import { goto } from "$app/navigation";
  import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
  import { pageType } from '../../store';

  let phoneNumber = "";
  /**
     * @type {import("@firebase/auth").ApplicationVerifier}
     */
  let recaptchaVerifier;

  onMount(() => {
    const auth = getAuth();
    recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible', // Optional configuration options
      callback: () => {
        // Handle reCAPTCHA response
      },
      'expired-callback': () => {
        // Handle expired reCAPTCHA
      }
    });
    setTimeout(() => {
      let type;
      pageType.subscribe(value => {
        type = value;
      });
      console.log(type);
    }, 100)
  });

  const phoneVerify = () => {
    // goto("/auth/confirm");
    // return;
    const auth = getAuth();
    auth.languageCode = 'it';
    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        // @ts-ignore
        window.confirmationResult = confirmationResult;
        goto("/auth/confirm");
      }).catch((error) => {
        alert(`${error.name}: ${error.code}`);
      });
  }

  // @ts-ignore
  const handleInputChange = (e) => {
    phoneNumber = e.target.value;
  }

</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-sky-400 mb-24 ">Je suis un talent</p>
  <div class="mb-24">
    <InputForm label="Téléphone" value={phoneNumber} on:change={handleInputChange} />
  </div>
  <div id="recaptcha-container"></div>
  <Button on:click={() => phoneVerify()}>Suivante</Button>
</div>