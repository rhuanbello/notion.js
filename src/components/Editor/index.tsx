'use client'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { initialContent } from './initialContent'
import { lowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import html from 'highlight.js/lib/languages/xml'
import js from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github-dark-dimmed.css'
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxChevronDown,
  RxChatBubble
} from 'react-icons/rx'
import { BubbleButton } from '../BubbleButton'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('js', js)

export const Editor = () => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'outline-none',
      }
    },
    onUpdate: ({ editor }) => {
      const { state } = editor
      const json = state.doc.toJSON()

      localStorage.setItem('content', JSON.stringify(json))
    },
    onCreate: ({ editor }) => {
      const content = localStorage.getItem('content')

      if (content) {
        const json = JSON.parse(content)
        editor.commands.setContent(json)
      }
    }
  })

  return (
    <>
      <EditorContent editor={editor} className="max-w-[700px] pt-16 mx-auto prose prose-h1:text-slate-600" />
      {editor && (
        <FloatingMenu
          shouldShow={({ state }) => {
            const { $from } = state.selection
            const currentLineText = $from.nodeBefore?.textContent
            return currentLineText === '/'
          }}
          editor={editor}
          className="bg-white shadow-xl border border-zinc-300 shadow-black/20 rounded-lg overflow-hidden flex flex-col py-2 px-1"
        >
          <h3 className='p-1 text-sm font-medium text-zinc-500 mb-2'>Basic blocks</h3>

          <button className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100'
            onClick={() => editor.commands.clearNodes()}
          >
            <img src="http://www.notion.so/images/blocks/text/en-US.png" alt="Text" className='w-14 border border-zinc-400 rounded-lg' />
            <div className='flex flex-col text-left'>
              <span className='text-md'>Text</span>
              <span className='text-sm text-zinc-400'>Just start writing with plain text.</span>
            </div>
          </button>

          <button className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <img src="http://www.notion.so/images/blocks/header.57a7576a.png" alt="Text" className='w-14 border border-zinc-400 rounded-lg' />
            <div className='flex flex-col text-left'>
              <span className='text-md'>Heading 1</span>
              <span className='text-sm text-zinc-400'>Big section heading.</span>
            </div>
          </button>
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu editor={editor} className="bg-white shadow-xl border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-x-zinc-200">
          <BubbleButton>
            Text
            <RxChevronDown className='w-4 h-4' />
          </BubbleButton>

          <BubbleButton>
            <RxChatBubble className='w-4 h-4' />
            Comment
          </BubbleButton>

          <div className='flex items-center'>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive('bold')}
            >
              <RxFontBold className='w-4 h-4' />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive('italic')}
            >
              <RxFontItalic className='w-4 h-4' />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive('strike')}
            >
              <RxStrikethrough className='w-4 h-4' />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              data-active={editor.isActive('code')}
            >
              <RxCode className='w-4 h-4' />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </>
  )
}


