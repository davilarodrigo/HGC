<script setup lang="ts">
import type { Connection } from '@/classes/Connection'
import { ConnectionManager } from '@/classes/ConnectionManager'
import type { SqlPostedQuery } from '@/classes/SqlPostedQuery';
import { $ref } from 'vue/macros'
import {SqlSyntaxHighlighter} from '@/classes/SqlSyntaxHighlighter';

var connection: Connection | undefined

var queries = $ref<SqlPostedQuery[]>([])
var selectedQuery = $ref<SqlPostedQuery | undefined>()

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
                <tr class="posted-query-row" @click="selectedQuery = query" v-for="(query, index) in queries">
                    <td>{{ query.UsrCreator_ }}</td>
                    <td>{{ query.Sentence }}</td>
                    <td>{{ query.CodeSentences }}</td>

                    <td>{{ new Date(query.DTcreation).toLocaleDateString() }}</td>
                    <td>{{ query.State }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="selectedQuery" class="box">

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

                <!-- <strong> Author Role: </strong> {{selectedQuery}} <br> -->
                <strong> Type of Query: </strong> {{ selectedQuery.Sentence }} <br>
                <strong> Author: </strong> {{ selectedQuery.UsrCreator_ }} <br>
                <span v-if="selectedQuery.DTAuthorization">
                    <strong> Authorizer: </strong> {{ selectedQuery.UsrAuthorizer }} <br>
                </span>
                <strong> Creation Date: </strong> {{ new Date(selectedQuery.DTcreation).toLocaleDateString() }} <br>
                <span v-if="selectedQuery.DTAuthorization">
                    <strong> Authorization Date: </strong> {{ new Date(selectedQuery.DTAuthorization).toLocaleDateString() }}
                    <br>
                </span>
                <strong> State: </strong> {{ selectedQuery.State }} <br>
            </div>
            <div class="col-8">
                <div style="min-height: 11rem;" v-html="SqlSyntaxHighlighter.highlightCompleteSqlQuery(selectedQuery.CodeSource)" class="text-area-div"></div>                
            </div>
        </div>

        <h4>Resolve Query</h4>
        <textarea placeholder="Add comments here..." name="" id="" cols="30" rows="6"></textarea>
        <div class="row">
            <div class="col text-end">

                <button color="green">Approve Query</button>
                <button color="red">Reject Query</button>
            </div>
        </div>
    </div>
    <div v-else class="row">
        <div class="col text-center">
            <i> Click on a query to see more info and options </i>
        </div>
    </div>
</template>

<style  >
tr.posted-query-row:hover {
    background-color: #cccccc;
}
</style>