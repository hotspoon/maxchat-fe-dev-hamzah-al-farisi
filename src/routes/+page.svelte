<script>
  import * as Table from '$lib/components/ui/table';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import * as Dialog from '$lib/components/ui/dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import { SquareUserRound, Plus, EllipsisVertical, Check, X } from 'lucide-svelte';

  // Import patients data
  import patients from '../data/data-patient.json';

  let dialogOpen = false;
  let searchParams = {
    nama: '',
    ktp: '',
    rekam_medis: ''
  };

  // Initialize filtered patients
  let filteredPatients = patients;

  // Function to handle search
  function handleSearch() {
    filteredPatients = filterPatients(patients, searchParams);
    dialogOpen = false;
  }

  // Function to filter patients based on search parameters
  /**
   * @param {Array<{nama: string, ktp: string, rekam_medis: string, tgl_lahir: string, jk: string, pendidikan: string}>} patients
   * @param {{nama: string, ktp: string, rekam_medis: string}} query
   */
  function filterPatients(patients, query) {
    return patients.filter((patient) => {
      return (
        (!query.nama || patient.nama.toLowerCase().includes(query.nama.toLowerCase())) &&
        (!query.ktp || patient.ktp.includes(query.ktp)) &&
        (!query.rekam_medis || patient.rekam_medis.includes(query.rekam_medis))
      );
    });
  }
</script>

<svelte:head>
  <title>Daftar Pasien</title>
</svelte:head>

<div class="grid grid-cols-2 justify-between gap-4 p-4">
  <div class="flex items-center gap-2">
    <SquareUserRound />
    <p>Daftar Pasien</p>
  </div>

  <div class="flex items-center justify-end gap-2">
    <Input
      type="text"
      placeholder="Cari pasien"
      class="rounded border p-2"
      on:click={() => (dialogOpen = true)}
    />
    <a href="/tambah">
      <Button class="bg-sky-500 hover:bg-sky-600">
        <Plus class="mr-2 h-4 w-4" />
        Tambah
      </Button>
    </a>
  </div>
</div>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Nama</Table.Head>
      <Table.Head>Rekam Medis</Table.Head>
      <Table.Head>KTP</Table.Head>
      <Table.Head>Tgl Lahir</Table.Head>
      <Table.Head>JK</Table.Head>
      <Table.Head>Pendidikan</Table.Head>
      <Table.Head>Status</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each filteredPatients as patient}
      <Table.Row class="whitespace-nowrap">
        <Table.Cell class="font-medium">{patient.nama}</Table.Cell>
        <Table.Cell>{patient.rekam_medis}</Table.Cell>
        <Table.Cell>{patient.ktp}</Table.Cell>
        <Table.Cell>{patient.tgl_lahir}</Table.Cell>
        <Table.Cell>{patient.jk}</Table.Cell>
        <Table.Cell>{patient.pendidikan}</Table.Cell>

        <Table.Cell class="text-right">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <EllipsisVertical class="hover:bg-slate-200" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                <DropdownMenu.Label>
                  <Button variant="link">Detail</Button>
                </DropdownMenu.Label>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Content class="rounded-lg bg-white p-6 shadow-lg">
    <Dialog.Header>
      <p class="text-lg font-semibold">Pencarian</p>
    </Dialog.Header>
    <hr />

    <div class="space-y-4">
      <div class="flex items-center space-x-4">
        <Label for="nama" class="block w-1/4 text-sm font-medium text-gray-700">Nama</Label>
        <Input
          id="nama"
          type="text"
          placeholder="Nama"
          class="w-3/4 rounded border p-2"
          bind:value={searchParams.nama}
        />
      </div>
      <div class="flex items-center space-x-4">
        <Label for="ktp" class="block w-1/4 text-sm font-medium text-gray-700">No. KTP</Label>
        <Input
          id="ktp"
          type="text"
          placeholder="No. KTP"
          class="w-3/4 rounded border p-2"
          bind:value={searchParams.ktp}
        />
      </div>
      <div class="flex items-center space-x-4">
        <Label for="rekam_medis" class="block w-1/4 text-sm font-medium text-gray-700"
          >No. Rekam Medis</Label
        >
        <Input
          id="rekam_medis"
          type="text"
          placeholder="No. Rekam Medis"
          class="w-3/4 rounded border p-2"
          bind:value={searchParams.rekam_medis}
        />
      </div>
    </div>

    <div class="mt-6 flex justify-center space-x-2">
      <Button
        on:click={handleSearch}
        class="rounded bg-sky-400 px-6 py-2 text-white hover:bg-sky-700"
      >
        <Check />
        OK
      </Button>
      <Button
        on:click={() => (dialogOpen = false)}
        class="rounded bg-gray-600 px-6 py-2 text-white hover:bg-gray-700"
      >
        <X />
        Tutup
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
