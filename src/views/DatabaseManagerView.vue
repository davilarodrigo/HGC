<script setup lang="ts">

import { $ref } from "vue/macros"
import type { Database } from "@/classes/Database"
import type { DatabaseTable } from "src/classes/DatabaseTable"
import { ConnectionManager } from "@/classes/ConnectionManager"

var databasesList = $ref<Database[]>([])
var databaseSelectedOption = $ref<Database | undefined>()
const connectionManager = $ref<ConnectionManager>(ConnectionManager.connectionManager)

async function databaseSelectChangeEvent() {
  if (!databaseSelectedOption) {
    return
  }

  try {
    await connectionManager.connectToDatabase(databaseSelectedOption)
  } catch (error) {
    databaseSelectedOption = undefined
  }

}

async function loadDatabaseList() {
  databasesList = await connectionManager.getDatabaseList()
}

async function setupPage() {
  databaseSelectedOption = await connectionManager.currentConnection?.database

  await loadDatabaseList()
}

function disconnect() {
  databaseSelectedOption=undefined
  connectionManager.disconnect()
}

setupPage()

</script>

<template>
  <h1>Manage Database Connections</h1>
  <div class="box">
    <div class="row">
      <div class="col-4">
        Origin Database <br>
        <select v-model="databaseSelectedOption" @change="databaseSelectChangeEvent()">
          <option disabled selected :value="undefined"> Select a Database </option>
          <option v-for="database in databasesList" v-bind:value="database"> {{ database.databaseName }} </option>
        </select>
        <br>
        <span v-if="connectionManager.connectionStatus == 'Error'">Error connecting to database</span>
        <span v-if="connectionManager.connectionStatus == 'Connected'">Successfully connected to database</span>
        <span v-if="connectionManager.connectionStatus == 'Connecting'" class="loading-dots">Connecting to
          database</span>

        <div v-if="connectionManager.connectionStatus == 'Connected'"> <br>
          <button v-on:click="disconnect">Disconnect from Database</button>
        </div>

      </div>
      <div v-if="connectionManager.connectionStatus == 'Connected'" class="jumbotron col-8">
        <h5>Database info</h5>
        <strong>URL: </strong> {{ connectionManager.currentConnection?.database.baseUrl }} <br>
        <strong>Context table name: </strong> {{ connectionManager.currentConnection?.database.contextTableName }} <br>
        <strong>Database name: </strong> {{ connectionManager.currentConnection?.database.databaseName }} <br>
      </div>
    </div>
    <div v-if="connectionManager.connectionStatus == 'Connected'" class="tables">
    <br><br>
    <h5>Database Tables</h5>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="col-1">Table Name</th>
          <th class="col-1">Primary Key</th>
          <th class="col-4">Columns</th>
            <th class="col-1">Number of Rows</th>
          </tr>
        </thead>
        <tr>
          <td>Clients</td>
          <td>Name</td>
          <td>Name, Last name, Email, Phone number</td>
          <td>4</td>
        </tr>
        <tr>
          <td>Products</td>
          <td>ID</td>
          <td>Product name, Description, Price</td>
          <td>10</td>
        </tr>
        <tr>
          <td>Providers</td>
          <td>ID</td> 
          <td>Name, Last name, Email</td>
          <td>5</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="box">
    <h4>Add new Database</h4>
    <input type="text" placeholder="Database name">
    <input type="text" placeholder="Database IP">
    <input type="text" placeholder="Context table name">
    <button color="green">Save</button>

  </div>

  <!-- table select -->
  <!-- <div class="row">
                                <div class="mt-2 mb-4">
                                  Table<br>
                                  <select :disabled="tablesList.length == 0" v-model="tableSelectedOption">
                                    <option disabled selected :value="undefined"> Select a Table</option>
                                    <option v-for="table in tablesList" :value="table"> {{ table.TableName }} </option>
                                  </select>
                                </div>
                              </div> -->
</template>
