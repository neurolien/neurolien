<script>
  import InputForm from "../../../components/InputForm.svelte";
  import TextArea from "../../../components/TextArea.svelte";
  import Button from "../../../components/Button.svelte";
  import { goto } from "$app/navigation";

  import { user } from '../../../store';
  import { getAuth, updateCurrentUser } from 'firebase/auth';
  // const db = firebase.firestore();
  // user.subscribe(value => {
  //   console.log(value)
  // });
  const update = () => {
    const auth = getAuth()
    user.subscribe(value => {
      // @ts-ignore
      value.firstName = "test";
      updateCurrentUser(auth, value);
    })
  }

</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-sky-400 mb-24 ">Je suis un talent</p>
  <InputForm label="Pseudo"/>
  <InputForm label="Ville"/>
  <TextArea label="Mes talents:" />
  <div class="mt-10">

    <Button on:click={update}>Suivant</Button>

  </div>
</div>


