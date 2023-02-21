<script setup lang="ts">
console.log("ReportsScreen loaded")
</script>

<template>
    <div id="template-loader-div">
        <div class="row">
            <h3>Load Template </h3>
        </div>
        <div class="row">
            <div class="col my-3">
                <b> Template Name: </b>
                <span id="template-name-label"> </span>
            </div>
        </div>
        <div class="row">
            <table class=" table " id="template-loader-table">

            </table>
            <div class="col">
                <button id="generate-sentence-button" class="btn btn-success">Generate Sentence</button>
            </div>
        </div>

    </div>
    <div id="template-creation-div">
        <div class="row">
            <h3>Configure the Template</h3>
        </div>

        <div class="row">
            <div class="col my-3">
                Template Name: <input id="template-name-input" type="text">
            </div>
        </div>

        <table class="align-middle table table-striped" id="template-creation-table">
            <tr>
                <th> Column Name and Type </th>
                <th> Condition Value and Operator </th>
                <th> Template Options </th>
            </tr>
        </table>

        <div class="col">
            <button id="save-template-button" class="btn btn-primary"><i class="fa-solid fa-circle-plus"></i> Save
                Template</button>
            <button id="discard-template-button" class="btn btn-danger"> Discard Template</button>
        </div>
        <div class="row">
        </div>
    </div>
    <div id="template-viewer-div" class="row">
        <h3>Available Templates</h3>
        <div class="col">
            <p id="no-templates-message">No templates found for this table </p>
            <table class="align-middle table" id="template-viewer-table">

            </table>
        </div>
    </div>
</template>