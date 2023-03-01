<script setup lang="ts">
import OperatorDropdown from '../components/OperatorDropdown.vue'
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
        <h4>Available Templates</h4>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="col-2">Name</th>
                    <th class="col-2">Command</th>
                    <th class="col-4">Preview</th>
                    <th class="col-2">Date Created</th>
                    <th class="no-width"></th>
                </tr>
            </thead>
            <tr>
                <td>Add Clients</td>
                <td>INSERT</td>
                <td>INSERT INTO Dbo.Clients Values (...)</td>
                <td>2/23/2023</td>
                <td> <i class="fa-solid fa-star"></i> </td>
            </tr>
            <tr>
                <td>Add Providers</td>
                <td>INSERT</td>
                <td>INSERT INTO Dbo.Providers Values (...)</td>
                <td>2/25/2023</td>
                <td> <i class=" fa-regular fa-star"></i> </td>
            </tr>
            <tr>
                <td>Delete Providers</td>
                <td>DELETE</td>
                <td>DELETE FROM Dbo.Providers Where ...</td>
                <td>2/28/2023</td>
                <td> <i class="fa-regular fa-star"></i> </td>
            </tr>
        </table>
    </div>
    <div class="box">
        <h4>Preview Template: <span class="light-header">Delete Providers</span> </h4>
        <br>
        <div class="row">
            <div class="col-4">
                <h5>Available Conditions</h5>

                <input placeholder="Name" type="text" name="" id="">
                <OperatorDropdown />
                <input placeholder="Phone Number" type="tel" name="" id="">
                <OperatorDropdown />
                <input placeholder="Email" type="email" name="" id="">
                <OperatorDropdown />
                <button>Add New Condition</button>

            </div>
            <div class="col-8">
                <h5> Output SQL Query </h5>
                <textarea disabled
                    rows="5">DELETE FROM Dbo.Providers Where name=[...] and phone=[...] and email = [...]</textarea>
                <div class="text-end"> <button color="green">Post Query</button>
                </div>
            </div>

        </div>
    </div>
    <div class="box">
        <h4>More Template Options</h4>
        <button color="red">Delete Template</button>
        <button>Duplicate</button>
        <button>Edit</button>
        <button>Change Permissions</button>
    </div>
</template>