<template>
  <div>
    <tiny-editor :myValue="myValue" @update="v=>myValue=v" />
  </div>
</template>
<script>
import TinyEditor from '../../components/TinyEditor'

export default {
  components: {
    TinyEditor
  },
  data() {
    return {
      myValue: "aaaaa"
    }
  }
}
</script>