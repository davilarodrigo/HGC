<script setup lang="ts">
console.log("ReportsScreen loaded")
</script>

<template>
    <h1>Reports</h1>
    <div class="box">
        <div class="row">
            <div class="col-3">
                <i class="fas fa-search"></i>
                Search Log
                <input type="text">
            </div>
            <div class="col-6">
                <i class="fas fa-filter"></i>
                Filter by
                <br>
                <select>
                    <option>Any Date</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                </select>
                <select>
                    <option>All Users</option>
                    <option>Current User</option>
                </select>
                <select>
                    <option>All Logs</option>
                    <option>Approved Queries</option>
                    <option>Rejected Queries</option>
                    <option>New Queries Created</option>
                    <option>User logged in</option>
                    <option>User logged out</option>
                </select>
            </div>
            <div class="col-3">
                <i class="fas fa-sort"></i>
                Sort by
                <br>
                <select>
                    <option>Date</option>
                    <option>User</option>
                    <option>Type of Log</option>
                </select>
            </div>
        </div>
    </div>


    <div class="jumbotron">
        <h2 class="display-6">Last Logs:</h2>
        <hr class="my-4">

        
            <p><strong>2/28/2023, 11:46:04 PM: </strong>The user admin1 made a request to the URL
                https://localhost:44309/api/sentences</p>
            <p><strong>2/28/2023, 11:46:02 PM: </strong>The user admin1 made a request to the URL
                https://localhost:44309/api/clients</p>
            <p><strong>2/28/2023, 11:45:59 PM: </strong>The user admin1 made a request to the URL
                https://localhost:44309/api/sentences</p>
            <p><strong>2/28/2023, 11:44:20 PM: </strong>The user admin1 made a request to the URL
                https://localhost:44309/api/clients</p>
            <p><strong>2/28/2023, 11:44:19 PM: </strong>The user admin1 made a request to the URL
                https://localhost:44309/api/sentences/</p>
            <p><strong>2/28/2023, 10:16:04 PM: </strong>The admin admin1 created a new template</p>
        <p><strong>2/28/2023, 08:10:05 PM: </strong>The user admin1 made a request to the URL
            https://localhost:44309/api/clients</p>
        <p><strong>2/28/2023, 08:10:03 PM: </strong>The user admin1 made a request to the URL ---</p>
        <p><strong>2/28/2023, 08:08:54 PM: </strong>The user admin1 made a request to the URL
            https://localhost:44309/api/clients</p> 
 

</div>
<div class="text-end">
    Logs to display
    <input value="15" type="number" max="200" min="1" maxlength="3">

</div></template>