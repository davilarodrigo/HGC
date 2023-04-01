
<script setup lang="ts">
import OperatorDropdown from '../components/OperatorDropdown.vue'
import ConditionBuilder from '../components/ConditionBuilder.vue'
import type { Connection } from '@/classes/Connection'
import { ConnectionManager } from '@/classes/ConnectionManager'
import { SqlCommandTypes } from '@/classes/SqlCommandTypes'
import type { SqlTable } from '@/classes/SqlTable'
import { $ref } from 'vue/macros'
import type { SqlColumn } from '@/classes/SqlColumn'
import { SqlDataTypes } from '@/classes/SqlDataTypes'
import { SqlCondition } from '@/classes/SqlCondition'
import { watch } from 'vue'

var connection: Connection | undefined
var selectedTable = $ref<SqlTable | undefined>()
var selectedCommand = $ref<SqlCommandTypes>(SqlCommandTypes.Select)
var selectedColumns = $ref<SqlColumn[]>([])
var outputSentence = $ref<string>("")
var currentConditions = $ref<SqlCondition[]>([])

var tables: SqlTable[] = []
async function setupPage() {
    connection = await ConnectionManager.connectionManager.currentConnection

    if (connection) {
        tables = await connection.getTables()
    }
}

async function tableSelectChangeEvent() {
    selectedColumns = []
    setupOutputSentence()
}

watch(() => selectedCommand, setupOutputSentence, { immediate: true })
watch(() => selectedColumns, setupOutputSentence, { immediate: true })
watch(() => currentConditions, setupOutputSentence, { immediate: true })

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

function updateConditions(conditions: SqlCondition[]) {
    currentConditions = conditions
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

    <div v-if="selectedTable" class="box">

        <h4>Sentence Output</h4>

        <textarea disabled="true"
            rows="5">{{ outputSentence + SqlCondition.getConditionsAsSql(currentConditions) }}</textarea>

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

    <ConditionBuilder @conditions-list="updateConditions" :selected-command="selectedCommand"
        :selected-table="selectedTable" />

    <div v-if="selectedTable && selectedCommand == SqlCommandTypes.Select" class="box">
        <h4>Columns to Show</h4>
        <div class="row">
            <div v-for="col in selectedTable?.columns" class="col-3"> <input @change="setupOutputSentence()"
                    v-model="selectedColumns" :value="col" type="checkbox"> {{ col.name }}<br>
            </div>
        </div>
    </div>
</template>
 