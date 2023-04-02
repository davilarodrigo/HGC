<script setup lang="ts">
import type { SqlTable } from '@/classes/SqlTable';
import { $ref } from 'vue/macros';
import { watch, type PropType } from 'vue';

const props = defineProps({ selectedTable: { type: Object as PropType<SqlTable | undefined>, required: true }, })

var valuesArray = $ref<string[]>([])
var valuesMatrix = $ref<string[][]>([])
var valuesToInsert = $ref("")

const emits = defineEmits(['valuesToInsert']);
const emitValues = () => { emits('valuesToInsert', valuesToInsert) }

watch(() => valuesToInsert, emitValues, { immediate: true })

watch(() => props.selectedTable, () => {

    if (!props.selectedTable) return

    valuesArray = []
    for (let i = 0; i < props.selectedTable.columns.length; i++) {
        valuesArray.push("")
    }

    valuesToInsert = ""

}, { immediate: true })

function clearValues() {
    valuesMatrix = []
    valuesToInsert = ""

    for (let i = 0; i < valuesArray.length; i++) {
        valuesArray[i] = ""
    }
}

function addValues() {
    if (valuesArray.includes("")) {
        console.error("Empty values")
        return
    }

    for (const val in valuesArray) {
        if (props.selectedTable?.columns[val].type == "String") {
            valuesArray[val] = "'" + valuesArray[val] + "'"
        }
    }

    valuesMatrix.push(valuesArray)
    valuesToInsert = " VALUES "
    for (let i = 0; i < valuesMatrix.length; i++) {
        valuesToInsert += "("
        for (let j = 0; j < valuesMatrix[i].length; j++) {
            valuesToInsert += valuesMatrix[i][j]
            if (j != valuesMatrix[i].length - 1) {
                valuesToInsert += ", "
            }
        }
        valuesToInsert += ")"
        if (i != valuesMatrix.length - 1) {
            valuesToInsert += ", "
        }
    }

    for (let i = 0; i < valuesArray.length; i++) {
        valuesArray[i] = ""
    }
}

</script>

<template>
    <div class="box">

        <h4>Values to Insert</h4>

        <input v-for="(col, index) in selectedTable?.columns" :placeholder="col.name"
            :type="col.type == 'Number' ? 'number' : 'text'" v-model="valuesArray[index]" />

        <br>

        <button v-on:click="addValues()" :disabled="valuesArray.includes('')" color="green"><i
                class="fa-solid fa-circle-plus"></i> Add Value</button>

        <button v-on:click="clearValues" v-show="valuesMatrix.length != 0" color="red"> <i class="fa-solid fa-trash"></i>
            Clear all Values</button>

        <br><br>
        <h4> Current Values: </h4>
        <textarea disabled="true" rows="5">{{ valuesToInsert }}</textarea>
    </div>
</template>