
<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import InputForm from "../../../components/InputForm.svelte";
  import TextArea from "../../../components/TextArea.svelte";
  import Button from "../../../components/Button.svelte";
  import { goto } from "$app/navigation";

  import { collection, doc, setDoc, getFirestore, getDocs, query, where } from "firebase/firestore";
  import { user } from '../../../store';

  let firstname = "";
  let lastname = "";
  let city = "";
  let seeks = "";

  onMount(() => {
    const getUser = async () => {
      let userData;
      user.subscribe(value => {
        userData = value;
      });
      const db = getFirestore();
      const usersRef = collection(db, "users");
      // @ts-ignore
      const q = query(usersRef, where('phoneNumber', '==', userData.phoneNumber));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (item) => {
        firstname = item.data().firstname ? item.data().firstname : "";
        lastname = item.data().lastname ? item.data().lastname : "";
        seeks = item.data().seeks ? item.data().seeks : "";
        city = item.data().city ? item.data().city : "";
      });
    }
    getUser();
  });

  const updateUser = async () => {
    let userData;
    user.subscribe(value => {
      userData = value;
    });
    
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where('phoneNumber', '==', userData.phoneNumber));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach(async (item) => {
        await setDoc(doc(usersRef, item.id), {
          phoneNumber: userData.phoneNumber,
          firstname,
          lastname,
          city,
          seeks,
          provides: item.data().provides,
          nickname: item.data().nickname,
        });
        goto("/share/success");
      });
    } else {
      await setDoc(doc(usersRef), {
        phoneNumber: userData.phoneNumber,
        firstname,
        lastname,
        city,
        seeks
      });
      goto("/share/success");
    }
  }

</script>

<div class="grid grid-cols-1">
  <p class="text-4xl font-bold text-center text-main mb-24">je recherche des talents</p>
  <InputForm label="Prénom" value={firstname} on:change={(e) => firstname=e.target.value} />
  <InputForm label="Nom" value={lastname} on:change={(e) => lastname=e.target.value} />
  <InputForm label="Ville" value={city} on:change={(e) => city=e.target.value} />
  <TextArea label="Ma recherche:" value={seeks} on:change={(e) => seeks=e.target.value}  />
  <div class="mt-10">
    <Button on:click={updateUser}>Suivant</Button>
  </div>
</div>
