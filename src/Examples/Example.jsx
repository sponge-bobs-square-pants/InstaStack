import React, { useState, useEffect } from "react";
import {
  Heart,
  Bookmark,
  MoreHorizontal,
  BarChart2,
  Repeat2,
} from "lucide-react";
import { InstaStack } from "../index";
import ProfileImage from "../assets/profile.png";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import PostImage from "../assets/parth.png";

const InstagramPost = () => {
  const [metrics, setMetrics] = useState({
    likes: 154000,
    comments: 400,
    shares: 1100,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        likes: prev.likes + Math.floor(Math.random() * 1000),
        comments: prev.comments + Math.floor(Math.random() * 2),
        shares: prev.shares + Math.floor(Math.random() * 100),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const metricItems = [
    {
      id: "likes",
      count: metrics.likes,
      icon: <FaRegHeart size={18} className="text-black" />,
    },
    {
      id: "comments",
      count: metrics.comments,
      icon: <FaRegComment size={18} className="text-black -scale-x-100" />,
    },
    {
      id: "shares",
      count: metrics.shares,
      icon: <FiSend size={18} className="text-black" />,
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-sm overflow-hidden border border-gray-200 rounded-lg mb-6">
      <div className="flex items-center p-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
          <img
            src={ProfileImage}
            alt="Profile"
            className="w-half h-auto object-cover"
          />
        </div>
        <div className="ml-2 flex-1">
          <span className="font-semibold text-xs">Parth Chawla</span>
        </div>
        <MoreHorizontal size={16} className="text-black" />
      </div>
      <div className="aspect-square w-full relative bg-gray-100 h-86">
        <img
          src={PostImage}
          alt="Post image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-3 py-2">
        <InstaStack
          items={metricItems}
          itemContainerStyle={{ height: "20px", marginRight: "20px" }}
          iconStyle={{ marginRight: "4px" }}
          countStyle={{ fontSize: "12px" }}
        />
        <div className="mt-2">
          <span className="font-semibold text-xs">partee_party</span>
          <span className="text-xs ml-1">
            This is a demo of the InstaStack metrics with live updates.
          </span>
        </div>
        <div className="mt-1 text-gray-500 text-xs">
          View all {metrics.comments} comments
        </div>
        <div className="mt-1 text-gray-400 text-[0.7rem]">2 hours ago</div>
      </div>
    </div>
  );
};

const InstagramPost2 = () => {
  const [metricsPost, setMetricsPost] = useState({
    analytics: 154000,
    repost: 400,
    likes: 1100,
    saved: 250,
  });
  const [metrics, setMetrics] = useState({
    likes: 154000,
    comments: 400,
    shares: 1100,
  });

  useEffect(() => {
    const intervalPost = setInterval(() => {
      setMetricsPost((prev) => ({
        analytics: prev.analytics + Math.floor(Math.random() * 1000),
        repost: prev.repost + Math.floor(Math.random() * 2),
        likes: prev.likes + Math.floor(Math.random() * 100),
        saved: prev.saved + Math.floor(Math.random() * 50),
      }));
    }, 1000);

    const intervalMetrics = setInterval(() => {
      setMetrics((prev) => ({
        likes: prev.likes + Math.floor(Math.random() * 1000),
        comments: prev.comments + Math.floor(Math.random() * 2),
        shares: prev.shares + Math.floor(Math.random() * 100),
      }));
    }, 1000);

    return () => {
      clearInterval(intervalPost);
      clearInterval(intervalMetrics);
    };
  }, []);

  const metricPostItems = [
    {
      id: "analytics",
      count: metricsPost.analytics,
      icon: <BarChart2 size={22} className="text-white" />,
    },
    {
      id: "repost",
      count: metricsPost.repost,
      icon: <Repeat2 size={22} className="text-green-300" />,
    },
    {
      id: "likes",
      count: metricsPost.likes,
      icon: <Heart size={22} className="text-pink-600" />,
    },
    {
      id: "saved",
      count: metricsPost.saved,
      icon: <Bookmark size={22} className="text-blue-500" />,
    },
  ];

  const metricItems = [
    {
      id: "likes",
      count: metrics.likes,
      icon: <FaRegHeart size={18} className="text-black" />,
    },
    {
      id: "comments",
      count: metrics.comments,
      icon: <FaRegComment size={18} className="text-black -scale-x-100" />,
    },
    {
      id: "shares",
      count: metrics.shares,
      icon: <FiSend size={18} className="text-black" />,
    },
  ];

  // Create CSS for noise background
  const noiseStyle = {
    position: "relative",
    overflow: "hidden",
  };

  const noiseOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.35,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    pointerEvents: "none",
    zIndex: 1,
    mixBlendMode: "overlay",
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-sm overflow-hidden border border-gray-200 rounded-lg mb-6">
      <div className="flex items-center p-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
          <img
            src={ProfileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-2 flex-1">
          <span className="font-semibold text-xs">Parth Chawla</span>
        </div>
        <MoreHorizontal size={16} className="text-black" />
      </div>

      {/* InstaStack as the main content with noise gradient background */}
      <div
        className="w-full flex justify-center items-center aspect-square h-86"
        style={{
          ...noiseStyle,
          background:
            "linear-gradient(135deg, rgb(10, 20, 18), rgb(15, 25, 22), rgb(8, 18, 16))",
        }}
      >
        {/* Noise overlay */}
        <div style={noiseOverlayStyle}></div>

        {/* Content on top of noise */}
        <div className="z-10 relative">
          <InstaStack
            items={metricPostItems}
            itemContainerStyle={{ height: "32px", marginRight: "32px" }}
            iconStyle={{ marginRight: "12px" }}
            countStyle={{
              fontSize: "14px",
              fontWeight: "normal",
              color: "white",
            }}
          />
        </div>
      </div>

      {/* Second InstaStack */}
      <div className="px-3 py-2">
        <InstaStack
          items={metricItems}
          itemContainerStyle={{ height: "20px", marginRight: "20px" }}
          iconStyle={{ marginRight: "4px" }}
          countStyle={{ fontSize: "12px" }}
        />
        <div className="mt-2">
          <span className="font-semibold text-xs">partee_party</span>
          <span className="text-xs ml-1">
            Any <b>ICON</b>, Any <b>FONT!</b> Simple Plug and Play
          </span>
        </div>
        <div className="mt-1 text-gray-500 text-xs">
          View all {metrics.comments} comments
        </div>
        <div className="mt-1 text-gray-400 text-[0.7rem]">2 hours ago</div>
      </div>
    </div>
  );
};

const InstagramFeed = () => {
  return (
    <div className="p-2 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-lg font-bold text-center mb-1">InstaStack Demo</h1>
        <p className="text-gray-600 text-center text-xs mb-3">
          Live metrics with animated counters
        </p>
        <InstagramPost />
        <InstagramPost2 />
      </div>
    </div>
  );
};

export default InstagramFeed;
