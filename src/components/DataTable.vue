<template>
  <div class="container">
      <div class="text-center">
        <img src="@/assets/pas.png" class="logo-pas">
      </div>
      <div class="card" style="margin-top: 30px;">
        <div class="card-header">
          <h3 class="tulisan-kartu" style="text-align: center; color: #B02120; padding: 10px; font-weight: bold; font-family: 'Kdam Thmor Pro', sans-serif;">Cek Kartu Izin Karyawan</h3>
        </div>
        <div class="card-body">
          <div class="mb-3 text-center">
            <input type="search" v-model="searchInput" class="pencarian form-control" placeholder="Masukan Nomor Induk Karyawan" aria-controls="DataTables_Table_0">
          </div>
          <div class="table-responsive">
            <table class="table display" ref="dataTable">
              <thead>
                  <tr>
                    <th class="text-center">Nama</th>
                    <th class="text-center">NIK</th>
                    <th class="text-center">No Kartu</th>
                    <th class="text-center">Jenis Izin</th>
                    <th class="text-center">Keterangan</th>
                  </tr>
              </thead>
              <tbody class="text-center">

              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>
  <!-- <v-parallax class="background-image" :src="require('@/assets/bg-9.jpg')">
    <v-container>
      <div class="table-kik">
        <v-card class="mx-auto" max-width="80%" elevation="16">
          <v-card-item>
            <v-img class="logo-pt-pas" :src="require('@/assets/pas.png')"></v-img>
            <p class="perusahaan">
              Cek Kartu Izin Karyawan
            </p>
          </v-card-item>
  
          <v-card-text>
            <div>
              <v-text-field density="compact" placeholder="Search" variant="outlined" v-model="searchInput" type="search" class="pencarian" aria-controls="DataTables_Table_0"></v-text-field>
              <table ref="dataTable" class="display">
                <thead>
                  <tr>
                    <th class="text-center">Nama</th>
                    <th class="text-center">NIK</th>
                    <th class="text-center">No Kartu</th>
                    <th class="text-center">Jenis Izin</th>
                    <th class="text-center">Keterangan</th>
                  </tr>
                </thead>
              </table>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </v-parallax> -->
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap');

.pencarian{
  width: 300px;
  margin: auto;
}

@media screen and (max-width: 600px) {
      .logo-pas {
        width: 300px;
        margin-top: 10px;
        margin-bottom: -5px;
      }

      .tulisan-kartu {
        font-size: 23px;
      }

      .pencarian {
        margin-top: 10px;
        margin-bottom: 30px;
      }
}
</style>

<script>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

import $ from 'jquery';
import { db } from '@/main';
import { collection, onSnapshot } from 'firebase/firestore';

export default {
  setup() {
    const dataTable = ref(null);
    const items = ref([]);
    const searchInput = ref('');

    const loadData = () => {
      const pasKaryawanCollection = collection(db, 'PASkaryawan');

      const unsubscribe = onSnapshot(pasKaryawanCollection, (snapshot) => {
        const data = snapshot.docs
          .filter((doc) => doc.data().status === 3)
          .map((doc) => doc.data());
          // console.log(data);
          items.value = data;
          
          // Initialize DataTables
          initializeDataTable();
        });
        
        // Remember to unsubscribe to avoid memory leaks
        onUnmounted(unsubscribe);
      };
      
      const initializeDataTable = () => {
        // Destroy DataTable before initializing it
        if (dataTable.value) {
          $(dataTable.value).DataTable().destroy();
        }
        
        $(dataTable.value).dataTable({searching: false});
      
      // Initialize DataTables
      dataTable.value = $(dataTable.value).DataTable();
    };
      
    const handleSearch = () => {
      // const filteredItems = ([items.value[0]]);
      // console.log(filteredItems);
      // $(dataTable.value).dataTable({searching: false});
      const filteredItems = items.value.filter((item) => {
        // console.log(item)
        return Object.values(item).some((val) =>
        (typeof val === 'string' || val instanceof String) &&
        item.nik.toLowerCase().includes(searchInput.value.toLowerCase())
        )
      }
      );
      
      if (dataTable.value) {
        // Clear the DataTable
        $(dataTable.value).DataTable().clear();
        
        if (searchInput.value) {
          // Add the filtered items to the DataTable only if search is not empty
          filteredItems.forEach((item) => {
            // console.log(item.nama);
            $(dataTable.value).DataTable().row.add([
              item.nama,item.nik,item.no_kartu,item.jenis_izin,item.keterangan
            ]);
          });
        }
        
        // Draw the DataTable
        $(dataTable.value).DataTable().draw();
      } else {
        console.error('DataTables is not properly initialized.');
      }
    };

    onMounted(() => {
      loadData();
    });

    // Watch for changes in searchInput and trigger search
    watch(searchInput, handleSearch);

    return {
      dataTable,
      items,
      searchInput,
      handleSearch,
      filteredItems: computed(() => items.value),
    };
  },
};
</script>