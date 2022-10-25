<template>
    <form id="primaryInputForm" @submit.prevent="handleSubmit">
        <div class="container">
            <input 
                type="text" 
                name="phrase" 
                placeholder="Word or phrase to reduce ..."
                id="primaryInput"
                v-model="phraseInput"
                 />
            <button id="primaryInputBtn" type="submit">Reduce</button>
        </div>
    </form>
</template>

<script>
import {  mapActions } from 'vuex';

export default {
    name: 'addSubmission',
    data(){
        return {
            phraseInput: ''
        }
    },
    methods: {
        ...mapActions([
            'addSubmission'
        ]),

        handleSubmit(){
            // preventDefault already called

            this.addSubmission(this.phraseInput);
            // clear local state after adding submission
            this.phraseInput = '';
        }
    },
    watch: {
        phraseInput: function(newPhraseInput){
            this.phraseInput = newPhraseInput.toUpperCase();
        }
    }
}
</script>