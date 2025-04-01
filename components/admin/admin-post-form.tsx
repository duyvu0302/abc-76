"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImagePlus, X } from "lucide-react";
import formatString from "@/lib/formatString";
import { supabase } from "@/lib/supabase/supabase";
import Loading from "../loading";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("@/components/admin/markdown"), {
  ssr: false,
});

async function uploadToCloudinary(
  file: File,
  cloudName: string,
  uploadPreset: string
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error?.message || "Lỗi khi upload ảnh lên Cloudinary."
    );
  }

  const data = await res.json();
  if (!data.secure_url) {
    throw new Error("Không nhận được URL ảnh từ Cloudinary.");
  }

  return data.secure_url as string;
}

export default function AdminBlogForm() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug_url, setSlugUrl] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tempFiles, setTempFiles] = useState<{ file: File; dataUrl: string }[]>(
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const adminOtp = process.env.NEXT_PUBLIC_ADMIN_OTP;
    if (otp !== adminOtp) {
      toast.error("Mã OTP không đúng.");
      return;
    }

    setIsLoading(true);
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME || "";
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUD_PRESET || "";

      let imgUrl = "";
      if (selectedImage) {
        imgUrl = await uploadToCloudinary(
          selectedImage,
          cloudName,
          uploadPreset
        );
      }

      let finalContent = editorValue;
      for (const { file, dataUrl } of tempFiles) {
        const imageUrl = await uploadToCloudinary(
          file,
          cloudName,
          uploadPreset
        );
        finalContent = finalContent.replace(dataUrl, imageUrl);
      }

      const { error: supabaseError } = await supabase
        .from("blog")
        .insert([
          {
            title,
            subtitle,
            slug: formatString(slug_url),
            content: finalContent,
            img_url: imgUrl,
          },
        ])
        .select("*");

      if (supabaseError) {
        throw new Error(
          "Lỗi khi lưu bài viết vào Supabase: " + supabaseError.message
        );
      }

      const revalidateRes = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`,
        },
      });
      if (!revalidateRes.ok) {
        throw new Error("Lỗi khi revalidate trang.");
      }

      toast.success("Bài viết đã được lưu thành công.");
    } catch (err: any) {
      toast.error(err.message || "Có lỗi khi lưu bài viết.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tiêu đề bài viết */}
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề bài viết</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề bài viết"
            className="w-full text-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề con</Label>
          <Input
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Nhập tiêu đề con"
            className="w-full text-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">
            Nhập đường dẫn url (ví dụ: lo-trinh-du-lich-quang-nam)
          </Label>
          <Input
            id="slug_url"
            value={slug_url}
            onChange={(e) => setSlugUrl(e.target.value)}
            placeholder="Nhập đường dẫn url muốn đặt"
            className="w-full text-xl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Ảnh đại diện bài viết</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <ImagePlus size={18} />
              Chọn ảnh
            </Button>
            <Input
              id="image"
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <span className="text-sm text-gray-500">
              {selectedImage ? selectedImage.name : "Chưa chọn ảnh nào"}
            </span>
          </div>

          {/* Hiển thị ảnh preview */}
          {previewUrl && (
            <Card className="relative mt-4 p-2 w-full max-w-md">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full z-10"
                onClick={removeImage}
              >
                <X size={16} />
              </Button>
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-auto max-h-64 object-contain rounded"
              />
            </Card>
          )}
        </div>

        <div className="rounded-t-md p-2">
          <Markdown
            value={editorValue}
            onChange={setEditorValue}
            onFilesChange={(files: any) => setTempFiles(files)}
          />
        </div>

        {/* Nút submit */}
        <div className="space-y-2">
          <Label htmlFor="title">Nhập mã OTP để lưu bài viết</Label>
          <Input
            type="password"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập mã OTP"
            required
          />
        </div>
        <div className="flex justify-end">
          <Button variant={"secondary"} type="submit">
            Lưu bài viết
          </Button>
        </div>
      </form>
    </div>
  );
}
