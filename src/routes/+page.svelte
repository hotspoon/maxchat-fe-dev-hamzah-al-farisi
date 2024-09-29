<script>
  import * as Table from '$lib/components/ui/table';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import Button from '$lib/components/ui/button/button.svelte';
  import { SquareUserRound, Plus } from 'lucide-svelte';

  // Import patients data
  import patients from '../data/data-patient.json';
  import Input from '$lib/components/ui/input/input.svelte';

  console.log(patients);
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
    <Input type="text" placeholder="Cari pasien" class="rounded border p-2" />
    <Button class="bg-sky-500 hover:bg-sky-600">
      <Plus class="mr-2 h-4 w-4" />
      Tambah
    </Button>
  </div>
</div>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Nama</Table.Head>
      <Table.Head>Rekam Medis</Table.Head>
      <Table.Head>KTP</Table.Head>
      <Table.Head>Tanggal Lahir</Table.Head>
      <Table.Head>Jenis Kelamin</Table.Head>
      <Table.Head>Pendidikan</Table.Head>
      <Table.Head>Status</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each patients as patient}
      <Table.Row>
        <Table.Cell class="font-medium">{patient.nama}</Table.Cell>
        <Table.Cell>{patient.rekam_medis}</Table.Cell>
        <Table.Cell>{patient.ktp}</Table.Cell>
        <Table.Cell>{patient.tgl_lahir}</Table.Cell>
        <Table.Cell>{patient.jk}</Table.Cell>
        <Table.Cell>{patient.pendidikan}</Table.Cell>

        <Table.Cell class="text-right">
          <!-- <button class="rounded bg-sky-500 p-2 text-white hover:bg-sky-600">Detail</button> -->
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                <DropdownMenu.Label>My Account</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Profile</DropdownMenu.Item>
                <DropdownMenu.Item>Billing</DropdownMenu.Item>
                <DropdownMenu.Item>Team</DropdownMenu.Item>
                <DropdownMenu.Item>Subscription</DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
