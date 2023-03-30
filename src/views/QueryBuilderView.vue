
<script setup lang="ts">
import OperatorDropdown from '../components/OperatorDropdown.vue'
import type { Connection } from '@/classes/Connection';
import { ConnectionManager } from '@/classes/ConnectionManager';
import { SqlCommandTypes } from '@/classes/SqlCommandTypes';
import type { SqlTable } from '@/classes/SqlTable'
import { $ref } from 'vue/macros';
import type { SqlColumn } from '@/classes/SqlColumn';
import { SqlDataTypes } from '@/classes/SqlDataTypes';

var connection: Connection | undefined
var selectedTable = $ref<SqlTable | undefined>()
var selectedCommand = $ref<SqlCommandTypes>(SqlCommandTypes.Select)
var selectedConditionColumn = $ref<SqlColumn|undefined>()

var selectedColumns = $ref<SqlColumn[]>([])

var outputSentence = $ref<string>("")

var tables: SqlTable[] = []
async function setupPage() {
    connection = await ConnectionManager.connectionManager.currentConnection

    if (connection) {
        tables = await connection.getTables()
    }
}

async function tableSelectChangeEvent() {
    selectedColumns = []
    selectedConditionColumn=undefined
    setupOutputSentence()
}

function setupOutputSentence() {
    switch (selectedCommand) {
        case SqlCommandTypes.Select:

            var columns = "*"
            if (selectedColumns.length != 0) {
                columns = selectedColumns.map(c => c.name).join(", ")
            }

            outputSentence = `SELECT ${columns} FROM ${selectedTable?.sqlName}`

            break;
        case SqlCommandTypes.Delete:
            outputSentence = `DELETE FROM ${selectedTable?.sqlName}`
            break;
        case SqlCommandTypes.Update:
            outputSentence = `UPDATE ${selectedTable?.sqlName}`
            break;
        case SqlCommandTypes.Insert:
            outputSentence = `INSERT INTO ${selectedTable?.sqlName}`
            break;
    }
 
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
                <select v-model="selectedCommand" long>
                    <option value="Select">SELECT</option>
                    <option value="Delete">DELETE</option>
                    <option value="Update">UPDATE</option>
                    <option value="Insert">INSERT</option>
                </select>
            </div>
            <div class="col-3">
                &nbsp; <br>
                <button> <i class="fas fa-window-restore">&nbsp;&nbsp;</i>Select a Template</button>
            </div>
        </div>
    </div>

    <div v-if="selectedTable && selectedCommand == SqlCommandTypes.Select" class="box">
        <h4>Columns to Show</h4>
        <div class="row">
            <div v-for="col in selectedTable?.columns" class="col-3"> <input @change="setupOutputSentence()"
                    v-model="selectedColumns" :value="col" type="checkbox"> {{ col.name }}<br>
            </div>
        </div>
    </div>

    <div v-if="selectedTable && selectedCommand != SqlCommandTypes.Insert" class="box">

        <h4>Conditions</h4>

        <select v-model="selectedConditionColumn" @change="setupOutputSentence()">
            <option disabled selected :value="undefined"> Select a Column </option>
            <option v-for="col in selectedTable?.columns" v-bind:value="col">{{ col.name }}</option>
        </select>
                
        is
        <select v-if="selectedConditionColumn?.type ==SqlDataTypes.String">
            <option value="">Like</option>
            <option value="">Not Like</option>
        </select>

        <OperatorDropdown v-if="selectedConditionColumn?.type==SqlDataTypes.Number"/>

        <input type="text" value="">
        <button color="green"><i class="fa-solid fa-circle-plus"></i> Add Condition</button>

        <br><br>
        <h4> Current conditions: </h4>
        <textarea disabled="true" rows="5"></textarea>
        <button color="red"> <i class="fa-solid fa-trash"></i> Clear all Conditions</button>

    </div>

    <div v-if="selectedTable" class="box">

        <h4>Sentence Output</h4>

        <textarea disabled="true" rows="5">{{ outputSentence }}</textarea>

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
 