<template>
  <ButtonPanel :editor="editor" />
  <RenderPanel :editor="editor" />
  <EditorContent :editor="editor" id="editor"/>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import ButtonPanel from '@/components/ButtonPanel.vue'
import RenderPanel from '@/components/RenderPanel.vue'
import { Node } from '@tiptap/core'
import { Extension } from '@tiptap/core'

const TextAlign = Extension.create({
  addGlobalAttributes() {
    return [
      {
        // Extend the following extensions
        types: [
          'heading',
          'paragraph',
        ],
        // … with those attributes
        attributes: {
          textAlign: {
            default: 'left',
            renderHTML: attributes => ({
              style: `text-align: ${attributes.textAlign}`,
            }),
            parseHTML: element => ({
              textAlign: element.style.textAlign || 'left',
            }),
          },
        },
      },
    ]
  },
})

const PageNode = Node.create({
  name: 'PageNode',
  content: 'text*',
  marks: 'bold italic strike code',
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
        default: 'page',
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
      ],
    })
    window.editor = this.editor;
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>