<script setup lang="ts">

import { SqlDataTypes } from '@/classes/SqlDataTypes';
import { SqlOperators } from '@/classes/SqlOperators';
import { defineExpose, type PropType } from 'vue'
import { $ref } from 'vue/macros';

var selectedOperator = $ref<SqlOperators>()

const props = defineProps({
  columnType: String as PropType<SqlDataTypes>
})

defineExpose({
  selectedOperator
})

</script>

<template>
    <select class="number-select" v-model="selectedOperator"  v-if="columnType==SqlDataTypes.Number">      
        <option disabled :value="undefined">-</option>
        <option :value="SqlOperators.greaterThanOrEqual">>=</option>
        <option :value="SqlOperators.greaterThan">></option>
        <option  :value="SqlOperators.equals">=</option>
        <option :value="SqlOperators.notEquals">!=</option>
        <option :value="SqlOperators.lessThanOrEqual">&#60;=</option>
        <option :value="SqlOperators.lessThan">&#60;</option>
    </select>
    
    <span  v-if="columnType==SqlDataTypes.String">is</span>

    <select class="string-select" v-model="selectedOperator" v-if="columnType==SqlDataTypes.String" >
        <option disabled :value="undefined">-</option>
        <option :value="SqlOperators.like">Like</option>
        <option :value="SqlOperators.notLike">Not Like</option>
    </select>
</template>

<style scoped>

.number-select {
    width: 2.8rem;
    padding: .5rem;  
    text-indent: 1px;
    text-overflow: '';
    appearance: none;
}

.number-select>option {
    text-align: center;
    font-weight: 500;
}

.string-select {
    width: 6.5rem;
}

select {   
    padding: .5rem;
    text-indent: 1px;
    text-overflow: '';
}

</style>