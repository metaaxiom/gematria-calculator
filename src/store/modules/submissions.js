import util from '@/util/util.js';

const state = {
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ltrToEssence: {
        'A': 1,'B': 2,'C': 3,
        'D': 4,'E': 5,'F': 6,
        'G': 7,'H': 8,'I': 9,
        'J': 1,'K': 2,'L': 3,
        'M': 4,'N': 5,'O': 6,
        'P': 7,'Q': 8,'R': 9,
        'S': 1,'T': 2,'U': 3,
        'V': 4,'W': 5,'X': 6,
        'Y': 7,'Z': 8
    },
    submissions: []
};

const getters = {
    alphabet: (state) => state.alphabet,
    ltrToEssence: (state) => state.ltrToEssence,
    submissions: (state) => state.submissions
};

const actions = {

    addSubmission({commit, dispatch}, phrase){
        // order matters - how to organize?
        commit('openNewSubmission', phrase);
        dispatch('buildWordsArr');
        dispatch('buildTransposByLtr');
        dispatch('buildTransposByLtr', true); // pyth
        dispatch('buildSumTotal');
        dispatch('buildSumTotal', true); // pyth
        dispatch('buildTranposSumByWord');
        dispatch('buildTranposSumByWord', true); // pyth
        dispatch('buildEssenceByWord');
        dispatch('buildPhraseEssence');
        dispatch('buildNewTableData');
    },

    buildWordsArr({commit, state}){
        let currSbm = state.submissions[0];
        let wordsArr = currSbm.phrase.split(' ');
        commit('setWordsArr', wordsArr);
    },

    buildTransposByLtr({commit, state}, isPyth = false){
        let currSbm = state.submissions[0];
        let transposbyLtr = [];

        currSbm.wordsArr.forEach((word, wordIndex)=>{
            // build nested array
            transposbyLtr.push([]);

            for(let i = 0; i < word.length; i++){
                let ltr = word[i];
                let ltrNum = (isPyth) ? state.ltrToEssence[ltr] : state.alphabet.indexOf(ltr) + 1;
                transposbyLtr[wordIndex].push( ltrNum );
            }
        });
        (isPyth) ? commit('setPythTransposByLtr', transposbyLtr) : commit('setNormalTransposByLtr', transposbyLtr);
    },

    buildSumTotal({commit, state}, isPyth = false){
        let currSbm = state.submissions[0];
        let transposbyLtr = (isPyth) ? currSbm.pythTransposByLtr : currSbm.normalTransposByLtr;
        let sum = 0;
        
        transposbyLtr.forEach((wordsArr) => {
            sum += wordsArr.reduce((currLtrVal, nextLtrVal)=>{
                return currLtrVal + nextLtrVal;
            })
        });

        (isPyth) ? commit('setPythSumTotal', sum) : commit('setNormalSumTotal', sum);
    },

    buildTranposSumByWord({commit, state}, isPyth = false){
        let currSbm = state.submissions[0];
        let transposbyLtr = ( isPyth ) ? currSbm.pythTransposByLtr : currSbm.normalTransposByLtr;
        let wordSums = [];
    
        transposbyLtr.forEach((numArr)=>{
            let wordSum = numArr.reduce((currNum, nextNum)=>{
                return currNum + nextNum;
            });
            wordSums.push(wordSum);
        });

        (isPyth) ? commit('setPythTransposSumByWord', wordSums) : commit('setNormalTransposSumByWord', wordSums);
    },

    buildEssenceByWord({commit, state}){
        let currSbm = state.submissions[0];

        let essenceByWord = currSbm.pythTransposSumByWord.map((sum) => {
            return util.calcEssence(sum);
        });

        commit('setEssenceByWord', essenceByWord);
    },

    buildPhraseEssence({commit, state}){
        let currSbm = state.submissions[0];
        let sumTotal = currSbm.pythSumTotal;
        commit('setPhraseEssence', util.calcEssence(sumTotal));
    },

    buildNewTableData({commit, state}){
        let currSbm = state.submissions[0];
        let sbmTable = [];
        
        // move to function?
        let longestWordLen = util.longestWordLen(currSbm.wordsArr);

        currSbm.wordsArr.forEach((word, wordIndex)=>{
            let headerRow = [];
            let normalRow = [];
            let pythRow = [];
            
            // ensure row always has at least as many cells as longest word
            for(let i = 0; i < longestWordLen; i++){
                // header
                let ltr = word[i];
                (ltr) ? headerRow.push(ltr) : headerRow.push('');

                // NT: normal transposition
                let ltrNT = currSbm.normalTransposByLtr[wordIndex][i];
                (ltrNT) ? normalRow.push(ltrNT) : normalRow.push('');

                // PT: pythagorean transposition
                let ltrPT = currSbm.pythTransposByLtr[wordIndex][i];
                (ltrPT) ? pythRow.push(ltrPT) : pythRow.push('');
            }

            // header row final values
            headerRow.push("sum");
            headerRow.push("essence");

            // normal row final values
            normalRow.push(currSbm.normalTransposSumByWord[wordIndex]);
            normalRow.push(currSbm.essenceByWord[wordIndex])

            // pyth row final values
            pythRow.push(currSbm.pythTransposSumByWord[wordIndex]);
            pythRow.push(currSbm.essenceByWord[wordIndex]);

            sbmTable.push(headerRow);
            sbmTable.push(normalRow);
            sbmTable.push(pythRow);
        });
        commit('addNewTableData', sbmTable);
    }

};

const mutations = {
    openNewSubmission(state, phrase){
        state.submissions.unshift({phrase});
    },
    setWordsArr(state, wordsArr){
        state.submissions[0].wordsArr = wordsArr;
    },
    setNormalTransposByLtr(state, normalTransposByLtr){
        state.submissions[0].normalTransposByLtr = normalTransposByLtr;
    },
    setPythTransposByLtr(state, pythTransposByLtr){
        state.submissions[0].pythTransposByLtr = pythTransposByLtr;
    },
    setNormalSumTotal(state, normalSumTotal){
        state.submissions[0].normalSumTotal = normalSumTotal;
    },
    setPythSumTotal(state, pythSumTotal){
        state.submissions[0].pythSumTotal = pythSumTotal;
    },
    setNormalTransposSumByWord(state, normalTransposSumByWord){
        state.submissions[0].normalTransposSumByWord = normalTransposSumByWord;
    },
    setPythTransposSumByWord(state, pythTransposSumByWord){
        state.submissions[0].pythTransposSumByWord = pythTransposSumByWord;
    },
    setEssenceByWord(state, essenceByWord){
        state.submissions[0].essenceByWord = essenceByWord;
    },
    setPhraseEssence(state, phraseEssence){
        state.submissions[0].phraseEssence = phraseEssence;
    },
    addNewTableData(state, newTable){
        state.submissions[0].table = newTable;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}