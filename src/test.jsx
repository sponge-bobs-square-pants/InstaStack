// import React, { useEffect, useState, useRef } from "react";
// import { BarChart2, Repeat2, Heart, Bookmark } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // Component for a single rolling digit with both up and down animations
// const SequenceRollingDigit = ({ digit, prevDigit }) => {
//   // Only animate if there's a change and prevDigit is valid
//   const shouldAnimate =
//     prevDigit !== undefined && prevDigit !== null && prevDigit !== digit;

//   // Determine if we need to roll down (9->0 or decreasing)
//   const isRollDown =
//     shouldAnimate &&
//     ((prevDigit === 9 && digit === 0) ||
//       (prevDigit !== 9 && digit < prevDigit));

//   // Determine if we need to roll up (normal incrementing or wrapping from 0->9)
//   const isRollUp = shouldAnimate && !isRollDown;

//   // For the sequential animation when rolling down
//   const [animSequence, setAnimSequence] = useState([]);
//   const [sequenceIndex, setSequenceIndex] = useState(0);
//   const [animating, setAnimating] = useState(false);

//   // Generate the animation sequence for rolling down
//   useEffect(() => {
//     if (shouldAnimate && isRollDown) {
//       const sequence = [];
//       let current = prevDigit;

//       // Generate sequence from prevDigit down to 0, then from 9 down to digit if needed
//       while (current !== digit) {
//         sequence.push(current);
//         current = current === 0 ? 9 : current - 1;
//       }
//       sequence.push(digit);

//       setAnimSequence(sequence);
//       setSequenceIndex(0);
//       setAnimating(true);
//     } else {
//       setAnimating(false);
//     }
//   }, [digit, prevDigit, shouldAnimate, isRollDown]);

//   // Simple up or down animation for non-sequence cases
//   if (!animating) {
//     return (
//       <div
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           height: "1.2em",
//           width: "0.6em",
//           display: "inline-block",
//           verticalAlign: "middle",
//         }}
//       >
//         {shouldAnimate && isRollUp ? (
//           <>
//             {/* Outgoing digit (roll up) */}
//             <motion.div
//               key={`prev-${prevDigit}`}
//               initial={{ y: 0 }}
//               animate={{ y: "-100%" }}
//               transition={{ duration: 0.3, ease: "easeIn" }}
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 lineHeight: "1.2em",
//                 textAlign: "center",
//               }}
//             >
//               {prevDigit}
//             </motion.div>

//             {/* Incoming digit (roll up) */}
//             <motion.div
//               key={`current-${digit}`}
//               initial={{ y: "100%" }}
//               animate={{ y: 0 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 lineHeight: "1.2em",
//                 textAlign: "center",
//               }}
//             >
//               {digit}
//             </motion.div>
//           </>
//         ) : (
//           // Static display for no animation
//           <div
//             style={{
//               position: "absolute",
//               width: "100%",
//               lineHeight: "1.2em",
//               textAlign: "center",
//             }}
//           >
//             {digit}
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Sequence animation displaying one digit at a time with sliding effect
//   return (
//     <div
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         height: "1.2em",
//         width: "0.6em",
//         display: "inline-block",
//         verticalAlign: "middle",
//       }}
//     >
//       <AnimatePresence mode="wait">
//         {sequenceIndex < animSequence.length && (
//           <motion.div
//             key={`seq-${animSequence[sequenceIndex]}-${sequenceIndex}`}
//             initial={{ y: "-100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ duration: 0.1 }}
//             onAnimationComplete={() => {
//               if (sequenceIndex < animSequence.length - 1) {
//                 setSequenceIndex(sequenceIndex + 1);
//               } else {
//                 setAnimating(false);
//               }
//             }}
//             style={{
//               position: "absolute",
//               width: "100%",
//               lineHeight: "1.2em",
//               textAlign: "center",
//             }}
//           >
//             {animSequence[sequenceIndex]}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // Rolling counter for a complete number
// const RollingCounter = ({ value, prevValue, hasK }) => {
//   // Pad both current and previous values to ensure equal length
//   const maxLength = Math.max(
//     value.toString().length,
//     prevValue?.toString().length || 0
//   );

//   const currentDigits = value.toString().padStart(maxLength, "0").split("");
//   const previousDigits = prevValue
//     ? prevValue.toString().padStart(maxLength, "0").split("")
//     : Array(maxLength).fill(undefined);

