 


<script setup lang="ts">
import type { SqlColumn } from '@/classes/sqlColumn';
import { SqlCommandTypes } from '@/classes/SqlCommandTypes';
import type { SqlCondition } from '@/classes/SqlCondition';
import type { SqlOperators } from '@/classes/SqlOperators';
import type { SqlTable } from '@/classes/SqlTable';
import type {      PropType } from 'vue';
import { $ref } from 'vue/macros';
import OperatorDropdown from '../components/OperatorDropdown.vue'

var selectedConditionColumn = $ref<SqlColumn | undefined>()

const props = defineProps({
    selectedTable: { type: Object as PropType<SqlTable | undefined>, required: true },
    selectedCommand: { type: Object as PropType<SqlCommandTypes>, required: true },
})

var selectedOperator = $ref<string>("probando")

var conditionsString= $ref<string>("")
var conditions= $ref<SqlCondition[]>([])
 

function addCondition() {
    if (!selectedConditionColumn) {
        return}
  // var selectedConditionOperator = document.getElementById("operatorDropdown")?.value

  // conditions.push(new SqlCondition(selectedConditionColumn, selectedConditionOperator, selectedConditionValue))
  // conditionsString = conditionsString + " " + selectedConditionColumn?.name + " " + selectedConditionOperator + " " + selectedConditionValue
}

function updateSelectedOperator(operator: string) {
  selectedOperator = operator;
}
 
</script>

<template>  

parent
{{ selectedOperator }}

   <div v-if="selectedTable && selectedCommand != SqlCommandTypes.Insert" class="box">

       <h4>Conditions</h4>
       
       <select v-model="selectedConditionColumn">
        <option disabled selected :value="undefined"> Select a Column </option>
        <option v-for="col in selectedTable?.columns" v-bind:value="col">{{ col.name }}</option>
    </select>
    
    <OperatorDropdown @operatorSelected="updateSelectedOperator"  :selected-operator="selectedOperator"   v-bind:column-type="selectedConditionColumn?.type" />
    
    <input type="text" value="">
    <button disabled color="green"><i class="fa-solid fa-circle-plus"></i> Add Condition</button>
    
    <br><br>
    <h4> Current conditions: </h4>
    <textarea disabled="true" rows="5"></textarea>
    <button v-show="conditionsString!=''" color="red"> <i class="fa-solid fa-trash"></i> Clear all Conditions</button>
</div>
   
</template>

<style scoped></style>