"use client";

import { useState, useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

const QuillEditor = ({ value, onChange, onFilesChange }: any) => {
  const [showPreview, setShowPreview] = useState(false);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) {
        return;
      }

      const file = input.files[0];
      if (file && quillRef.current) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          const quill = (quillRef.current as any).getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", dataUrl);
          onFilesChange((prev: any) => [...prev, { file, dataUrl }]);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ align: [] }], // Căn trái, giữa, phải (mặc định: left, center, right, justify)
          [{ color: [] }, { background: [] }], // Màu chữ và màu nền
          ["image", "link"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const quillRef = useRef(null);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <Label htmlFor="content">Nội dung bài viết (Markdown)</Label>
        <div className="flex items-center space-x-2">
          <Switch
            id="show-preview"
            checked={showPreview}
            onCheckedChange={setShowPreview}
          />
          <Label
            htmlFor="show-preview"
            className="text-sm font-normal flex items-center"
          >
            <Eye size={14} className="mr-1" />
            Xem trước
          </Label>
        </div>
      </div>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Nhập nội dung..."
        style={{ height: "300px" }}
        className="h-full mt-5 mb-12"
      />
      {showPreview && value && (
        <div
          className="border preview-markdown border-gray-300 p-1 rounded"
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      )}
    </div>
  );
};

export default QuillEditor;
