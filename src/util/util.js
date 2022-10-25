export default {
    longestWordLen(wordsArr){
        let len = 0;
        wordsArr.forEach((word)=>{
            len = (word.length > len) ? word.length : len;
        });
        return len;
    },

    calcEssence(num){
        while(num > 9){
            let numDigitsArr = (""+num).split('').map(Number);
            num = numDigitsArr.reduce((currDigit, nextDigit)=>{
                return currDigit + nextDigit;
            });
        }
        return num;
    }
}