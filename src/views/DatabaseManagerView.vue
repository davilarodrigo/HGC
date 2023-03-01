<script setup lang="ts">

import { $ref } from "vue/macros"
import type { DatabaseInformationObject } from "src/classes/DatabaseInformationObject"
import type { DatabaseTable } from "src/classes/DatabaseTable"
import { DatabaseConnectionManager } from "@/classes/DatabaseConnectionManager";

var databasesList = $ref<DatabaseInformationObject[]>([])
var tablesList = $ref<DatabaseTable[]>([])
var tableSelectedOption = $ref<DatabaseTable>()
var databaseSelectedOption = $ref<DatabaseInformationObject>()
const connectionManager = $ref<DatabaseConnectionManager>(DatabaseConnectionManager.databaseConnectionManager)

async function databaseSelectChangeEvent() {
  tablesList = []

  if (!databaseSelectedOption) { return }

  await connectionManager.connectToDatabase(databaseSelectedOption)
  tablesList = await connectionManager.getDatabaseTables()

  databaseSelectedOption = undefined
}

async function loadDatabaseList() {
  databasesList = await connectionManager.getDatabaseList()
}

loadDatabaseList()

</script>

<template>
  <h3>Manage Database Connections</h3>
  <div class="row">
    <div class="my-2">
      Origin Database <br>
      <select v-model="databaseSelectedOption" @change="databaseSelectChangeEvent()" class="text-select form-select-sm">
        <option disabled selected :value="undefined"> Select a Database </option>
        <option v-for="database in databasesList" v-bind:value="database"> {{ database.databaseName }} </option>
      </select>
      <br>
      <span v-if="connectionManager.connectionStatus == 'Disconnected'">Select a database</span>
      <span v-if="connectionManager.connectionStatus == 'Error'">Error connecting to database</span>
      <span v-if="connectionManager.connectionStatus == 'Connected'">Successfully connected to database</span>
      <span v-if="connectionManager.connectionStatus == 'Connecting'" class="loading-dots">Connecting to
        database</span>
    </div>
  </div>

  <div class="row">
    <div class="mt-2 mb-4">
      Table<br>
      <select :disabled="tablesList.length == 0" v-model="tableSelectedOption"
        class="text-select form-select-sm tables-select " name="" id="main-table-select">
        <option disabled selected :value="undefined"> Select a Table</option>
        <option v-for="table in tablesList" :value="table"> {{ table.TableName }} </option>
      </select>
    </div>
  </div>
</template>
