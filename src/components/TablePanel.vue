<template>
  <div v-if="editor">
    <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
      insertTable
    </button>
    <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
    addColumnBefore
    </button>
    <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
    addColumnAfter
    </button>
    <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
    deleteColumn
    </button>
    <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
    addRowBefore
    </button>
    <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
    addRowAfter
    </button>
    <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
    deleteRow
    </button>
    <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
    deleteTable
    </button>
    <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">
    mergeCells
    </button>
    <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">
    splitCell
    </button>
    <button @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">
    toggleHeaderColumn
    </button>
    <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">
    toggleHeaderRow
    </button>
    <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
    toggleHeaderCell
    </button>
    <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
    mergeOrSplit
    </button>
    <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()" :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
    setCellAttribute
    </button>
    <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">
    fixTables
    </button>
    <button @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">
    goToNextCell
    </button>
    <button @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">
    goToPreviousCell
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    editor: Object,
  },
}

</script>
