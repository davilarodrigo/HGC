
<script setup lang="ts">
import type { Connection } from '@/classes/Connection';
import { ConnectionManager } from '@/classes/ConnectionManager';
import type { SqlTable } from '@/classes/SqlTable'
import { $ref } from 'vue/macros';

var connection: Connection | undefined
var selectedTable = $ref<SqlTable | undefined>()

var tables: SqlTable[] = []
async function setupPage() {
    connection = await ConnectionManager.connectionManager.currentConnection

    if (connection) {
        tables = await connection.getTables()
    }
    console.log(tables)
}

async function tableSelectChangeEvent(){
    console.log(selectedTable)
}

await setupPage()

</script>

<template>
    <h1>SQL Query Builder</h1>

    <div class="box">
        <div class="row">
            <div class="col-2">
                Table <br>
                <select v-model="selectedTable" @change="tableSelectChangeEvent()">
                    <option disabled selected :value="undefined"> Select a Table </option>
                    <option v-for="tab in tables" v-bind:value="tab">{{ tab.name }}</option>
                </select>
            </div>
            <div class="col-2">
                SQL Command <br>
                <select long>
                    <option value="SELECT">Select</option>
                    <option value="DELETE">Delete</option>
                    <option value="UPDATE">Update</option>
                    <option value="INSERT">Insert</option>
                </select>
            </div>
            <div class="col-3">
                &nbsp; <br>
                <button> <i class="fas fa-window-restore">&nbsp;&nbsp;</i>Select a Template</button>
            </div>
        </div>
    </div>

    <div class="box">
        <h4>Columns to Show</h4>
        <div class="row">
            <div v-for="col in selectedTable?.columns" class="col-3"> <input type="checkbox"> {{ col.ColumnName }}<br>
            </div>
        </div>
    </div>

    <div class="box">

        <h4>Conditions</h4>

        <select>
            <option value="">Phone</option>
            <option value="">Name</option>
            <option value="">Long select option</option>
        </select>
        is
        <select>
            <option value="">equal to</option>
            <option value="">greater than</option>
        </select>

        <input type="text" value="351 4774362">
        <button color="green"><i class="fa-solid fa-circle-plus"></i> Add Condition</button>

        <br><br>
        <h4> Current conditions: </h4>
        <textarea disabled="true" rows="5"></textarea>
        <button color="red"> <i class="fa-solid fa-trash"></i> Clear all Conditions</button>

    </div>

    <div class="box">

        <h4>Sentence Output</h4>

        <textarea disabled="true" rows="5"></textarea>

        <div class="row mt-1">
            <div class="col">
                <button>Save as Template</button>
                <button>Load Template</button>
            </div>
            <div class="col text-end">
                <input type="checkbox" name="" id=""> enable manual edition
                <button color="green">Post Query</button>
            </div>
        </div>
    </div>
</template>