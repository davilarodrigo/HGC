<script setup lang="ts">
console.log("ReportsScreen loaded")
</script>

<template>
    <div id="report-filters" class="my-2">

        <i class="fas fa-search"></i> Search Log <input>
        Sort by <select class="text-select form-select-sm" name="" id="">
            <option value="date">Date</option>
            <option value="date">User</option>
            <option value="date">Type of Log</option>
        </select>
        <br><br>

        Filters:
        Date <select class="text-select form-select-sm" name="" id="">
            <option value="date">Any Date</option>
            <option value="date">Today</option>
            <option value="date">This Week</option>
            <option value="date">This Month</option>
        </select>
        User <select class="text-select form-select-sm" name="" id="">
            <option value="date">All Users</option>
            <option value="date">Current User</option>
        </select>
        Type of log <select class="text-select form-select-sm" name="" id="">
            <option value="date">All Logs</option>
            <option value="date">Approved Queries</option>
            <option value="date">Rejected Queries</option>
            <option value="date">New Queries Created</option>
            <option value="date">User logged in</option>
            <option value="date">User logged out</option>
        </select>

        Logs to display <input value="15" type="number" max="200" min="1" maxlength="3" name="" id="logs-to-display-input">
        <button class="btn"></button>
    </div>

    <div class="jumbotron">
        <h1 class="display-6">Last Logs:</h1>
        <hr class="my-4">

        <div id="reports-jumbotron"></div>

    </div>
    <div class="text-end">
    </div>
</template>