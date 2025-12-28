import React from "react";
import { Calendar, User, ArrowUpRight, Bookmark } from "lucide-react";
import { fetchArticlesListPage } from "@/src/sanity/queries/articles-list";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Reimagining Digital Spaces Through Intentional Design",
    excerpt:
      "How thoughtful design choices create memorable experiences that users don't just interact with—they remember and return to.",
    author: "Elena Martinez",
    date: "2024-03-18",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 2,
    title: "The Evolution of Component-Based Architecture",
    excerpt:
      "Breaking down monolithic applications into reusable, maintainable pieces that scale with your team's ambitions.",
    author: "David Park",
    date: "2024-03-16",
    readTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    color: "from-violet-400 to-purple-500",
  },
  {
    id: 3,
    title: "Crafting Animations That Feel Natural",
    excerpt:
      "Understanding physics, timing, and human perception to create motion that enhances rather than distracts.",
    author: "Sophie Chen",
    date: "2024-03-14",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 4,
    title: "Building Resilient Systems in an Uncertain World",
    excerpt:
      "Strategies for creating applications that gracefully handle failures and continue to serve users even when things go wrong.",
    author: "Marcus Johnson",
    date: "2024-03-12",
    readTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: 5,
    title: "The Art of Technical Writing",
    excerpt:
      "Communicating complex ideas clearly and concisely without losing nuance or dumbing down the content.",
    author: "Rachel Kim",
    date: "2024-03-10",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 6,
    title: "Accessibility: Beyond Compliance to Empathy",
    excerpt:
      "Creating inclusive experiences that welcome everyone, not just to meet standards but to genuinely serve all users.",
    author: "James Wilson",
    date: "2024-03-08",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    color: "from-indigo-400 to-blue-500",
  },
  {
    id: 7,
    title: "Performance Optimization Without Obsession",
    excerpt:
      "Finding the balance between speed and development velocity, and knowing when optimization matters most.",
    author: "Alex Rivera",
    date: "2024-03-06",
    readTime: "11 min",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    color: "from-red-400 to-pink-500",
  },
  {
    id: 8,
    title: "Design Systems That Actually Get Used",
    excerpt:
      "Creating guidelines and components that teams embrace rather than work around or ignore completely.",
    author: "Nina Patel",
    date: "2024-03-04",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    color: "from-lime-400 to-green-500",
  },
  {
    id: 9,
    title: "The Future of Collaborative Development",
    excerpt:
      "How remote work and new tools are reshaping the way teams build software together across continents and time zones.",
    author: "Oliver Brown",
    date: "2024-03-02",
    readTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    color: "from-sky-400 to-cyan-500",
  },
];

const ArticlesListPage = async () => {
  const articleList = await fetchArticlesListPage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-18">
      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-200/30 to-purple-200/30 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <header className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 pb-2">
                {articleList.title}
              </h1>
              <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 rounded-full mt-2 animate-pulse-slow" />
            </div>
            {articleList.title && (
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                {articleList.description}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Blog Grid */}
      <main className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="h-full bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-3">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${post.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    {/* Floating bookmark button */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <Bookmark className="w-5 h-5 text-slate-700" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-7 space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-sm font-medium text-slate-500">
                        {post.readTime} read
                      </span>
                      <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        Read more
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Accent bar */}
                  <div className={`h-1 bg-gradient-to-r ${post.color}`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlesListPage;
