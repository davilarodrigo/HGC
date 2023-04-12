<script setup lang="ts">
import { QueryTemplate } from '@/classes/QueryTemplate';
import OperatorDropdown from '../components/OperatorDropdown.vue'
import { $ref } from 'vue/macros'
import { SqlSyntaxHighlighter } from '@/classes/SqlSyntaxHighlighter';

var templates = $ref<QueryTemplate[]>([]);
var selectedTemplate = $ref<QueryTemplate | undefined>();

function setupPage() {
    templates = QueryTemplate.getTemplatesFromLocalStorage();
    console.log(templates);
}

setupPage()

</script>

<template>
    <h1>Templates</h1>
    <div class="box">
        <h4>Filter templates</h4>
        <div class="row">
            <div class="col-2">
                Table <br>
                <select long>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
            </div>
            <div class="col-2">
                SQL Command <br>
                <select long>
                    <option value="SELECT">Select</option>
                    <option value="DELETE">Delete</option>
                    <option value="UPDATE">Update</option>
                    <option value="INSERT">Insert</option>
                </select>
            </div>
            <div class="col-3">
                Template Category <br>
                <select>
                    <option value="SELECT">All Categories</option>
                    <option value="DELETE">Bookmarks</option>
                </select>
            </div>
            <div class="col-3">
                Name <br>
                <input type="text" placeholder="Name of template">
            </div>
        </div>
    </div>
    <div class="box">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="col-2">Name</th>
                    <th class="col-2">Command</th>
                    <th class="col-5">Preview</th>
                    <th class="col-2">Date Created</th>
                    <th class="no-width"> </th>
                </tr>
            </thead>
            <tbody>

                <tr @click="selectedTemplate = template" v-for="template in templates">
                    <td> {{ template.name }}</td>
                    <td> {{ template.commandType }} </td>
                    <td> {{ template.completeSqlQuery.substring(0, 50) + "..." }} </td>
                    <td>2/23/2023</td>
                    <td> <span @click="template.toggleFavorite()">
                            <i v-if="template.isFavorite" class="fa-solid fa-star"></i>
                            <i v-else class="fa-regular fa-star"></i>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="selectedTemplate" class="box">
        <h4>Preview Template: <span class="light-header"> {{ selectedTemplate.name }} </span> </h4>
        <br>
        <div class="row">
            <div class="col-4">

                <h5>Available Variables for template</h5>
                <div v-for="variable in selectedTemplate.variables">

                    <input long :type="variable.typeOfValue == 'string' ? 'text' : 'number'" v-model="variable.value"
                        :placeholder="variable.name">
                </div>
                <br>
                <button>Add New Condition</button>
            </div>
            <div class="col-8">
                <h5> Output SQL Query </h5>
                <div style="min-height: 11rem;"
                    v-html="SqlSyntaxHighlighter.highlightCompleteSqlQuery(selectedTemplate.completeSqlQuery)"
                    class="text-area-div">
                </div>
                <br>
                <div class="text-end"> <button color="green">Post Query</button> </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="col text-center">
            <i> Click on a template to use it </i>
        </div>
    </div>
 
    <div v-if="selectedTemplate" class="box">
        <h4>More Template Options</h4>
        <button color="red">Delete Template</button>
        <button>Duplicate</button>
        <button>Edit</button>
        <button>Change Permissions</button>
    </div>
</template>