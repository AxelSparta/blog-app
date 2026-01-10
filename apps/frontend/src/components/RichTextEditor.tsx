"use client"

import * as React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
  error?: boolean
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your post...",
  className,
  error,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: cn(
          "focus:outline-none min-h-[300px] p-4",
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6",
          "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5",
          "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4",
          "[&_p]:mb-4 [&_p]:leading-relaxed",
          "[&_strong]:font-semibold",
          "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4",
          "[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4",
          "[&_li]:mb-2",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4",
          "[&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono",
          "[&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre]:my-4",
          "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
          "[&_a]:text-primary [&_a]:underline",
          "[&_hr]:my-6 [&_hr]:border-border"
        ),
      },
    },
  })

  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!isMounted || !editor) {
    return (
      <div
        className={cn(
          "w-full rounded-md border border-input bg-background shadow-xs min-h-[300px] p-4",
          error && "border-destructive",
          className
        )}
      >
        <div className="text-muted-foreground">{placeholder}</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "w-full rounded-md border border-input bg-background shadow-xs transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        error && "border-destructive ring-destructive/20 dark:ring-destructive/40",
        className
      )}
    >
      <EditorContent editor={editor} />
    </div>
  )
}
