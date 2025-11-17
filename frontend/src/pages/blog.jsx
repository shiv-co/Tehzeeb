import React from "react";

import img2 from "../assets/images/img2.jpg"
import blog_img1 from "../assets/images/blog_img1.png"
import WhatsappPage from "../components/whatsapp";

// Your Brand's Color Theme (copied from AboutPage)
const COLORS = {
  primary: '#B3541E',
  secondary: '#D6A74F',
  accent: '#A5A58D',
  text: '#3E2F1C',
  background: '#F5EBDD',
};

// Dummy Data for Blogs
const mainBlog = {
  title: "The Timeless Art of Chikankari: A Legacy Woven in Threads", // Adjusted title
  description:
    "Few crafts speak the language of grace like Chikankari the delicate hand embroidery born in the heart of Lucknow. At Tehzeeb Creations, we celebrate this centuries-old art form that continues to enchant fashion lovers across the world. Each Chikankari piece tells a story a tale of patience, precision, and passion. Crafted using fine muslin, cotton, or georgette, artisans skillfully weave floral motifs using stitches like bakhiya, phanda, and keel kangan.The result? A fabric so soft and royal that it feels like poetry on skin. Unlike machine embroidery, true Chikankari retains its subtle imperfections the mark of human artistry.", // Adjusted description
  author: {
    name: "Ananya Sharma", // Adjusted author
    role: "Sustainability Lead",
    avatar: blog_img1, // Assuming img1 is appropriate
  },
  tags: ["Sustainability", "Ethical Fashion"], // Adjusted tags
  date: "October 28, 2025", // Adjusted date
  readTime: "6 min",
  image: blog_img1,
};

const trending = {
  title: "Trending Styles at Tehzeeb", // Adjusted title
  image: img2, // Assuming img2 is appropriate
};

const sideBlogs = [
  {
    id: 1,
    title: "The Art of Handloom: Weaving Tradition into Modern Designs", // Adjusted title
    date: "Sep 15, 2025", // Adjusted date
    readTime: "5 min",
    tag: "Craftsmanship", // Adjusted tag
    image: img2,
  },
  {
    id: 2,
    title: "Styling Your Wardrobe for the Festive Season", // Adjusted title
    date: "Aug 02, 2025", // Adjusted date
    readTime: "7 min",
    tag: "Style Guide", // Adjusted tag
    image: img2,
  },
  {
    id: 3,
    title: "Behind the Scenes: The Making of Our Latest Collection", // Adjusted title
    date: "Jul 10, 2025", // Adjusted date
    readTime: "4 min",
    tag: "Design Process", // Adjusted tag
    image: blog_img1,
  },
];

export default function BlogPage() {
  return (
    <div className="bg-[#F5EBDD] min-h-screen py-8 px-2">
      {/* --- THIS IS THE FIX --- */}
      {/* Added w-full and the xl/2xl max-width classes */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 xl:max-w-[1440px] 2xl:max-w-[1720px]">
        {/* Main Featured Blog */}
        <div className="lg:col-span-2">
          <div className="bg-white  rounded-lg md:rounded-2xl shadow-lg overflow-hidden border border-[#A5A58D]">
            <img
              src={mainBlog.image}
              alt={mainBlog.title}
              className="w-full h-96 object-cover object-top"
              style={{ background: "#A5A58D" }}
            />
            <div className="p-2 md:p-8">
              <h1 className="text-lg md:text-4xl font-semibold md:font-extrabold text-[#3E2F1C] mb-4">
                {mainBlog.title}
              </h1>
              <p className="text-sm md:text-lg text-justify text-[#3E2F1C] mb-6">{mainBlog.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Author Avatar & Info */}
                <div className="flex items-center gap-2">
                  <img
                    src={mainBlog.author.avatar}
                    alt={mainBlog.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#3E2F1C]">
                    {mainBlog.author.name}
                  </span>
                  <span className="text-[#A5A58D] text-sm">
                    {mainBlog.author.role}
                  </span>
                </div>
                {/* Tags */}
                {mainBlog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#A5A58D] text-[#B3541E] px-3 py-1 rounded-full text-xs font-semibold ml-2"
                  >
                    {tag}
                  </span>
                ))}
                {/* Date & Read Time */}
                <span className="text-[#A5A58D] text-sm ml-4">
                  {mainBlog.date} &bull; {mainBlog.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Trending & Side Blogs */}
        <aside className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#B3541E] to-[#D6A74F] p-6 mb-3 text-white font-bold text-xl flex items-center justify-center min-h-[90px]">
            {trending.title}
          </div>
          {sideBlogs.map((blog) => (
            <div
              key={blog.id}
              className="flex gap-4 items-center bg-white rounded-2xl shadow p-3 hover:shadow-lg transition border border-[#A5A58D]"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-[#A5A58D]"

              />
              <div className="flex-1">
                <div className="font-semibold text-md text-[#3E2F1C] leading-tight line-clamp-2">
                  {blog.title}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[#A5A58D]">
                  <span>{blog.date}</span>
                  <span>&bull;</span>
                  <span>{blog.readTime}</span>
                  <span
                    className="bg-[#D6A74F] text-[#3E2F1C] px-2 py-1 rounded-full font-medium"
                  >
                    {blog.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>
      <WhatsappPage/>
    </div>
  );
}
