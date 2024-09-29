<script lang="ts">
  import { SquareUserRound } from 'lucide-svelte';
  import AddPatientForm from '$lib/components/AddPatientForm.svelte';
</script>

<div class="grid grid-cols-2 justify-between gap-4 p-4">
  <div class="flex items-center gap-2">
    <SquareUserRound />
    <p>Tambah Pasien</p>
  </div>
</div>

<div class="p-4">
  <AddPatientForm />
</div>
