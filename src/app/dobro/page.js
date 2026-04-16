import Link from "next/link";
import { posts } from "@/data/posts";

export default function BlogPage() {
  return (
    <div className="bg-background mt-10 px-3.75 pb-20 pt-20">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/dobro/${post.id}`} key={post.id} className="group">
              <div className="bg-white rounded-[32px] p-6 h-full transition-shadow hover:shadow-xl">
                <div className="aspect-video mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={post.images[0]}
                    alt=""
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                  />
                </div>
                <h2 className="text-xl font-semibold text-(--accent-color) mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                <span className="inline-block mt-4 font-bold text-(--accent-color)">
                  Читать далее →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
