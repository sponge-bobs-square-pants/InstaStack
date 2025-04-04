import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  BarChart2,
  User,
  Repeat2,
  ThumbsUp,
  Eye,
  DollarSign,
  ArrowUpRight,
  Award,
} from "lucide-react";
import { InstaStack } from "../index";

const Example2 = () => {
  // Example 1: Basic usage with social metrics
  const [socialMetrics, setSocialMetrics] = useState({
    likes: 15400,
    comments: 2300,
    shares: 850,
  });

  // Example 2: Analytics dashboard metrics
  const [analyticsMetrics, setAnalyticsMetrics] = useState({
    views: 687500,
    conversions: 12420,
    shares: 28900,
  });

  // Example 3: Custom metrics with different icons
  const [customMetrics, setCustomMetrics] = useState({
    followers: 8750,
    subscriptions: 3210,
    revenue: 2560,
  });

  // Example 4: Leaderboard metrics
  const [leaderboardMetrics, setLeaderboardMetrics] = useState({
    rank: 124,
    points: 45300,
    awards: 37,
  });

  // Increment all metrics every 2 seconds for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setSocialMetrics((prev) => ({
        likes: prev.likes + Math.floor(Math.random() * 100),
        comments: prev.comments + Math.floor(Math.random() * 10),
        shares: prev.shares + Math.floor(Math.random() * 5),
      }));

      setAnalyticsMetrics((prev) => ({
        views: prev.views + Math.floor(Math.random() * 500),
        conversions: prev.conversions + Math.floor(Math.random() * 15),
        shares: prev.shares + Math.floor(Math.random() * 50),
      }));

      setCustomMetrics((prev) => ({
        followers: prev.followers + Math.floor(Math.random() * 20),
        subscriptions: prev.subscriptions + Math.floor(Math.random() * 5),
        revenue: prev.revenue + Math.floor(Math.random() * 50),
      }));

      setLeaderboardMetrics((prev) => ({
        rank: Math.max(1, prev.rank - (Math.random() > 0.7 ? 1 : 0)),
        points: prev.points + Math.floor(Math.random() * 200),
        awards: prev.awards + (Math.random() > 0.85 ? 1 : 0),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Example 1: Basic social media metrics
  const socialItems = [
    {
      id: "likes",
      count: socialMetrics.likes,
      icon: <Heart size={18} className="text-red-500" />,
    },
    {
      id: "comments",
      count: socialMetrics.comments,
      icon: <MessageCircle size={18} className="text-blue-500" />,
    },
    {
      id: "shares",
      count: socialMetrics.shares,
      icon: <Share size={18} className="text-green-500" />,
    },
  ];

  // Example 2: Analytics metrics with custom styling
  const analyticsItems = [
    {
      id: "views",
      count: analyticsMetrics.views,
      icon: <Eye size={20} className="text-white" />,
    },
    {
      id: "conversions",
      count: analyticsMetrics.conversions,
      icon: <ArrowUpRight size={20} className="text-green-300" />,
    },
    {
      id: "shares",
      count: analyticsMetrics.shares,
      icon: <Share size={20} className="text-blue-300" />,
    },
  ];

  // Example 3: Custom dashboard metrics
  const dashboardItems = [
    {
      id: "followers",
      count: customMetrics.followers,
      icon: <User size={16} className="text-purple-600" />,
      // Individual item styling overrides
      containerStyle: {
        backgroundColor: "#F3F4F6",
        borderRadius: "4px",
        padding: "0 8px",
      },
      iconStyle: { marginRight: "8px" },
      countStyle: { fontWeight: "bold" },
    },
    {
      id: "subscriptions",
      count: customMetrics.subscriptions,
      icon: <Repeat2 size={16} className="text-blue-600" />,
      containerStyle: {
        backgroundColor: "#F3F4F6",
        borderRadius: "4px",
        padding: "0 8px",
      },
      iconStyle: { marginRight: "8px" },
      countStyle: { fontWeight: "bold" },
    },
    {
      id: "revenue",
      count: customMetrics.revenue,
      icon: <DollarSign size={16} className="text-green-600" />,
      containerStyle: {
        backgroundColor: "#F3F4F6",
        borderRadius: "4px",
        padding: "0 8px",
      },
      iconStyle: { marginRight: "8px" },
      countStyle: { fontWeight: "bold" },
    },
  ];

  // Example 4: Leaderboard metrics
  const leaderboardItems = [
    {
      id: "rank",
      count: leaderboardMetrics.rank,
      icon: <ThumbsUp size={22} className="text-yellow-500" />,
    },
    {
      id: "points",
      count: leaderboardMetrics.points,
      icon: <BarChart2 size={22} className="text-purple-500" />,
    },
    {
      id: "awards",
      count: leaderboardMetrics.awards,
      icon: <Award size={22} className="text-pink-500" />,
    },
  ];

  // Noise texture style for dark background
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
    <div className="space-y-10 p-6 max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">InstaStack Demo</h1>
        <p className="text-gray-600 mt-2">
          A flexible component for displaying metrics with live counters
        </p>
      </header>

      <section className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">1. Basic Usage</h2>
        <div className="mb-6">
          <InstaStack items={socialItems} />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-sm font-bold mb-2">Code Example:</h3>
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            {`import { InstaStack } from 'instastack';
import { Heart, MessageCircle, Share } from 'lucide-react';

// Define your metric items
const items = [
  {
    id: "likes",
    count: 15400,  // Will automatically format as 15.4K
    icon: <Heart size={18} className="text-red-500" />
  },
  {
    id: "comments",
    count: 2300,
    icon: <MessageCircle size={18} className="text-blue-500" />
  },
  {
    id: "shares",
    count: 850,
    icon: <Share size={18} className="text-green-500" />
  }
];

// Use the component with default styling
<InstaStack items={items} />`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">2. Custom Container Styling</h2>
        <div
          className="rounded-lg shadow-sm overflow-hidden mb-6"
          style={{
            ...noiseStyle,
            background:
              "linear-gradient(135deg, rgb(10, 20, 18), rgb(15, 25, 22), rgb(8, 18, 16))",
          }}
        >
          <div style={noiseOverlayStyle}></div>
          <div className="p-6 relative z-10">
            <h3 className="text-white text-lg mb-4">Analytics Dashboard</h3>
            <InstaStack
              items={analyticsItems}
              containerStyle={{
                justifyContent: "space-between",
                maxWidth: "600px",
              }}
              itemContainerStyle={{ height: "36px" }}
              iconStyle={{ marginRight: "10px" }}
              countStyle={{
                fontSize: "22px",
                fontWeight: "600",
                color: "white",
              }}
            />
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-sm font-bold mb-2">Code Example:</h3>
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            {`<InstaStack 
  items={analyticsItems}
  // Customize the container
  containerStyle={{ 
    justifyContent: 'space-between', 
    maxWidth: '600px' 
  }}
  // Style applied to all item containers
  itemContainerStyle={{ height: "36px" }}
  // Style applied to all icons
  iconStyle={{ marginRight: "10px" }}
  // Style applied to all count values
  countStyle={{ 
    fontSize: "22px", 
    fontWeight: "600", 
    color: "white" 
  }}
/>`}
          </pre>
        </div>
      </section>

      <section className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">3. Individual Item Styling</h2>
        <div className="mb-6">
          <InstaStack
            items={dashboardItems}
            containerStyle={{
              backgroundColor: "#FAFAFA",
              padding: "16px",
              borderRadius: "8px",
            }}
            itemContainerStyle={{ height: "32px", marginRight: "16px" }}
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-sm font-bold mb-2">Code Example:</h3>
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            {`// You can style individual items
const items = [
  {
    id: "followers",
    count: 8750,
    icon: <User size={16} className="text-purple-600" />,
    // Individual styling for this item only
    containerStyle: { 
      backgroundColor: "#F3F4F6", 
      borderRadius: "4px", 
      padding: "0 8px" 
    },
    iconStyle: { marginRight: "8px" },
    countStyle: { fontWeight: "bold" }
  },
  // More items with their own styling...
];

<InstaStack 
  items={items}
  containerStyle={{ 
    backgroundColor: "#FAFAFA", 
    padding: "16px", 
    borderRadius: "8px" 
  }}
  itemContainerStyle={{ height: "32px", marginRight: "16px" }}
/>`}
          </pre>
        </div>
      </section>

      <section className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">4. Custom Fonts</h2>
        <div className="mb-6">
          <InstaStack
            items={leaderboardItems}
            containerStyle={{
              justifyContent: "center",
              backgroundColor: "#4A148C",
              padding: "16px",
              borderRadius: "8px",
            }}
            itemContainerStyle={{ height: "40px", marginRight: "24px" }}
            iconStyle={{ marginRight: "8px" }}
            countStyle={{ fontSize: "24px", fontWeight: "700", color: "white" }}
            font="'Courier New', monospace"
          />
          <div className="text-center mt-3 text-sm text-gray-600">
            Custom monospace font with centered layout
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-sm font-bold mb-2">Code Example:</h3>
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            {`<InstaStack 
  items={leaderboardItems}
  containerStyle={{ 
    justifyContent: 'center',  // Center the items
    backgroundColor: "#4A148C", 
    padding: "16px", 
    borderRadius: "8px" 
  }}
  itemContainerStyle={{ height: "40px", marginRight: "24px" }}
  iconStyle={{ marginRight: "8px" }}
  countStyle={{ fontSize: "24px", fontWeight: "700", color: "white" }}
  // Custom font family
  font="'Courier New', monospace"
/>`}
          </pre>
        </div>
      </section>

      <section className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">All Available Props</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">InstaStack Props</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <code className="bg-gray-200 px-1 rounded">items</code> - Array
                of metric items to display (required)
              </li>
              <li>
                <code className="bg-gray-200 px-1 rounded">containerStyle</code>{" "}
                - Style object for the main container
              </li>
              <li>
                <code className="bg-gray-200 px-1 rounded">
                  itemContainerStyle
                </code>{" "}
                - Style applied to each item container
              </li>
              <li>
                <code className="bg-gray-200 px-1 rounded">iconStyle</code> -
                Style applied to each icon container
              </li>
              <li>
                <code className="bg-gray-200 px-1 rounded">countStyle</code> -
                Style applied to each counter value
              </li>
              <li>
                <code className="bg-gray-200 px-1 rounded">font</code> - Font
                family to use for all text
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold">Item Structure</h3>
            <pre className="text-sm mt-2 bg-gray-200 p-2 rounded-lg">
              {`{
  id: "uniqueId",       // Required unique identifier
  count: 12345,         // Number value to display
  icon: <Icon />,       // React element to display
  containerStyle: {},   // Optional individual container style
  iconStyle: {},        // Optional individual icon style
  countStyle: {}        // Optional individual count style
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Example2;
