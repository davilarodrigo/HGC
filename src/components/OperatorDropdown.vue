<script setup lang="ts">

import { SqlDataTypes } from '@/enums/SqlDataTypes'
import { SqlOperators } from '@/enums/SqlOperators'
import { watch, type PropType } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { $ref } from 'vue/macros'

const props = defineProps({
    columnType: String as PropType<SqlDataTypes>,
})

const emits = defineEmits(['operatorSelected'])

var selectedOperator = $ref<SqlOperators | undefined>(undefined)

function emitOperatorSelected() {
    emits('operatorSelected', selectedOperator)
}

function handleColumnTypeChange() {
    selectedOperator = undefined;
    if (props.columnType == SqlDataTypes.Number) {
        selectedOperator = SqlOperators.equals
        emitOperatorSelected()
    }
}

watch(() => props.columnType, handleColumnTypeChange, { immediate: true })

</script>

<template>
    <select class="number-select" v-model="selectedOperator" @change="emitOperatorSelected"
        v-if="columnType == SqlDataTypes.Number">
        <option :value="SqlOperators.greaterThanOrEqual">>=</option>
        <option :value="SqlOperators.greaterThan">></option>
        <option :value="SqlOperators.equals">=</option>
        <option :value="SqlOperators.notEquals">!=</option>
        <option :value="SqlOperators.lessThanOrEqual">&#60;=</option>
        <option :value="SqlOperators.lessThan">&#60;</option>
    </select>

    <span v-else>is <select class="string-select" v-model="selectedOperator" @change="emitOperatorSelected">
            <option disabled :value="undefined">-</option>
            <option :value="SqlOperators.like">Like</option>
            <option :value="SqlOperators.notLike">Not Like</option>
        </select>
    </span>
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