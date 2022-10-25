<template>
    <div v-if="submissionsExist" class="container">
        <div v-for="(submission, sbmIndex) in submissions" :key="sbmIndex" class="sbm-container">

            <div class="sbm-info-full">
                <span class="label">phrase</span>
                <p>{{ submission.phrase }}</p>
            </div>
            <div class="sbm-info-group">
                <div class="sbm-info">
                    <p><span class="label">phrase essence:</span> {{ submission.phraseEssence }}</p>
                </div>
                <div class="sbm-info">
                    <p><span class="label">S.E.A. sum:</span> {{ submission.normalSumTotal }}</p>
                </div>
                <div class="sbm-info">
                    <p><span class="label">pythagorean sum:</span> {{ submission.pythSumTotal }}</p>
                </div>
            </div>

            <table class="sbm-table">
                <tr v-for="(row, rowIndex) in submission.table" :key="rowIndex">
                    <!-- heading row -->
                    <template v-if="isHeadingRow(rowIndex)">
                        <th v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</th>
                    </template>
                    <!-- non-heading row -->
                    <template v-else>
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                    </template>
                </tr>
            </table>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'submissions',
    data(){
        return {
            tablesDataArr: []
        }
    },
    methods: {
        isHeadingRow: function(rowIndex){
            return (rowIndex === 0 || rowIndex % 3 === 0);
        }
    },
    computed: {
        ...mapGetters(['submissions']),
        submissionsExist: function(){
            return (this.submissions.length > 0);
        }
    }
}
</script>

<style scoped>

table {
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: solid 2px #1f2326;
    text-align: center;
}
th {
    background-color: #99AAB5;
    color: #000;
}
td {
    font-weight: 700;
    background-color: #282b30;
    color: #fff;
}

.sbm-container {
    border-bottom: 1px solid #757575;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
}
.sbm-container:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.sbm-table {
    margin-bottom: 1.5rem;
}

.sbm-info-group {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-basis: 1;
}
.sbm-info {
    flex-basis: 33.3%;
    margin-bottom: 1.5rem;
    padding: 0 0.2rem 0 0.2rem;
    text-align: center;
}
.sbm-info:first-child {
    padding-left: 0;
}
.sbm-info:last-child {
    padding-right: 0;
}
.sbm-info p {
    margin: 0;
}
.sbm-info-full {
    margin-bottom: 1.5rem;
}

</style>
