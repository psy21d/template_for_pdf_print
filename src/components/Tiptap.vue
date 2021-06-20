<template>
  <div class="sticky-panel">
    <ButtonPanel :editor="editor" />
    <RenderPanel :editor="editor" />
    <div>Click "new page" then "ctrl+enter" then "new page"</div>
  </div>
  <EditorContent :editor="editor" id="editor"/>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import ButtonPanel from '@/components/ButtonPanel.vue'
import RenderPanel from '@/components/RenderPanel.vue'
import { Node } from '@tiptap/core'
import { Mark } from '@tiptap/core'
import { updateMark } from '@tiptap/core'

let generateFontFamily = (mark) => {
  if (mark.attrs.font_family) {
      return `font-family: ${mark.attrs.font_family}`
  } else {
      return ''
  }
};

class FontFamily extends Mark {
  get name() {
    return 'font_family'
  }

  get schema() {
    return {
      attrs: {
        font_family: {
          default: '',
        },
      },
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [{
        style: 'font-family',
        getAttrs: mark => ({font_family: mark})
      }],
      toDOM: mark => [
        'span',
        {
            style: generateFontFamily(mark)
        },
        0
      ]
    }
  }

  commands({ type }) {
    return (attrs) => updateMark(type, attrs)
  }
}

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
  content: '(inline|text)*',
  marks: '_',
  group: 'block',
  code: true,
  defining: true,
  // draggable: true
  defaultOptions: {
    HTMLAttributes: {
      class: 'page',
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
    return ['div', HTMLAttributes, 0]
  },
  addCommands() {
    return {
      setPage: attributes => ({ commands }) => {
        return commands.setNode('PageNode', attributes)
      },
      togglePage: attributes => ({ commands }) => {
        return commands.toggleNode('PageNode', 'paragraph', attributes)
      },
    }
  },
})

export default {
  components: {
    EditorContent,
    ButtonPanel,
    RenderPanel,
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
      ],
    })
    window.editor = this.editor;
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>