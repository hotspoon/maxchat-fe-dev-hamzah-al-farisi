<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import * as Table from '$lib/components/ui/table';
  import Switch from '$lib/components/ui/switch/switch.svelte';
  import { ArrowLeft, Printer, Upload, Save, X, Plus } from 'lucide-svelte';

  import { MasterData, ListRegion } from '../../data/masters';

  let patient = {
    nama: '',
    tempat_lahir: '',
    tgl_lahir: '',
    alamat_ktp: {
      provinsi: '',
      kota_kab: '',
      kecamatan: '',
      desa: '',
      alamat: 'JI Diponegoro Gg.III'
    },
    alamat_domisili: {
      provinsi: '',
      kota_kab: '',
      kecamatan: '',
      desa: '',
      alamat: 'JI Diponegoro Gg.III'
    },
    provinsi_ktp: '',
    kota_kab_ktp: '',
    kecamatan_ktp: '',
    desa_ktp: '',
    alamat_sama_dengan_ktp: false,
    hubungan_keluarga_terdekat: '',
    nama_keluarga_terdekat: '',
    anggota_keluarga: [
      { nama: 'Faris', hubungan: 'saudara' },
      { nama: 'Hamzah', hubungan: 'kakek' }
    ]
  };

  // Reactive statements to filter options based on selected values
  $: filteredRegenciesKTP = ListRegion.regency.filter(
    (regency) => regency.province_id === patient.alamat_ktp.provinsi
  );
  $: filteredCitiesKTP = ListRegion.city.filter(
    (city) => city.regency_id === patient.alamat_ktp.kota_kab
  );

  $: filteredRegenciesDomisili = ListRegion.regency.filter(
    (regency) => regency.province_id === patient.alamat_domisili.provinsi
  );
  $: filteredCitiesDomisili = ListRegion.city.filter(
    (city) => city.regency_id === patient.alamat_domisili.kota_kab
  );

  // Reactive statement to update "Alamat Domisili" when the switch is toggled
  $: if (patient.alamat_sama_dengan_ktp) {
    patient.alamat_domisili = { ...patient.alamat_ktp };
  }

  function handleSubmit() {
    console.log('Patient data:', patient);
  }

  function handleBack() {
    console.log('Kembali button clicked');
  }

  function handlePrint() {
    console.log('Cetak Berkas button clicked');
  }

  function handleUpload() {
    console.log('Upload Berkas button clicked');
  }

  function handleSave() {
    console.log('Simpan button clicked');
  }

  function addAnggotaKeluarga() {
    if (patient.anggota_keluarga.length < 5) {
      patient.anggota_keluarga = [...patient.anggota_keluarga, { nama: '', hubungan: '' }];
    }
  }

  function removeAnggotaKeluarga(index: number) {
    patient.anggota_keluarga = patient.anggota_keluarga.filter((_, i) => i !== index);
  }
</script>

