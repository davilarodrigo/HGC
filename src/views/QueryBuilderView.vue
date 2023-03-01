
<script setup lang="ts">
</script>
<template>
    <h1>SQL Query Builder</h1>

    <div class="box">

        <div class="row">
            <div class="col-lg-2 col-md-3 my-2">
                Table <br>
                <select class="text-select form-select-sm">
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </div>
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
    </div>


    <div class="box">

        <h4>Columns to Show</h4>
        <div class="row">
            <div class="col-3"> <input type="checkbox"> Column Name<br> </div>
            <div class="col-3"> <input type="checkbox"> Column Name<br> </div>
            <div class="col-3"> <input type="checkbox"> Column Name<br> </div>
            <div class="col-3"> <input type="checkbox"> Column Name<br> </div>
            <div class="col-3"> <input type="checkbox"> Column Name<br> </div>
            <div class="col-3"> <input type="checkbox"> Column Name<br> </div>
            <div class="col-3"> <input type="checkbox"> Column Name<br> </div>
            <div class="col-3"> <input type="checkbox"> Column Name<br> </div>
            <div class="col-3"> <input type="checkbox"> Column Name<br> </div>
        </div>













    </div>


    <div class="box">

        <h4>Conditions</h4>

        <select>
            <option value="">Phone</option>
            <option value="">Name</option>
            <option value="">Long select option</option>
        </select>
        is
        <select>
            <option value="">equal to</option>
            <option value="">greater than</option>
        </select>

        <input type="text" value="351 4774362">
        <button><i class="fa-solid fa-circle-plus"></i> Add Condition</button>

        <br><br>
        <h4> Current conditions: </h4>
        <div class="row"> <textarea disabled="true" rows="5"></textarea> </div>
        <button> <i class="fa-solid fa-trash"></i> Clear all Conditions</button>

    </div>

    <div class="box">

        <h4>Sentence Output</h4>

        <div class="row"> <textarea disabled="true" rows="5"></textarea> </div>

        <div class="row mt-1">
            <div class="col">
                <button>Save as Template</button>
                <button>Load Template</button>
            </div>
            <div class="col text-end">
                <input type="checkbox" name="" id=""> enable manual edition
                <button>Post Query</button>
            </div>
        </div>
    </div>
</template>