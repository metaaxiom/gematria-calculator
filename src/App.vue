<template>
  <div id="app">
    <add-submission />
    <submissions />
  </div>
</template>

<script>

import AddSubmission from './components/AddSubmission.vue';
import Submissions from './components/Submissions.vue';

export default {
  name: 'app',
  components: {
      AddSubmission,
      Submissions
  }
}
</script>

<style>
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #36393f;
    color: #fff;
}

input[type="text"] {
    padding: 0.2rem 0.5rem;
    background-color: #4a4d53;
    border: none;
    border-radius: 2px;
}

button {
    background-color: #36393f;
    border: 1px solid rgba(0,0,0,.6);
    border-radius: 2px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    padding: 0.6rem 1.2rem;
}

.container {
    margin: 0 auto;
    width: 640px;
}

#primaryInputForm {
    background-color: #282b30;
    margin-bottom: 2rem;
}
#primaryInputForm .container {
    padding: 1rem 0.5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#primaryInput {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0.6rem 1.2rem;
    width: 100%;
    color: #fff;
    letter-spacing: 0.1rem;
}
#primaryInputBtn {
    margin-left: 0.5rem;
}

span.label {
    display: block;
    font-weight: 700;
    font-size: 0.7rem;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
}
</style>