//   return (
//     <div
//       style={{
//         display: "inline-flex",
//         position: "relative",
//         height: "1.2em",
//         alignItems: "center",
//         verticalAlign: "middle",
//       }}
//     >
//       {currentDigits.map((digit, index) => (
//         <SequenceRollingDigit
//           key={index}
//           digit={parseInt(digit)}
//           prevDigit={
//             previousDigits[index] !== undefined
//               ? parseInt(previousDigits[index])
//               : undefined
//           }
//         />
//       ))}
//       {hasK && <span style={{ marginLeft: "1px" }}>K</span>}
//     </div>
//   );
// };

// const App = () => {
//   // Current values
//   const [barCount, setBarCount] = useState(1000);
//   const [repeatCount, setRepeatCount] = useState(607);
//   const [heartCount, setHeartCount] = useState(14);
//   const [bookmarkCount, setBookmarkCount] = useState(1);

//   // Previous values for animation
//   const [prevBarCount, setPrevBarCount] = useState(null);
//   const [prevRepeatCount, setPrevRepeatCount] = useState(null);
//   const [prevHeartCount, setPrevHeartCount] = useState(null);
//   const [prevBookmarkCount, setPrevBookmarkCount] = useState(null);

//   // Format number for display
//   const formatNumber = (num) => {
//     if (num < 1000) return { value: num, hasK: false };
//     return { value: Math.floor(num / 1000), hasK: true };
//   };

//   useEffect(() => {
//     // Update counts every 3 seconds
//     const interval = setInterval(() => {
//       // Store previous values
//       setPrevBarCount(barCount);
//       setPrevRepeatCount(repeatCount);
//       setPrevHeartCount(heartCount);
//       setPrevBookmarkCount(bookmarkCount);

//       // Update to new values
//       setBarCount((prev) => prev + 1);
//       setRepeatCount((prev) => prev + 1);
//       setHeartCount((prev) => prev + 1);
//       setBookmarkCount((prev) => prev + 1);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [barCount, repeatCount, heartCount, bookmarkCount]);

//   // Fixed container styles for consistent layout
//   const containerStyle = {
//     display: "flex",
//     alignItems: "center",
//     height: "24px",
//     marginRight: "32px",
//   };

//   const iconStyle = {
//     marginRight: "5px",
//     display: "flex",
//   };

//   const countStyle = {
//     fontSize: "16px",
//     display: "flex",
//     alignItems: "center",
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%",
//         height: "100vh",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//         }}
//       >
//         <div style={containerStyle}>
//           <div style={iconStyle}>
//             <BarChart2 size={20} style={{ marginBottom: "3px" }} />
//           </div>
//           <div style={countStyle}>
//             <RollingCounter
//               value={formatNumber(barCount).value}
//               prevValue={
//                 prevBarCount !== null ? formatNumber(prevBarCount).value : null
//               }
//               hasK={formatNumber(barCount).hasK}
//             />
//           </div>
//         </div>

//         <div style={containerStyle}>
//           <div style={iconStyle}>
//             <Repeat2 size={20} />
//           </div>
//           <div style={countStyle}>
//             <RollingCounter
//               value={formatNumber(repeatCount).value}
//               prevValue={
//                 prevRepeatCount !== null
//                   ? formatNumber(prevRepeatCount).value
//                   : null
//               }
//               hasK={formatNumber(repeatCount).hasK}
//             />
//           </div>
//         </div>

//         <div style={containerStyle}>
//           <div style={iconStyle}>
//             <Heart size={20} />
//           </div>
//           <div style={countStyle}>
//             <RollingCounter
//               value={formatNumber(heartCount).value}
//               prevValue={
//                 prevHeartCount !== null
//                   ? formatNumber(prevHeartCount).value
//                   : null
//               }
//               hasK={formatNumber(heartCount).hasK}
//             />
//           </div>
//         </div>

