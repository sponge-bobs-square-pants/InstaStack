import React from "react";
import SequenceRollingDigit from "./SequenceRollingDigit";

const RollingCounter = ({
  value,
  decimal,
  prevValue,
  prevDecimal,
  hasK,
  style = {},
  digitStyle = {},
  font = "Satoshi", // Default font
}) => {
  // Convert to string array, handling whole number and decimal part
  const currentIntDigits = value.toString().split("");
  const previousIntDigits = prevValue ? prevValue.toString().split("") : [];

  const currentDecimalDigits =
    decimal !== null ? decimal.toString().split("") : [];
  const previousDecimalDigits =
    prevDecimal !== null ? prevDecimal.toString().split("") : [];

  // Apply font to style
  const fontFamily = { fontFamily: font };

  const containerStyle = {
    display: "inline-flex",
    position: "relative",
    height: "1.2em",
    alignItems: "center",
    verticalAlign: "middle",
    ...fontFamily,
    ...style,
  };

  const finalDigitStyle = {
    ...fontFamily,
    ...digitStyle,
  };

  return (
    <div style={containerStyle}>
      {currentIntDigits.map((digit, index) => (
        <SequenceRollingDigit
          key={`int-${index}`}
          digit={parseInt(digit)}
          prevDigit={
            previousIntDigits[index] !== undefined
              ? parseInt(previousIntDigits[index])
              : undefined
          }
          style={finalDigitStyle}
          font={font}
        />
      ))}

      {hasK && (
        <>
          {decimal !== undefined && decimal !== null && (
            <>
              <span
                style={{ marginLeft: "1px", marginRight: "1px", ...fontFamily }}
              >
                .
              </span>
              {currentDecimalDigits.map((digit, index) => (
                <SequenceRollingDigit
                  key={`dec-${index}`}
                  digit={parseInt(digit)}
                  prevDigit={
                    previousDecimalDigits[index] !== undefined
                      ? parseInt(previousDecimalDigits[index])
                      : undefined
                  }
                  style={finalDigitStyle}
                  font={font}
                />
              ))}
            </>
          )}
          <span style={{ marginLeft: "1px", ...fontFamily }}>K</span>
        </>
      )}
    </div>
  );
};

export default RollingCounter;
