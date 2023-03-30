<script setup lang="ts">
import type { SqlColumn } from '@/classes/sqlColumn';
import { SqlCommandTypes } from '@/classes/SqlCommandTypes';
import type { SqlTable } from '@/classes/SqlTable';
import type { PropType } from 'vue';
import { $ref } from 'vue/macros';
import OperatorDropdown from '../components/OperatorDropdown.vue'

 
var selectedConditionColumn = $ref<SqlColumn | undefined>()

const props = defineProps({
    selectedTable: { type: Object as PropType<SqlTable | undefined>, required: true },
    selectedCommand: { type: Object as PropType<SqlCommandTypes>, required: true },
})

defineExpose({
    //selectedOperator
})


</script>

<template>
   
   <div v-if="selectedTable && selectedCommand != SqlCommandTypes.Insert" class="box">

       <h4>Conditions</h4>
       
       <select v-model="selectedConditionColumn">
        <option disabled selected :value="undefined"> Select a Column </option>
        <option v-for="col in selectedTable?.columns" v-bind:value="col">{{ col.name }}</option>
    </select>
    
    <OperatorDropdown v-bind:column-type="selectedConditionColumn?.type" />
    
    <input type="text" value="">
    <button disabled color="green"><i class="fa-solid fa-circle-plus"></i> Add Condition</button>
    
    <br><br>
    <h4> Current conditions: </h4>
    <textarea disabled="true" rows="5"></textarea>
    <button color="red"> <i class="fa-solid fa-trash"></i> Clear all Conditions</button>
</div>

   
</template>

<style scoped></style>