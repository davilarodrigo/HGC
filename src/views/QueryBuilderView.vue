
<script setup lang="ts">
import OperatorDropdown from '../components/OperatorDropdown.vue'
import ConditionBuilder from '../components/ConditionBuilder.vue'
import InsertCommandBuilder from '../components/InsertCommandBuilder.vue'
import UpdateCommandBuilder from '../components/UpdateCommandBuilder.vue'

import type { SqlTable } from '@/classes/SqlTable'
import type { SqlColumn } from '@/classes/SqlColumn'
import type { Connection } from '@/classes/Connection'
import { ConnectionManager } from '@/classes/ConnectionManager'
import { SqlCommandTypes } from '@/classes/SqlCommandTypes'
import { $ref } from 'vue/macros'
import { SqlDataTypes } from '@/classes/SqlDataTypes'
import { SqlCondition } from '@/classes/SqlCondition'
import { watch } from 'vue'

var connection: Connection | undefined
var selectedTable = $ref<SqlTable | undefined>()
var selectedCommand = $ref<SqlCommandTypes>(SqlCommandTypes.Select)
var selectedColumns = $ref<SqlColumn[]>([])
var outputSentence = $ref<string>("")
var currentConditions = $ref<SqlCondition[]>([])
var valuesToInsert = $ref<string | undefined>("")
var valuesToUpdate = $ref<string | undefined>("")
var textAreaDisabled = $ref<boolean>(false)

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
            outputSentence += valuesToUpdate
            break;
        case SqlCommandTypes.Insert:
            outputSentence = `INSERT INTO ${selectedTable?.sqlName}`
            outputSentence += valuesToInsert
            break;
        default:
            outputSentence = "Error: No command selected"
            break;
    }

    if (selectedCommand != SqlCommandTypes.Insert) {
        if (currentConditions.length) {
            outputSentence += SqlCondition.getConditionsAsSql(currentConditions)
        }
    }
}

function updateConditions(conditions: SqlCondition[]) {
    currentConditions = conditions
    setupOutputSentence()
}

function updateValuesToInsert(values: string) {
    valuesToInsert = values
    setupOutputSentence()
}

function updateValuesToUpdate(values: string) {
    valuesToUpdate = values
    setupOutputSentence()
}

await setupPage()

function highlightStrings(sentence: string) {
    const regex = /'(.*?)'/g; // Expresión regular para detectar cadenas entre comillas simples
    return sentence.replace(regex, `<span class="sql-string">'$1'</span>`);
}

function highlightParenthesis(text: string): string {
    const regex = /\('.*?'\)/g;
    let match = regex.exec(text);
    let result = '';
    let lastIndex = 0;

    while (match) {
        const startIndex = match.index + 1;
        const endIndex = startIndex + match[1].length;
        result += text.slice(lastIndex, startIndex);
        result += `<span class="sql-parenthesis">${match[1]}</span>`;
        lastIndex = endIndex;
        match = regex.exec(text);
    }

    result += text.slice(lastIndex);
    return result;
}

function highlightPunctuation(text: string): string {
    const punctuationRegex = /[(),;]/g;
    return text.replace(punctuationRegex, (match) => {
        return `<span class="sql-punctuation">${match}</span>`;
    });
}

function highlightKeywords(sentence: string) {
    const keywords = ["SELECT", "FROM", "WHERE", "INTO", "INSERT", "VALUES", "UPDATE", "DELETE", "LIKE", "NOT", "AND", "SET"];

    const output = sentence
        .split(" ")
        .map((word) => {
            const isKeyword = keywords.includes(word.toUpperCase());
            if (isKeyword) {
                return `<span class="keyword">${word}</span>`;
            } else {
                return word;
            }
        })
        .join(" ")

    return output
}

function insertBreakLines(sentence: string) {
    const breakLinesAfter = ["FROM","WHERE","SET","VALUES",", ("]
    
    //add a <br> after each closing parenthesis and comma "),"
    sentence = sentence.replace(/\),/g, "),<br>")

    return sentence
        .split(" ")
        .map((word) => {
            const isBreakLine = breakLinesAfter.includes(word.toUpperCase());
            if (isBreakLine) {
                return `<br> ${word}`;
            } else {
                return word;
            }
        })
        .join(" ")
}

function highlightSql(sentence: string) {
    sentence = insertBreakLines(sentence)
    sentence = highlightStrings(sentence)
    sentence = highlightPunctuation(sentence)
    sentence = highlightKeywords(sentence)
    return sentence
}

</script>

<template>
    {{ valuesToInsert }}
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

        <div :contenteditable="textAreaDisabled" class="text-area-div" v-html="highlightSql(outputSentence)"></div>

        <div class="row mt-1">
            <div class="col">
                <button>Save as Template</button>
                <button>Load Template</button>
            </div>
            <div class="col text-end">
                <input v-model="textAreaDisabled" type="checkbox" name="" id=""> enable manual edition
                <button color="green">Post Query</button>
            </div>
        </div>
    </div>

    <ConditionBuilder @conditions-list="updateConditions" :selected-command="selectedCommand"
        :selected-table="selectedTable" />

    <UpdateCommandBuilder @values-to-update="updateValuesToUpdate"
        v-if="selectedTable && selectedCommand == SqlCommandTypes.Update" :selected-table="selectedTable" />

    <InsertCommandBuilder @values-to-insert="updateValuesToInsert"
        v-if="selectedTable && selectedCommand == SqlCommandTypes.Insert" :selected-table="selectedTable" />

    <div v-if="selectedTable && selectedCommand == SqlCommandTypes.Select" class="box">
        <h4>Columns to Show</h4>
        <div class="row">
            <div v-for="col in selectedTable?.columns" class="col-3"> <input @change="setupOutputSentence()"
                    v-model="selectedColumns" :value="col" type="checkbox"> {{ col.name }}<br>
            </div>
        </div>
    </div>
</template>
 
<style  >
.keyword {
    font-weight: bold;
    color: rgb(73, 73, 221);
}

.sql-punctuation {
    font-weight: 500;
    color: rgb(0, 0, 0);
}

.sql-string {
    font-weight: 500;
    color: rgb(185, 52, 52);
}
</style>