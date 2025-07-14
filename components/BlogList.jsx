import Link from "next/link";

export default function BlogList({ blogs }) {
  return (
    <div className="w-full max-w-4xl mb-10">
      <h2 className="text-xl font-bold mb-4 text-retroblue">Recent Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((post, idx) => (
          <Link
            key={post.slug || idx}
            href={`/blogs/${post.slug}`}
            className="bg-retrobg border border-retroborder rounded-xl p-5 flex flex-col transition-all duration-300 cursor-pointer no-underline group hover:border-retroaccent
              hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.2),_15px_15px_rgba(0,_98,_90,_0.05)]
              dark:hover:shadow-[5px_5px_rgba(60,_120,_255,_0.4),_10px_10px_rgba(60,_120,_255,_0.2),_15px_15px_rgba(60,_120,_255,_0.05)]
              theme-retro:hover:shadow-[5px_5px_rgba(247,_155,_114,_0.4),_10px_10px_rgba(247,_155,_114,_0.2),_15px_15px_rgba(247,_155,_114,_0.05)]"
          >
            <h4 className="text-lg font-bold mb-1 text-retroaccent group-hover:text-retroblue transition-colors">
              {post.title}
            </h4>
            <div className="flex gap-2 mb-2 flex-wrap">
              {post.tags && post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-retroaccent/10 text-retroaccent px-2 py-0.5 rounded text-xs font-mono border border-retroborder group-hover:border-retroaccent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-retrotext/70 mb-2 flex-1 font-mono">
              {post.excerpt}
            </p>
            <span className="text-xs text-retroblue font-mono opacity-80">
              {post.date}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
} 