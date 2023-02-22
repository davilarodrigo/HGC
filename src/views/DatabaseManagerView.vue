<script setup lang="ts">

import { $ref } from "vue/macros"
import type { DatabaseInformationObject } from "src/classes/DatabaseInformationObject"
import type { DatabaseTable } from "src/classes/DatabaseTable"
import { DatabaseConnectionManager } from "@/classes/DatabaseConnectionManager";

var databasesList = $ref<DatabaseInformationObject[]>([])
var tablesList = $ref<DatabaseTable[]>([])
var tableSelectedOption = $ref<DatabaseTable>()
var databaseSelectedOption = $ref<DatabaseInformationObject>()

const databaseConnectionManager = DatabaseConnectionManager.databaseConnectionManager

async function databaseSelectChangeEvent() {
  if (!databaseSelectedOption) { return }

  await databaseConnectionManager.connectToDatabase(databaseSelectedOption)
  tablesList = await databaseConnectionManager.getDatabaseTables()
}

async function loadDatabaseList() {
  databasesList = await databaseConnectionManager.getDatabaseList()
}

loadDatabaseList()

</script>

<template>
  <h3>Manage Database Connections</h3>
  <div class="row">
    <div class="col-lg-4 col-md-4 my-2">
      Origin Database <br>
      <select v-model="databaseSelectedOption" @change="databaseSelectChangeEvent()" class="text-select form-select-sm">

        <option v-for="database in databasesList" v-bind:value="database"> {{ database.databaseName }} </option>
      </select>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-4 col-md-4 mt-2 mb-4">
      Table<br>
      <select v-model="tableSelectedOption" class="text-select form-select-sm tables-select " name=""
        id="main-table-select">
        <option selected>Select Table</option>
        <option v-for="table in tablesList" :value="table"> {{ table.TableName }} </option>
      </select>
    </div>
  </div>
</template>
