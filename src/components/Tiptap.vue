<template>
  <div class="sticky-panel">
    <ButtonPanel :editor="editor" class="panel"/>
    <TablePanel :editor="editor" class="panel"/>
    <RenderPanel :editor="editor" class="panel"/>
    <div>Click "new page" then "ctrl+enter" then "new page"</div>
  </div>
  <EditorContent :editor="editor" id="editor" class="panel"/>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { FontFamily } from '@tiptap/extension-font-family'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import ButtonPanel from '@/components/ButtonPanel.vue'
import RenderPanel from '@/components/RenderPanel.vue'
import TablePanel from '@/components/TablePanel.vue'
import { Node } from '@tiptap/core'
import { mergeAttributes } from '@tiptap/core'

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: element => {
          return {
            backgroundColor: element.getAttribute('data-background-color'),
          }
        },
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})

const PageNode = Node.create({
  name: 'PageNode',
  // content: 'block+',
  content: 'inline*',
  marks: '_',
  
  inline: true,
  group: "inline",
  draggable: true,

  code: true,
  isolating: true,
  defining: true,
  // draggable: true
  defaultOptions: {
    HTMLAttributes: {
      class: 'page pagebreak',
    },
  },
  addAttributes() {
    // Return an object with attribute configuration
    return {
      class: {
        default: 'page pagebreak',
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div',
        preserveWhitespace: 'full',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
  addCommands() {
    return {
      setPage: attributes => ({ commands }) => {
        return commands.setNode('PageNode', attributes)
      },
      togglePage: attributes => ({ commands }) => {
        return commands.toggleNode('PageNode', 'PageNode', attributes)
      },
    }
  },
})

export default {
  components: {
    EditorContent,
    ButtonPanel,
    RenderPanel,
    TablePanel,
  },

  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    this.editor = new Editor({
      content: '<p>I’m running tiptap with Vue.js. 🎉</p>',
      extensions: [
        PageNode,
        TextAlign,
        StarterKit,
        Highlight,
        FontFamily,
        Table,
        TableRow,
        TableCell,
        CustomTableCell,
        TableHeader,
        Text,
        TextStyle,
        Document,
        Paragraph,
      ],
    })
    window.editor = this.editor;
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style scoped>
.panel {
  margin: 6px;
}
</style>