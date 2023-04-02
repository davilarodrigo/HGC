<script setup lang="ts">
import type { SqlColumn } from '@/classes/sqlColumn';
import { SqlCommandTypes } from '@/classes/SqlCommandTypes';
import { SqlCondition } from '@/classes/SqlCondition';
import type { SqlOperators } from '@/classes/SqlOperators';
import type { SqlTable } from '@/classes/SqlTable';
import { watch, type PropType } from 'vue';
import { $ref } from 'vue/macros';
import OperatorDropdown from '../components/OperatorDropdown.vue'

const props = defineProps({
    selectedTable: { type: Object as PropType<SqlTable | undefined>, required: true },
    selectedCommand: { type: Object as PropType<SqlCommandTypes>, required: true },
})

var selectedColumn = $ref<SqlColumn | undefined>()
var selectedOperator = $ref<SqlOperators>()
var conditionValue = $ref<string>("")

var conditionsString = $ref<string>("")
var conditions = $ref<SqlCondition[]>([])

const emits = defineEmits(['conditionsList']);

const emitConditions = () => {
    emits('conditionsList', conditions)
}

watch(() => conditions, emitConditions , {immediate:true})

function addCondition() {
    console.log("Adding condition")
    if (!selectedColumn) {
        console.log("No column selected")
        return
    }
    if (!selectedOperator) {
        console.log("No operator selected")
        return
    }
    if (!conditionValue) {
        console.log("No condition value")
        return
    }

    if (selectedColumn.type == "String") {
        conditionValue = "'" + conditionValue + "'"
    }

    conditions.push(new SqlCondition(selectedColumn, selectedOperator, conditionValue))

    if (conditions.length == 1) {
        conditionsString = "WHERE "
    }else{
        conditionsString += " AND "
    }

    conditionsString += selectedColumn.name + " " + selectedOperator + " " + conditionValue
    emitConditions()
 
    selectedColumn = undefined
    selectedOperator = undefined
    conditionValue = ""
}

function updateSelectedOperator(operator: SqlOperators) {
    selectedOperator = operator;
}

function clearConditions() {
    conditions = []
    conditionsString = ""
}

</script>

<template>
    <div v-if="selectedTable && selectedCommand != SqlCommandTypes.Insert" class="box">

        <h4>Conditions</h4>

        <select v-on:change="conditionValue=''" v-model="selectedColumn">
            <option disabled selected :value="undefined"> Select a Column </option>
            <option v-for="col in selectedTable?.columns" v-bind:value="col">{{ col.name }}</option>
        </select>

        <OperatorDropdown @operatorSelected="updateSelectedOperator" :selected-operator="selectedOperator"
            v-bind:column-type="selectedColumn?.type" />

        <input :type="selectedColumn?.type=='Number'?'number':'text'" v-model="conditionValue">
        <button v-on:click="addCondition()" :disabled="!selectedColumn || !selectedOperator || !conditionValue"
            color="green"><i class="fa-solid fa-circle-plus"></i> Add Condition</button>

        <br><br>
        <h4> Current conditions: </h4>
        <textarea disabled="true" rows="5">{{ conditionsString }}</textarea>
        <button v-on:click="clearConditions" v-show="conditionsString != ''" color="red"> <i class="fa-solid fa-trash"></i>
            Clear all Conditions</button>
    </div>
</template>

