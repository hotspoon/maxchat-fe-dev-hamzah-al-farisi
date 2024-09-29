<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import * as Table from '$lib/components/ui/table';
  import Switch from '$lib/components/ui/switch/switch.svelte';
  import { ArrowLeft, Printer, Upload, Save, X, Plus } from 'lucide-svelte';

  let patient = {
    nama: '',
    tempat_lahir: '',
    tgl_lahir: '',
    alamat_ktp: {
      provinsi: 'JAWA TIMUR',
      kota_kab: '',
      kecamatan: '',
      desa: '',
      alamat: 'JI Diponegoro Gg.III'
    },
    alamat_domisili: {
      provinsi: 'JAWA TIMUR',
      kota_kab: '',
      kecamatan: '',
      desa: '',
      alamat: 'JI Diponegoro Gg.III'
    },
    provinsi_ktp: 'JAWA TIMUR',
    kota_kab_ktp: '',
    kecamatan_ktp: '',
    desa_ktp: '',
    alamat_sama_dengan_ktp: true,
    hubungan_keluarga_terdekat: 'Kakek',
    nama_keluarga_terdekat: '',
    anggota_keluarga: [
      { nama: 'Faris', hubungan: 'Saudara' },
      { nama: 'Hamzah', hubungan: 'Kakek' }
    ]
  };

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
          <option value="JAWA TIMUR">JAWA TIMUR</option>
          <option value="JAWA TENGAH">JAWA TENGAH</option>
          <option value="JAWA BARAT">JAWA BARAT</option>
        </select>
      </div>

      <!-- kota/kab -->

      <div class="flex lg:col-span-2 lg:justify-end">
        <Label class="text-sm font-medium text-gray-700">Kota/Kab</Label>
      </div>

      <div class="lg:col-span-4">
        <select class="w-full rounded border p-2" bind:value={patient.alamat_ktp.kota_kab}>
          <option value="" disabled selected>Pilih Kota</option>
          <option value="SURABAYA">SURABAYA</option>
          <option value="SIDOARJO">SIDOARJO</option>
          <option value="GRESIK">GRESIK</option>
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
        >
          <option value="" disabled selected>Pilih Kecamatan</option>
          <option value="Kecamatan 1">Kecamatan 1</option>
          <option value="Kecamatan 2">Kecamatan 2</option>
          <option value="Kecamatan 3">Kecamatan 3</option>
          <!-- Add more options as needed -->
        </select>
      </div>

      <div class="flex lg:col-span-2 lg:justify-end">
        <Label for="desa" class="text-sm font-medium text-gray-700">Desa</Label>
      </div>
      <div class="lg:col-span-4">
        <select id="desa" class="w-full rounded border p-2" bind:value={patient.alamat_ktp.desa}>
          <option value="" disabled selected>Pilih Desa</option>
          <option value="Desa 1">Desa 1</option>
          <option value="Desa 2">Desa 2</option>
          <option value="Desa 3">Desa 3</option>
          <!-- Add more options as needed -->
        </select>
      </div>
    </div>

    <h2 class="mb-4 text-lg font-semibold">Alamat Domisili</h2>
    <div class="flex items-center space-x-2">
      <Label for="airplane-mode">Sama Dengan KTP</Label>
      <Switch id="airplane-mode" />
    </div>

    <div class="grid items-center gap-4 lg:grid-cols-12">
      <!-- provinsi -->
      <div class="lg:col-span-2">
        <Label class="text-sm font-medium text-gray-700">Provinsi</Label>
      </div>
      <div class="lg:col-span-4">
        <select class="w-full rounded border p-2" bind:value={patient.alamat_domisili.provinsi}>
          <option value="" disabled selected>Pilih Provinsi</option>
          <option value="JAWA TIMUR">JAWA TIMUR</option>
          <option value="JAWA TENGAH">JAWA TENGAH</option>
          <option value="JAWA BARAT">JAWA BARAT</option>
        </select>
      </div>

      <!-- kota/kab -->

      <div class="flex lg:col-span-2 lg:justify-end">
        <Label class="text-sm font-medium text-gray-700">Kota/Kab</Label>
      </div>

      <div class="lg:col-span-4">
        <select class="w-full rounded border p-2" bind:value={patient.alamat_domisili.kota_kab}>
          <option value="" disabled selected>Pilih Kota</option>
          <option value="SURABAYA">SURABAYA</option>
          <option value="SIDOARJO">SIDOARJO</option>
          <option value="GRESIK">GRESIK</option>
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
        >
          <option value="" disabled selected>Pilih Kecamatan</option>
          <option value="Kecamatan 1">Kecamatan 1</option>
          <option value="Kecamatan 2">Kecamatan 2</option>
          <option value="Kecamatan 3">Kecamatan 3</option>
          <!-- Add more options as needed -->
        </select>
      </div>

      <div class="flex lg:col-span-2 lg:justify-end">
        <Label for="desa" class="text-sm font-medium text-gray-700">Desa</Label>
      </div>
      <div class="lg:col-span-4">
        <select
          id="desa"
          class="w-full rounded border p-2"
          bind:value={patient.alamat_domisili.desa}
        >
          <option value="" disabled selected>Pilih Desa</option>
          <option value="Desa 1">Desa 1</option>
          <option value="Desa 2">Desa 2</option>
          <option value="Desa 3">Desa 3</option>
          <!-- Add more options as needed -->
        </select>
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
          <option value="" disabled selected>Pilih Hubungan</option>
          <option value="Kakek">Kakek</option>
          <option value="Nenek">Nenek</option>
          <option value="Ayah">Ayah</option>
          <option value="Ibu">Ibu</option>
          <option value="Saudara">Saudara</option>
          <option value="Suami">Suami</option>
          <option value="Istri">Istri</option>
          <option value="Anak">Anak</option>
          <option value="Cucu">Cucu</option>
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
                <option value="" disabled selected>Pilih Hubungan</option>
                <option value="Kakek">Kakek</option>
                <option value="Nenek">Nenek</option>
                <option value="Ayah">Ayah</option>
                <option value="Ibu">Ibu</option>
                <option value="Saudara">Saudara</option>
                <option value="Suami">Suami</option>
                <option value="Istri">Istri</option>
                <option value="Anak">Anak</option>
                <option value="Cucu">Cucu</option>
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
    <Button
      type="button"
      on:click={addAnggotaKeluarga}
      class="mt-2 rounded bg-sky-400 px-4 py-2 text-white hover:bg-sky-700"
    >
      <Plus />
      Tambah
    </Button>
    <hr />
    <div
      class="mt-6 flex flex-col space-y-2 sm:flex-row sm:justify-center sm:space-x-2 sm:space-y-0"
    >
      <a href="/">
        <Button type="button" on:click={handleBack} variant="secondary" class="rounded px-6 py-2">
          <ArrowLeft />
          Kembali
        </Button>
      </a>
      <Button
        type="button"
        on:click={handlePrint}
        class="rounded bg-[#00b5c1] px-6 py-2 text-white hover:bg-sky-700"
      >
        <Printer />
        Cetak Berkas
      </Button>
      <Button
        type="button"
        on:click={handleUpload}
        class="rounded bg-[#00b5c1] px-6 py-2 text-white hover:bg-sky-700"
      >
        <Upload />
        Upload Berkas
      </Button>
      <Button
        type="button"
        on:click={handleSave}
        class="rounded bg-sky-400 px-6 py-2 text-white hover:bg-sky-700"
      >
        <Save />
        Simpan
      </Button>
    </div>
  </form>
</div>
