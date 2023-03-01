<template>
    <select>
        <option>&#60;</option>
        <option>&#60;=</option>
        <option selected>=</option>
        <option>>=</option>
        <option>></option>
    </select>
</template>

<style scoped>
select,
option {
    font-weight: 500;
    text-align: center;
}

select {
    width: 2.8rem;
    padding: .5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
}

select::-ms-expand {
    display: none;
}
</style>