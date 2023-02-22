
<script setup lang="ts">
</script>
<template>

        <div id="sentence-editor-div" class="container">
            <div class="row">
                <div class="col-lg-2 col-md-3 my-2">
                    SQL Command <br>
                    <select class="text-select form-select-sm" name="" id="sql-command-select">
                        <option value="SELECT">Select</option>
                        <option value="DELETE">Delete</option>
                        <option value="UPDATE">Update</option>
                        <option value="INSERT">Insert</option>
                    </select>
                </div>
            </div>

            <div id="sentece-output-div" class="row ">
                <h4>Sentence Output</h4>
                <textarea name="" id="sentence-output-text-area" disabled="true" rows="5"></textarea>
            </div>

            <div class="row mt-1">
                <div class="col ">
                    <button class="btn btn-success" id="create-template-button">Save as Template</button>
                    <button class="btn btn-secondary" id="load-template-button">Load Template</button>
                </div>
                <div class="col ">
                    <p class="text-end">
                        <span> <input type="checkbox" name="" id=""> enable manual edition </span>
                        <button id="post-query-button" class="btn btn-primary">Post Query</button>
                    </p>
                </div>
            </div>
            <div id="select-options-div" class="mt-4 row">
                <h4>Select Options</h4>
                <div class="col">
                    Show Columns
                    <table class="table" id="select-table"></table>
                </div>
            </div>
            <div id="update-options-div" hidden class="mt-4 row">
                <h4>Update Options</h4>
                //what columns to update and what values to set
            </div>
            <div id="insert-options-div" hidden class="mt-4 row">
                <h4>Insert Values</h4>
                //what values to insert, and in which columns
            </div>
            <div id="conditions-div" class="mt-4 row">
                <!-- only visible while on "update" or "delete" mode -->
                <h4>Conditions</h4>
                <div class="col">
                    <p>
                        <select class="text-select form-select-sm inline " name="" id="column-condition-select">
                        </select>
                        is
                        <select class="form-select-sm text-select" name="" id="operator-condition-select">
                        </select>
                        <input class="condition-text" type="text" name="" id="value-condition-input" value="">
                        <button class="btn-dark btn" id="add-condition-button">
                            <i class="fa-solid fa-circle-plus"></i> Add Condition</button>
                        <button class="btn-dark btn" id="clear-conditions-button">
                            <i class="fa-solid fa-trash"></i> Clear Conditions</button>
                    </p>
                </div>
                <h5> Current conditions: </h5>
                <textarea name="" id="conditions-text-area" disabled="true" rows="5"></textarea>
            </div>
        </div>
</template>