//         <div style={{ ...containerStyle, marginRight: 0 }}>
//           <div style={iconStyle}>
//             <Bookmark size={20} />
//           </div>
//           <div style={countStyle}>
//             <RollingCounter
//               value={formatNumber(bookmarkCount).value}
//               prevValue={
//                 prevBookmarkCount !== null
//                   ? formatNumber(prevBookmarkCount).value
//                   : null
//               }
//               hasK={formatNumber(bookmarkCount).hasK}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { BarChart2, Repeat2, Heart, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Component for a single rolling digit
const RollingDigit = ({ digit, prevDigit }) => {
  // Only animate if there's a change
  const shouldAnimate = prevDigit !== undefined && prevDigit !== digit;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: "1.2em",
        width: "0.6em",
        display: "inline-block",
        verticalAlign: "middle",
      }}
    >
      {shouldAnimate ? (
        <>
          {/* Outgoing digit */}
          <motion.div
            key={`prev-${prevDigit}`}
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            style={{
              position: "absolute",
              width: "100%",
              lineHeight: "1.2em",
              textAlign: "center",
            }}
          >
            {prevDigit}
          </motion.div>

          {/* Incoming digit */}
          <motion.div
            key={`current-${digit}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "100%",
              lineHeight: "1.2em",
              textAlign: "center",
            }}
          >
            {digit}
          </motion.div>
        </>
      ) : (
        // No animation needed, just show the digit
        <div
          style={{
            position: "absolute",
            width: "100%",
            lineHeight: "1.2em",
            textAlign: "center",
          }}
        >
          {digit}
        </div>
      )}
    </div>
  );
};

// Rolling counter for a complete number
const RollingCounter = ({ value, prevValue, hasK }) => {
  // Pad both current and previous values to ensure equal length
  const maxLength = Math.max(
    value.toString().length,
    prevValue?.toString().length || 0
  );

  const currentDigits = value.toString().padStart(maxLength, "0").split("");
  const previousDigits = prevValue
    ? prevValue.toString().padStart(maxLength, "0").split("")
    : Array(maxLength).fill("0");

  return (
    <div
      style={{
        display: "inline-flex",
        position: "relative",
        height: "1.2em",
        alignItems: "center",
        verticalAlign: "middle",
      }}
    >
      {currentDigits.map((digit, index) => (
        <RollingDigit
          key={index}
          digit={digit}
          prevDigit={previousDigits[index]}
        />
      ))}
      {hasK && <span style={{ marginLeft: "1px" }}>K</span>}
    </div>
  );
};

const App = () => {
  // Current values
  const [barCount, setBarCount] = useState(1000);
  const [repeatCount, setRepeatCount] = useState(607);
  const [heartCount, setHeartCount] = useState(14);
  const [bookmarkCount, setBookmarkCount] = useState(1);

  // Previous values for animation
  const [prevBarCount, setPrevBarCount] = useState(null);
  const [prevRepeatCount, setPrevRepeatCount] = useState(null);
  const [prevHeartCount, setPrevHeartCount] = useState(null);
  const [prevBookmarkCount, setPrevBookmarkCount] = useState(null);

  // Format number for display
  const formatNumber = (num) => {
    if (num < 1000) return { value: num, hasK: false };
    return { value: Math.floor(num / 1000), hasK: true };
  };

  useEffect(() => {
    // Update counts every 3 seconds
    const interval = setInterval(() => {
      // Store previous values
      setPrevBarCount(barCount);
      setPrevRepeatCount(repeatCount);
      setPrevHeartCount(heartCount);
      setPrevBookmarkCount(bookmarkCount);

      // Update to new values
      setBarCount((prev) => prev + 1);
      setRepeatCount((prev) => prev + 1);
      setHeartCount((prev) => prev + 1);
      setBookmarkCount((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [barCount, repeatCount, heartCount, bookmarkCount]);

  // Fixed container styles for consistent layout
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    height: "24px",
    marginRight: "32px",
  };

  const iconStyle = {
    marginRight: "5px",
    display: "flex",
  };

  const countStyle = {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div style={containerStyle}>
          <div style={iconStyle}>
            <BarChart2 size={20} style={{ marginBottom: "3px" }} />
          </div>
          <div style={countStyle}>
            <RollingCounter
              value={formatNumber(barCount).value}
              prevValue={
                prevBarCount !== null ? formatNumber(prevBarCount).value : null
              }
              hasK={formatNumber(barCount).hasK}
            />
          </div>
        </div>

        <div style={containerStyle}>
          <div style={iconStyle}>
            <Repeat2 size={20} />
          </div>
          <div style={countStyle}>
            <RollingCounter
              value={formatNumber(repeatCount).value}
              prevValue={
                prevRepeatCount !== null
                  ? formatNumber(prevRepeatCount).value
                  : null
              }
              hasK={formatNumber(repeatCount).hasK}
            />
          </div>
        </div>

        <div style={containerStyle}>
          <div style={iconStyle}>
            <Heart size={20} />
          </div>
          <div style={countStyle}>
            <RollingCounter
              value={formatNumber(heartCount).value}
              prevValue={
                prevHeartCount !== null
                  ? formatNumber(prevHeartCount).value
                  : null
              }
              hasK={formatNumber(heartCount).hasK}
            />
          </div>
        </div>

        <div style={{ ...containerStyle, marginRight: 0 }}>
          <div style={iconStyle}>
            <Bookmark size={20} />
          </div>
          <div style={countStyle}>
            <RollingCounter
              value={formatNumber(bookmarkCount).value}
              prevValue={
                prevBookmarkCount !== null
                  ? formatNumber(prevBookmarkCount).value
                  : null
              }
              hasK={formatNumber(bookmarkCount).hasK}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