<div class="">
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <h2 class="mb-4 text-lg font-semibold">Data Utama</h2>

    <div class="grid items-center gap-4 lg:grid-cols-12">
      <div class="lg:col-span-2">
        <Label for="nama" class="text-sm font-medium text-gray-700">Nama</Label>
      </div>
      <div class="lg:col-span-10">
        <Input
          id="nama"
          type="text"
          placeholder="Nama"
          class="col-span-3 rounded border p-2"
          bind:value={patient.nama}
        />
      </div>
    </div>

    <div class="grid items-center gap-4 lg:grid-cols-12">
      <div class="lg:col-span-2">
        <Label for="tempat_lahir" class="text-sm font-medium text-gray-700">Tempat Lahir</Label>
      </div>
      <div class="lg:col-span-4">
        <Input
          id="tempat_lahir"
          type="text"
          placeholder="Tempat Lahir"
          class="col-span-3 rounded border p-2"
          bind:value={patient.tempat_lahir}
        />
      </div>

      <div class="flex lg:col-span-2 lg:justify-end">
        <Label for="tgl_lahir" class="text-sm font-medium text-gray-700">Tanggal Lahir</Label>
      </div>
      <div class="lg:col-span-4">
        <Input
          id="tgl_lahir"
          type="date"
          placeholder="Tanggal Lahir"
          class="col-span-3 rounded border p-2"
          bind:value={patient.tgl_lahir}
        />
      </div>
    </div>

    <h2 class="mb-4 text-lg font-semibold">Alamat Sesuai KTP</h2>

    <div class="grid items-center gap-4 lg:grid-cols-12">
      <!-- provinsi -->
      <div class="lg:col-span-2">
        <Label class="text-sm font-medium text-gray-700">Provinsi</Label>
      </div>
      <div class="lg:col-span-4">
        <select class="w-full rounded border p-2" bind:value={patient.alamat_ktp.provinsi}>
          <option value="" disabled selected>Pilih Provinsi</option>
          {#each ListRegion.province as provinsi}
            <option value={provinsi.value}>{provinsi.label}</option>
          {/each}
        </select>
      </div>

      <!-- kota/kab -->

      <div class="flex lg:col-span-2 lg:justify-end">
        <Label class="text-sm font-medium text-gray-700">Kota/Kab</Label>
      </div>

      <div class="lg:col-span-4">
        <select
          class="w-full rounded border p-2"
          bind:value={patient.alamat_ktp.kota_kab}
          disabled={!patient.alamat_ktp.provinsi}
        >
          <option value="" disabled selected>Pilih Kota</option>
          {#each filteredRegenciesKTP as regency}
            <option value={regency.value}>{regency.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="grid items-center gap-4 lg:grid-cols-12">
      <div class="lg:col-span-2">
        <Label for="kecamatan" class="text-sm font-medium text-gray-700">Kecamatan</Label>
      </div>
      <div class="lg:col-span-4">
        <select
          id="kecamatan"
          class="w-full rounded border p-2"
          bind:value={patient.alamat_ktp.kecamatan}
          disabled={!patient.alamat_ktp.kota_kab}
        >
          <option value="" disabled selected>Pilih Kecamatan</option>
          {#each filteredCitiesKTP as city}
            <option value={city.value}>{city.label}</option>
          {/each}
        </select>
      </div>

      <div class="flex lg:col-span-2 lg:justify-end">
        <Label for="desa" class="text-sm font-medium text-gray-700">Desa</Label>
      </div>
      <div class="lg:col-span-4">
        <!-- should be input instead of select -->
        <Input
          id="desa"
          type="text"
          placeholder="Desa"
          class="col-span-3 rounded border p-2"
          bind:value={patient.alamat_ktp.desa}
          disabled={!patient.alamat_ktp.kecamatan}
        />
      </div>
    </div>

    <h2 class="mb-4 text-lg font-semibold">Alamat Domisili</h2>
    <div class="flex items-center space-x-2">
      <Label for="same-with-ktp">Sama Dengan KTP</Label>
      <Switch id="same-with-ktp" bind:checked={patient.alamat_sama_dengan_ktp} />
    </div>

    <div class="grid items-center gap-4 lg:grid-cols-12">
      <!-- provinsi -->
      <div class="lg:col-span-2">
        <Label class="text-sm font-medium text-gray-700">Provinsi</Label>
      </div>
      <div class="lg:col-span-4">
        <select
          class="w-full rounded border p-2"
          bind:value={patient.alamat_domisili.provinsi}
          disabled={patient.alamat_sama_dengan_ktp}
        >
          <option value="" disabled selected>Pilih Provinsi</option>
          {#each ListRegion.province as provinsi}
            <option value={provinsi.value}>{provinsi.label}</option>
          {/each}
        </select>
      </div>

      <!-- kota/kab -->

      <div class="flex lg:col-span-2 lg:justify-end">
        <Label class="text-sm font-medium text-gray-700">Kota/Kab</Label>
      </div>

      <div class="lg:col-span-4">
        <select
          class="w-full rounded border p-2"
          bind:value={patient.alamat_domisili.kota_kab}
          disabled={patient.alamat_sama_dengan_ktp || !patient.alamat_domisili.provinsi}
        >
          <option value="" disabled selected>Pilih Kota</option>
          {#each filteredRegenciesDomisili as regency}
            <option value={regency.value}>{regency.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="grid items-center gap-4 lg:grid-cols-12">
      <div class="lg:col-span-2">
        <Label for="kecamatan" class="text-sm font-medium text-gray-700">Kecamatan</Label>
      </div>
      <div class="lg:col-span-4">
        <select
          id="kecamatan"
          class="w-full rounded border p-2"
          bind:value={patient.alamat_domisili.kecamatan}
          disabled={patient.alamat_sama_dengan_ktp || !patient.alamat_domisili.kota_kab}
        >
          <option value="" disabled selected>Pilih Kecamatan</option>
          {#each filteredCitiesDomisili as city}
            <option value={city.value}>{city.label}</option>
          {/each}
        </select>
      </div>

      <div class="flex lg:col-span-2 lg:justify-end">
        <Label for="desa" class="text-sm font-medium text-gray-700">Desa</Label>
      </div>
      <div class="lg:col-span-4">
        <!-- should be input instead of select -->
        <Input
          id="desa"
          type="text"
          placeholder="Desa"
          class="col-span-3 rounded border p-2"
          bind:value={patient.alamat_domisili.desa}
          disabled={patient.alamat_sama_dengan_ktp || !patient.alamat_domisili.kecamatan}
        />
      </div>
    </div>

    <h2 class="mb-4 text-lg font-semibold">Anggota Keluarga Terdekat</h2>

    <div class="grid items-center gap-4 lg:grid-cols-12">
      <div class="lg:col-span-2">
        <Label for="nama" class="text-sm font-medium text-gray-700">Hubungan</Label>
      </div>
      <div class="lg:col-span-4">
        <select
          id="hubungan_keluarga_terdekat"
          class="w-full rounded border p-2"
          bind:value={patient.hubungan_keluarga_terdekat}
        >
          <option value="" disabled>Pilih Hubungan</option>
          {#each MasterData.Relationship as relationship}
            <option value={relationship.value}>{relationship.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="grid items-center gap-4 lg:grid-cols-12">
      <div class="lg:col-span-2">
        <Label for="nama_keluarga_terdekat" class="text-sm font-medium text-gray-700">Nama</Label>
      </div>
      <div class="lg:col-span-10">
        <Input
          id="nama_keluarga_terdekat"
          type="text"
          placeholder="Nama"
          class="col-span-3 rounded border p-2"
          bind:value={patient.nama_keluarga_terdekat}
        />
      </div>
    </div>

    <h2 class="mb-4 text-lg font-semibold">Anggota Keluarga Lainnya</h2>

    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Urut</Table.Head>
          <Table.Head>Nama</Table.Head>
          <Table.Head>Hubungan</Table.Head>
          <Table.Head>Aksi</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each patient.anggota_keluarga as anggota, index}
          <Table.Row class="whitespace-nowrap">
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell class="font-medium">
              <Input
                type="text"
                placeholder="Nama"
                class="rounded border p-2"
                bind:value={anggota.nama}
              />
            </Table.Cell>
            <Table.Cell>
              <select class="w-full rounded border p-2" bind:value={anggota.hubungan}>
                <option value="" disabled>Pilih Hubungan</option>
                {#each MasterData.Relationship as relationship}
                  <option value={relationship.value}>{relationship.label}</option>
                {/each}
              </select>
            </Table.Cell>
            <Table.Cell class="text-right">
              <Button type="button" on:click={() => removeAnggotaKeluarga(index)} variant="link">
                <X class="text-red-500" />
              </Button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
    {#if patient.anggota_keluarga.length < 5}
      <Button
        type="button"
        on:click={addAnggotaKeluarga}
        class="mt-2 rounded bg-sky-400 px-4 py-2 text-white hover:bg-sky-700"
      >
        <Plus class="mr-2" />
        Tambah
      </Button>
    {/if}
    <hr />
    <div
      class="mt-6 flex flex-col space-y-2 sm:flex-row sm:justify-center sm:space-x-2 sm:space-y-0"
    >
      <a href="/">
        <Button type="button" on:click={handleBack} variant="secondary" class="rounded px-6 py-2">
          <ArrowLeft class="mr-2" />
          Kembali
        </Button>
      </a>
      <Button
        type="button"
        on:click={handlePrint}
        class="rounded bg-[#00b5c1] px-6 py-2 text-white hover:bg-sky-700"
      >
        <Printer class="mr-2" />
        Cetak Berkas
      </Button>
      <Button
        type="button"
        on:click={handleUpload}
        class="rounded bg-[#00b5c1] px-6 py-2 text-white hover:bg-sky-700"
      >
        <Upload class="mr-2" />
        Upload Berkas
      </Button>
      <Button
        type="button"
        on:click={handleSave}
        class="rounded bg-sky-400 px-6 py-2 text-white hover:bg-sky-700"
      >
        <Save class="mr-2" />
        Simpan
      </Button>
    </div>
  </form>
</div>
