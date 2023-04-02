<script setup lang="ts">
import type { Connection } from '@/classes/Connection'
import { ConnectionManager } from '@/classes/ConnectionManager'
import type { SqlPostedQuery } from '@/classes/SqlPostedQuery';
import { $ref } from 'vue/macros'
import { SqlSyntaxHighlighter } from '@/classes/SqlSyntaxHighlighter';

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
                    <th class="  col-1">Creator</th>
                    <th class="  col-1">SQL Command</th>
                    <th class="col-3">Query Preview</th>
                    <th class="text-center col-1">Query Code</th>
                    <th class="text-center col-1">Creation Date</th>
                    <th class="text-center col-1">State</th>
                </tr>
            </thead>
            <tbody>
                <tr :class="query == selectedQuery ? 'selected-query' : ''" class="posted-query-row"
                    @click="selectedQuery = query" v-for="(query, index) in queries">
                    <td class=" "  >{{ query.UsrCreator_ }}</td>
                    <td class=" " >{{ query.Sentence }}</td>
                    <td  >{{ query.CodeSource.slice(0,50)}} <span v-if="query.CodeSource.length>50">...</span>  </td>
                    <td class="text-center" >{{ query.CodeSentences }}</td>
                    <td class="text-center" >{{ new Date(query.DTcreation).toLocaleDateString() }}</td>
                    <td class="text-center" >{{ query.State }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="!selectedQuery">
        <div class="col text-center">
            <i> Click on a query to see more info and options </i>
        </div>
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
                    <strong>
                        <span v-if="selectedQuery.State == 'Rejected'">Rejection</span>
                        <span v-if="selectedQuery.State == 'Approved'">Authorization</span>
                        Date: </strong> {{ new Date(selectedQuery.DTAuthorization).toLocaleDateString() }}
                    <br>
                </span>
                <strong> State: </strong> {{ selectedQuery.State }} <br>
            </div>
            <div class="col-8">
                <div style="min-height: 11rem;"
                    v-html="SqlSyntaxHighlighter.highlightCompleteSqlQuery(selectedQuery.CodeSource)" class="text-area-div">
                </div>
            </div>
        </div>

    </div>
    <div v-if="selectedQuery && selectedQuery.State == 'Pending'" class="box">
        <span >
            <h4>Resolve Query</h4>
            <textarea placeholder="Add comments here..." name="" id="" cols="30" rows="6"></textarea>
            <div class="row">
                <div class="col text-end">

                    <button color="green">Approve Query</button>
                    <button color="red">Reject Query</button>
                </div>
            </div>
        </span>
    </div>
</template>

<style  >
tr.posted-query-row:hover,
.selected-query {
    background-color: #cccccc;
}
</style>