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
        <div class="row">
            <div class="col-5">
                <h4>Values to Update</h4>

                <div v-for="(col, index) in selectedTable?.columns">
                    <div class="row">

                        <label class="input-height-label col-4 text-end">{{ col.name }}</label>
                        <input class="col-6" :type="col.type == 'Number' ? 'number' : 'text'"
                            v-model="valuesArray[index]" />
                    </div>

                </div>

                <div class="row text-center mt-2">

                    <i>Please fill only the fields that need to be updated.</i>
                </div>
            </div>
            <div class="col-7">
                <h4> New Values: </h4>
                <textarea disabled="true" rows="5">{{ valuesToInsert }}</textarea>
                <button v-on:click="addValues()" :disabled="valuesArray.includes('')" color="green"><i
                        class="fa-solid fa-circle-plus"></i> Add Value</button>
                <button v-on:click="clearValues" v-show="valuesMatrix.length != 0" color="red"> <i
                        class="fa-solid fa-trash"></i>
                    Clear all Values</button>                
            </div>
        </div>
        <div class="row text-center mt-4 mx-4">
        </div>
    </div>
</template>