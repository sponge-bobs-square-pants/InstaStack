# InstaStack

[![npm version](https://img.shields.io/npm/v/instastack.svg?style=flat)](https://www.npmjs.com/package/instastack)

InstaStack is a flexible React component for displaying metrics with animated, auto-formatting counters - perfect for dashboards, social media interfaces, and analytics displays.

![InstaStack Demo](https://res.cloudinary.com/dfovdz88b/image/upload/f_auto,q_auto/v1/dnd/tashtnmra38r4d3buqqg)

## Features

- ✨ **Animated Counters** - Smooth rolling digit animations when values change
- 🔢 **Auto Formatting** - Automatically formats large numbers (e.g., 1.5K, 2.4M)
- 🎨 **Highly Customizable** - Style every aspect of the component
- 🧩 **Flexible Layout** - Works with any icons and custom styling
- 📱 **Responsive** - Adapts to any screen size
- 🚀 **Lightweight** - Minimal dependencies

## Installation

```bash
npm install instastack
# or
yarn add instastack
```

## Quick Start

```jsx
import React from "react";
import { InstaStack } from "instastack";
import { Heart, MessageCircle, Share } from "lucide-react";

const MyComponent = () => {
  const items = [
    {
      id: "likes",
      count: 15400, // Will automatically format as 15.4K
      icon: <Heart size={18} className="text-red-500" />,
    },
    {
      id: "comments",
      count: 2300,
      icon: <MessageCircle size={18} className="text-blue-500" />,
    },
    {
      id: "shares",
      count: 850,
      icon: <Share size={18} className="text-green-500" />,
    },
  ];

  return <InstaStack items={items} />;
};
```

## Props

| Prop                 | Type   | Description                                 |
| -------------------- | ------ | ------------------------------------------- |
| `items`              | Array  | Array of metric items to display (required) |
| `containerStyle`     | Object | Style object for the main container         |
| `itemContainerStyle` | Object | Style applied to each item container        |
| `iconStyle`          | Object | Style applied to each icon container        |
| `countStyle`         | Object | Style applied to each counter value         |
| `font`               | String | Font family to use for all text             |

### Item Structure

Each item in the `items` array should have the following structure:

```jsx
{
  id: "uniqueId",       // Required unique identifier
  count: 12345,         // Number value to display
  icon: <Icon />,       // React element to display
  containerStyle: {},   // Optional individual container style
  iconStyle: {},        // Optional individual icon style
  countStyle: {}        // Optional individual count style
}
```

## Advanced Customization Examples

### Custom Container Styling

```jsx
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
```

### Custom Fonts

```jsx
<InstaStack items={leaderboardItems} font="'Courier New', monospace" />
```

### Individual Item Styling

```jsx
const items = [
  {
    id: "followers",
    count: 8750,
    icon: <User size={16} />,
    // Individual styling for this item only
    containerStyle: {
      backgroundColor: "#F3F4F6",
      borderRadius: "4px",
      padding: "0 8px",
    },
    iconStyle: { marginRight: "8px" },
    countStyle: { fontWeight: "bold" },
  },
  // More items...
];

<InstaStack items={items} />;
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Examples

Check out the [examples](https://github.com/sponge-bobs-square-pants/InstaStack/tree/main/src/Examples) folder for more
