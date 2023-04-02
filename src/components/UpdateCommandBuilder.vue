<script setup lang="ts">
import type { SqlTable } from '@/classes/SqlTable';
import { $ref } from 'vue/macros';
import { watch, type PropType } from 'vue';

const props = defineProps({ selectedTable: { type: Object as PropType<SqlTable | undefined>, required: true }, })

var valuesArray = $ref<string[]>([])
var valuesToUpdate = $ref("")

const emits = defineEmits(['valuesToUpdate']);
const emitValues = () => { emits('valuesToUpdate', valuesToUpdate) }

watch(() => valuesToUpdate, emitValues, { immediate: true })

watch(() => props.selectedTable, () => {

    if (!props.selectedTable) return

    valuesArray = []
    for (let i = 0; i < props.selectedTable.columns.length; i++) {
        valuesArray.push("")
    }

    valuesToUpdate = ""

}, { immediate: true })

function clearValues() {
    valuesToUpdate = ""

    for (let i = 0; i < valuesArray.length; i++) {
        valuesArray[i] = ""
    }
}

function setValues() {
    valuesToUpdate = " SET "

    for (let i = 0; i < valuesArray.length; i++) {

        if (valuesArray[i] != "") {
            if (props.selectedTable?.columns[i].type == "String") {
                valuesToUpdate += `${props.selectedTable?.columns[i].name} = '${valuesArray[i]}', `
            } else {
                valuesToUpdate += `${props.selectedTable?.columns[i].name} = ${valuesArray[i]}, `
            }
        }
    }

    valuesToUpdate = valuesToUpdate.slice(0, -2)
}

function addHtmlBreakLineAfterCommas(str: string) {
    return str.replace(/,/g, ",<br>").replace(/SET/g, "SET<br>")
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
                        <input :placeholder="'New value for ' + col.name" class="col-6"
                            :type="col.type == 'Number' ? 'number' : 'text'" v-model="valuesArray[index]"
                            @change="setValues" />
                    </div>
                </div>

                <div class="row text-center mt-4">

                    <i>Please fill only the fields that need to be updated.</i>
                </div>
            </div>
            <div class="col-7">
                <h4> New Values: </h4>
                <div v-html="addHtmlBreakLineAfterCommas(valuesToUpdate)" class="text-area-div" rows="5"></div>
                <button v-on:click="clearValues" v-show="valuesToUpdate" color="red"> <i class="fa-solid fa-trash"></i>
                    Clear all Values</button>
            </div>
        </div>
        <div class="row text-center mt-4 mx-4">
        </div>
    </div>
</template>