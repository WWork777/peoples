"use client";
import { useParams } from "next/navigation";
import { posts } from "@/data/posts";
import ServiceSlider from "@/components/sliders/service-page-slider";
import Link from "next/link";

export default function PostDetail() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) return <div>История не найдена</div>;

  return (
    <div className="bg-background mt-10 py-10 px-3.75">
      <div className="container max-w-6xl mx-auto">
        <Link href="/dobro" className="mb-6 inline-block text-(--accent-color)">
          ← Назад
        </Link>

        <div className="bg-white rounded-[32px] p-7 sm:p-10 mb-10">
          <h1 className="text-[28px] font-semibold text-(--accent-color) mb-6">
            {post.title}
          </h1>
          <div className="prose max-w-none text-black text-[16px] sm:text-[18px]">
            {post.content}
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-5">
          <ServiceSlider images={post.images} />
        </div>
      </div>
    </div>
  );
}
