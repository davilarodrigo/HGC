<script setup lang="ts">
import type { Connection } from '@/classes/Connection'
import { ConnectionManager } from '@/classes/ConnectionManager'
import type { SqlPostedQuery } from '@/classes/SqlPostedQuery';
import { $ref } from 'vue/macros'

var connection: Connection | undefined

var queries = $ref<SqlPostedQuery[]>([])

async function setupPage() {
    connection = await ConnectionManager.connectionManager.currentConnection

    if (connection) {
        queries = await connection.getQueries()

    }
}

await setupPage()
 
</script>

<template>
    <h1>Approve Queries</h1>
<div class="box">
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Creator</th>
                <th>SQL Command</th>
                <th>Query Code</th>
                <th>Creation Date</th>
                <th>State</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(query, index) in queries">
                <td>{{ query.UsrCreator_ }}</td>
                <td>{{ query.Sentence }}</td>
                <td>{{ query.CodeSentences }}</td>

                <td>{{ new Date(query.DTcreation).toLocaleDateString()  }}</td>
                <td>{{ query.State }}</td>
                </tr>
            </tbody>
            <!-- <tr>
                    <td>data 1</td>
                    <td>data 2</td>
                    <td>data 3</td>
                    <td>data 4</td>
                    <td>data 5</td>
                </tr>
                <tr>
                    <td>data 1</td>
                    <td>data 2</td>
                    <td>data 3</td>
                    <td>data 4</td>
                    <td>data 5</td>
                </tr>
                <tr>
                    <td>data 1</td>
                    <td>data 2</td>
                    <td>data 3</td>
                    <td>data 4</td>
                    <td>data 5</td>
                </tr> -->
        </table>
    </div>
    <div class="box">

        <div class="row">
            <div class="col-4">
            <h4>Query info</h4>
        </div>
        <div class="col-8">
                <h4>Query Sentence</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <br>

                <strong> Author: </strong>user 1 <br>
                <strong> Author Role: </strong>Admin <br>
                <strong> Creation Date: </strong>27/2/23 <br>
                <strong> Type of Query: </strong>Insert <br>
                <strong> Affected tables: </strong>clients, providers <br>
                <strong> Status: </strong>Pending <br>
            </div>
            <div class="col-8">
                <textarea disabled rows="8"> INSERT INTO Dbo.Clients VALUES('name1', 'lastname1', 'phone1') </textarea>
            </div>
        </div>

        <!-- 
                </div>
                <div class="box">
            -->
        <h4>Resolve Query</h4>
        <textarea placeholder="Add comments here..." name="" id="" cols="30" rows="6"></textarea>
        <div class="row">
            <div class="col text-end">

                <button color="green">Approve Query</button>
                <button color="red">Reject Query</button>
            </div>
        </div>
    </div>
</template>