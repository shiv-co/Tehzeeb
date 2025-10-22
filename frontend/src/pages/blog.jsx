import React from "react";
import img1 from "../assets/images/img1.jpg"
import img2 from "../assets/images/img2.jpg"

// Dummy Data for Blogs
const mainBlog = {
  title: "How to Record A Podcast Remotely | 4 Methods to Try",
  description:
    "Learn how to record a podcast remotely with our full step-by-step guide. We'll show you 4 top ways to record a long-distance podcast with remote guests!",
  author: {
    name: "Stephen Robles",
    role: "Video & Podcast Creator",
    avatar: img1,
  },
  tags: ["Podcast recording"],
  date: "October 11, 2024",
  readTime: "8 min",
  image: img1,
};

const trending = {
  title: "Trending on Tehzeeb Creations",
  image: img2,
};

const sideBlogs = [
  {
    id: 1,
    title: "How to Use iPhone as Webcam on Mac & Windows | Step-by-Step Guide",
    date: "Jun 26, 2024",
    readTime: "14 min",
    tag: "Studio equipment",
    image: img2,
  },
  {
    id: 2,
    title: "How to Record a Video Podcast (Remotely) in 5 Steps",
    date: "Mar 21, 2024",
    readTime: "14 min",
    tag: "Video podcast",
    image: img2,
  },
  {
    id: 3,
    title: "How to Improve Zoom Video Quality (Full Video & Audio Guide)",
    date: "Mar 5, 2024",
    readTime: "10 min",
    tag: "Recording software",
    image: img1,
  },
];

export default function BlogPage() {
  return (
    <div className="bg-[#F5F5F7] min-h-screen py-8 px-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Featured Blog */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={mainBlog.image}
              alt={mainBlog.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#232323] mb-4">
                {mainBlog.title}
              </h1>
              <p className="text-lg text-[#555] mb-6">{mainBlog.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Author Avatar & Info */}
                <div className="flex items-center gap-2">
                  <img
                    src={mainBlog.author.avatar}
                    alt={mainBlog.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#232323]">
                    {mainBlog.author.name}
                  </span>
                  <span className="text-[#888] text-sm">
                    {mainBlog.author.role}
                  </span>
                </div>
                {/* Tags */}
                {mainBlog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#f3e0e0] text-[#C65151] px-3 py-1 rounded-full text-xs font-semibold ml-2"
                  >
                    {tag}
                  </span>
                ))}
                {/* Date & Read Time */}
                <span className="text-[#888] text-sm ml-4">
                  {mainBlog.date} &bull; {mainBlog.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Trending & Side Blogs */}
        <aside className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#3B7046] to-[#227533] p-6 mb-3 text-white font-bold text-xl flex items-center justify-center min-h-[90px]">
            {trending.title}
          </div>
          {sideBlogs.map((blog) => (
            <div
              key={blog.id}
              className="flex gap-4 items-center bg-white rounded-2xl shadow p-3 hover:shadow-lg transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="font-semibold text-md text-[#232323] leading-tight line-clamp-2">
                  {blog.title}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[#888]">
                  <span>{blog.date}</span>
                  <span>&bull;</span>
                  <span>{blog.readTime}</span>
                  <span
                    className="bg-[#f3e0e0] text-[#C65151] px-2 py-1 rounded-full font-medium"
                  >
                    {blog.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}