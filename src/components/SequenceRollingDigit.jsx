import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SequenceRollingDigit = ({
  digit,
  prevDigit,
  style,
  font = "Satoshi",
}) => {
  // Only animate if there's a change and prevDigit is valid
  const shouldAnimate =
    prevDigit !== undefined && prevDigit !== null && prevDigit !== digit;

  // Determine if we need to roll down (9->0 or decreasing)
  const isRollDown =
    shouldAnimate &&
    ((prevDigit === 9 && digit === 0) ||
      (prevDigit !== 9 && digit < prevDigit));

  // Determine if we need to roll up (normal incrementing or wrapping from 0->9)
  const isRollUp = shouldAnimate && !isRollDown;

  // For the sequential animation when rolling down
  const [animSequence, setAnimSequence] = useState([]);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Generate the animation sequence for rolling down
  useEffect(() => {
    if (shouldAnimate && isRollDown) {
      const sequence = [];
      let current = prevDigit;

      // Generate sequence from prevDigit down to 0, then from 9 down to digit if needed
      while (current !== digit) {
        sequence.push(current);
        current = current === 0 ? 9 : current - 1;
      }
      sequence.push(digit);

      setAnimSequence(sequence);
      setSequenceIndex(0);
      setAnimating(true);
    } else {
      setAnimating(false);
    }
  }, [digit, prevDigit, shouldAnimate, isRollDown]);

  // Apply font to style
  const fontFamily = { fontFamily: font };

  const baseDigitStyle = {
    position: "relative",
    overflow: "hidden",
    height: "1.2em",
    width: "0.6em",
    display: "inline-block",
    verticalAlign: "middle",
    ...fontFamily,
    ...style,
  };

  const digitContentStyle = {
    position: "absolute",
    width: "100%",
    lineHeight: "1.2em",
    textAlign: "center",
    ...fontFamily,
  };

  // Simple up or down animation for non-sequence cases
  if (!animating) {
    return (
      <div style={baseDigitStyle}>
        {shouldAnimate && isRollUp ? (
          <>
            {/* Outgoing digit (roll up) */}
            <motion.div
              key={`prev-${prevDigit}`}
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              style={digitContentStyle}
            >
              {prevDigit}
            </motion.div>

            {/* Incoming digit (roll up) */}
            <motion.div
              key={`current-${digit}`}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={digitContentStyle}
            >
              {digit}
            </motion.div>
          </>
        ) : (
          // Static display for no animation
          <div style={digitContentStyle}>{digit}</div>
        )}
      </div>
    );
  }

  // Sequence animation displaying one digit at a time with sliding effect
  return (
    <div style={baseDigitStyle}>
      <AnimatePresence mode="">
        {sequenceIndex < animSequence.length && (
          <motion.div
            key={`seq-${animSequence[sequenceIndex]}-${sequenceIndex}`}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.125, ease: "easeInOut" }}
            onAnimationComplete={() => {
              if (sequenceIndex < animSequence.length - 1) {
                setSequenceIndex(sequenceIndex + 1);
              } else {
                setAnimating(false);
              }
            }}
            style={digitContentStyle}
          >
            {animSequence[sequenceIndex]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SequenceRollingDigit;
