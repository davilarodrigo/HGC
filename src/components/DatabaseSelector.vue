<script setup lang="ts">

import { ref } from 'vue'
const databasesInfoUrl = "./src/assets/databases.json"
const databasesList = ref<DatabaseSelectOption[]>([])
const tablesList = ref<TableJson[]>([])
const databaseSelectedOption = ref<DatabaseSelectOption>()
const tableSelectedOption = ref<TableJson>()

class TableJson {
  TableName: string
  TableUrl: string
  TableSqlName: string

  constructor(TableName: string, TableUrl: string, TableSqlName: string) {
    this.TableName = TableName
    this.TableUrl = TableUrl
    this.TableSqlName = TableSqlName
  }
}

class DatabaseSelectOption {
  databaseName: string
  baseUrl: string
  contextTableName: string
  sqlSelectUrl: string
  sentencesUrl: string
  //contextTable?: TableJson[]

  constructor(
    databaseName: string, baseUrl: string, contextTableUrl: string, sqlSelectUrl: string, sentencesUrl: string //, contextTable: TableJson[]
  ) {
    this.databaseName = databaseName
    this.baseUrl = baseUrl
    this.contextTableName = contextTableUrl
    this.sqlSelectUrl = sqlSelectUrl
    this.sentencesUrl = sentencesUrl
    //this.contextTable = contextTable
  }

  getContextTableUrl() {
    return this.baseUrl + this.contextTableName
  }
}

async function getTableInfo(base?: DatabaseSelectOption) {
  console.log("getting table info")
  tablesList.value = []
  if (!databaseSelectedOption.value) { return }
  console.log("databaseSelectedOption.value")
  console.log(databaseSelectedOption.value)
  console.log("url:")
  //const url = databaseSelectedOption.value.getContextTableUrl()
  const url = databaseSelectedOption.value.baseUrl + databaseSelectedOption.value.contextTableName
  console.log(url)
  const data = await (await fetch(url)).json()
  console.log(data)
  tablesList.value = data
}

async function getDatabasesInfo() {
  try {
    const data = await (await fetch(databasesInfoUrl)).json()
    console.log("database info:")
    console.log(data)
    databasesList.value = data
  } catch (error) {
    console.error("could not obtain databases info")
  }
}

getDatabasesInfo()

</script>

<template>
  <div class="row">
    <div class="col-lg-4 col-md-4 my-2">
      Origin Database <br>
      <select v-model="databaseSelectedOption" @change="getTableInfo()" class="text-select form-select-sm">
        <option selected>Select Database</option>
        <option v-for="database in databasesList" :value="database"> {{ database.databaseName }} </option>
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
