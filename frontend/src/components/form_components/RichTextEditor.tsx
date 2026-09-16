import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { cn } from '../../utils/cn';

export interface RichTextEditorProps {
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (html: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  description,
  placeholder = "Write your content here...",
  error,
  className,
  value = "",
  onChange
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    editorProps: {
      attributes: {
        class: 'tiptap max-w-none focus:outline-none min-h-[150px] p-4 text-[14px] text-text-main',
      },
    },
  });

  // Sync value changes from outside
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className={cn("flex flex-col w-full font-sans", className)}>
      {label && (
        <label className="text-[13px] font-medium text-text-main mb-1">
          {label}
        </label>
      )}
      {description && (
        <p className="text-[12px] text-text-sec mb-2">
          {description}
        </p>
      )}

      <div 
        className={cn(
          "flex flex-col w-full bg-surface border rounded-xl overflow-hidden transition-all duration-300",
          isFocused ? "border-primary ring-4 ring-primary/10" : "border-border-main hover:border-primary/50",
          error && "border-error ring-error/10"
        )}
      >
        {/* Toolbar */}
        <div className="flex items-center flex-wrap gap-1 p-2 border-b border-border-main bg-bg/50">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-1.5 rounded-md transition-colors focus:outline-none",
              editor.isActive('bold') ? "bg-primary/20 text-primary" : "text-text-sec hover:text-text-main hover:bg-surface"
            )}
            title="Bold"
          >
            <i className="ri-bold text-[16px]" />
          </button>
          
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-1.5 rounded-md transition-colors focus:outline-none",
              editor.isActive('italic') ? "bg-primary/20 text-primary" : "text-text-sec hover:text-text-main hover:bg-surface"
            )}
            title="Italic"
          >
            <i className="ri-italic text-[16px]" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "p-1.5 rounded-md transition-colors focus:outline-none",
              editor.isActive('underline') ? "bg-primary/20 text-primary" : "text-text-sec hover:text-text-main hover:bg-surface"
            )}
            title="Underline"
          >
            <i className="ri-underline text-[16px]" />
          </button>

          <div className="w-[1px] h-5 bg-border-main mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "p-1.5 rounded-md transition-colors focus:outline-none",
              editor.isActive('bulletList') ? "bg-primary/20 text-primary" : "text-text-sec hover:text-text-main hover:bg-surface"
            )}
            title="Bullet List"
          >
            <i className="ri-list-unordered text-[16px]" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              "p-1.5 rounded-md transition-colors focus:outline-none",
              editor.isActive('orderedList') ? "bg-primary/20 text-primary" : "text-text-sec hover:text-text-main hover:bg-surface"
            )}
            title="Numbered List"
          >
            <i className="ri-list-ordered text-[16px]" />
          </button>

          <div className="w-[1px] h-5 bg-border-main mx-1" />

          <button
            type="button"
            onClick={setLink}
            className={cn(
              "p-1.5 rounded-md transition-colors focus:outline-none",
              editor.isActive('link') ? "bg-primary/20 text-primary" : "text-text-sec hover:text-text-main hover:bg-surface"
            )}
            title="Link"
          >
            <i className="ri-link text-[16px]" />
          </button>
        </div>

        {/* Editor Area */}
        <EditorContent editor={editor} />
        
        {/* Placeholder Hack since Tiptap placeholder extension needs extra setup */}
        {editor.isEmpty && (
          <div className="absolute pointer-events-none text-muted text-[14px] top-[54px] left-[17px]">
            {placeholder}
          </div>
        )}
      </div>
      
      {error && (
        <span className="text-[11px] text-error mt-1.5 pl-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default RichTextEditor;
