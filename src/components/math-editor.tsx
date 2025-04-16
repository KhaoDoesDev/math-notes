"use client";

import "katex/dist/katex.min.css";
import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  ImageIcon,
  Code,
  Heading1,
  Heading2,
  Divide,
} from "lucide-react";
import Highlight from '@tiptap/extension-highlight'
import CodeExtension from '@tiptap/extension-code'
import Mathematics from "@tiptap-pro/extension-mathematics";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import python from 'highlight.js/lib/languages/python'
import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('javascript', js)
lowlight.register('ts', ts)
lowlight.register('typescript', ts)
lowlight.register('py', python)
lowlight.register('python', python)

export default function MathEditor() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
			StarterKit.configure({
				code: false,
				codeBlock: false,
				history: false,
			}),
			CodeExtension,
			Highlight,
      Image,
      Mathematics.configure({
        shouldRender: (state, pos, node) => {
          const $pos = state.doc.resolve(pos);
          return (
            node.type.name === "text" && $pos.parent.type.name !== "codeBlock"
          );
        },
      }),
			CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: `
      <h2>Welcome to your study notes!</h2>
      <p>This is a <strong>Markdown editor</strong> with support for:</p>
      <ul>
        <li>Basic formatting</li>
        <li>Images</li>
				<li>Highlighting (try typing text with 2 equal signs "==" around it)</li>
				<li>Code Blocks</li>
        <li>Math equations ("\$ 2/2 \$" and "\$x^2\$")</li>
      </ul>
      <p>Try typing a math expression like 2/2 or x^2 with dollar signs "$" around it</p>
      <p>Click on any math equation to edit it and add operators like = or +</p>
    `,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  const addImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        editor.chain().focus().setImage({ src: result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editor) {
    return <div className="p-4 border rounded-md">Loading editor...</div>;
  }

  return (
    <div className="border rounded-md shadow-sm">
      <div className="flex flex-wrap gap-2 p-2 border-b bg-muted/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "bg-muted" : ""}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <div className="border-l mx-1"></div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().insertContent("$9+10=21$").run()}
				>
          <Divide className="h-4 w-4" />
          <span className="ml-1">Math</span>
        </Button>
      </div>
      <EditorContent editor={editor} className="min-h-[400px]" />
    </div>
  );
}
