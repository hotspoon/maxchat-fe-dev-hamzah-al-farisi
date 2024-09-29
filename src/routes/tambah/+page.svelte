<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import * as Dialog from '$lib/components/ui/dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import { SquareUserRound, Plus, EllipsisVertical, Check, X } from 'lucide-svelte';
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
