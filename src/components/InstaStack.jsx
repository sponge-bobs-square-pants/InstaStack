import React, { useEffect, useState, useRef } from "react";
import RollingCounter from "./RollingCounter";

const InstaStack = ({
  items = [],
  containerStyle = {},
  itemContainerStyle = {},
  iconStyle = {},
  countStyle = {},
  font = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
}) => {
  // Store previous values to animate from
  const [prevValues, setPrevValues] = useState({});
  // Store current formatted values for each counter
  const [formattedValues, setFormattedValues] = useState({});

  // Store previous prop values to detect changes
  const prevItemsRef = useRef(null);

  // Format number for display
  const formatNumber = (num) => {
    if (num < 1000) return { value: num, decimal: null, hasK: false };

    // Calculate thousands with one decimal place
    const thousands = num / 1000;
    const intPart = Math.floor(thousands);
    const decimalPart = Math.floor((thousands - intPart) * 10);

    return {
      value: intPart,
      decimal: decimalPart === 0 ? null : decimalPart,
      hasK: true,
    };
  };

  // Update values when props change
  useEffect(() => {
    const previousItems = prevItemsRef.current || [];

    // Process new values and store formatted versions
    const newFormattedValues = {};
    const newPrevValues = {};

    items.forEach((item) => {
      // Format the current value
      newFormattedValues[item.id] = formatNumber(item.count || 0);

      // Find previous value if it exists
      const prevItem = previousItems.find(
        (prevItem) => prevItem.id === item.id
      );
      if (prevItem && prevItem.count !== item.count) {
        // If we had this item before and the count changed, store previous value
        newPrevValues[item.id] = formatNumber(prevItem.count || 0);
      }
    });

    // Update state with new formatted values
    setFormattedValues(newFormattedValues);

    // If we have previous values to animate from, update them
    if (Object.keys(newPrevValues).length > 0) {
      setPrevValues(newPrevValues);
    }

    // Update reference to current items
    prevItemsRef.current = [...items];
  }, [items]);

  // Apply the font-family to all styles
  const fontFamily = { fontFamily: font };

  // Default styles
  const defaultContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ...fontFamily,
    ...containerStyle,
  };

  const defaultItemContainerStyle = {
    display: "flex",
    alignItems: "center",
    height: "24px",
    marginRight: "32px",
    ...fontFamily,
  };

  const defaultIconStyle = {
    marginRight: "5px",
    display: "flex",
  };

  const defaultCountStyle = {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    ...fontFamily,
  };

  return (
    <div style={defaultContainerStyle}>
      {items.map((item, index) => {
        const formattedCurrent =
          formattedValues[item.id] || formatNumber(item.count || 0);
        const formattedPrev = prevValues[item.id];

        const itemStyle = {
          ...defaultItemContainerStyle,
          ...(index === items.length - 1 ? { marginRight: 0 } : {}),
          ...item.containerStyle,
          ...itemContainerStyle,
        };

        return (
          <div key={item.id} style={itemStyle}>
            {item.icon && (
              <div
                style={{ ...defaultIconStyle, ...iconStyle, ...item.iconStyle }}
              >
                {item.icon}
              </div>
            )}
            <div
              style={{
                ...defaultCountStyle,
                ...countStyle,
                ...item.countStyle,
              }}
            >
              <RollingCounter
                value={formattedCurrent.value}
                decimal={formattedCurrent.decimal}
                prevValue={formattedPrev ? formattedPrev.value : null}
                prevDecimal={formattedPrev ? formattedPrev.decimal : null}
                hasK={formattedCurrent.hasK}
                font={font}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InstaStack;
