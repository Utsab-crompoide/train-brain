/**
 * BoxInput — a multi-box character input component
 *
 * Props:
 *  numberOfFields  {number}   How many individual boxes to render (default: 4)
 *  type            {string}   "text" | "number" | "password" (default: "text")
 *  styles          {object}   Override styles for sub-parts:
 *                               wrapper, box, boxFocused, boxFilled, boxError
 *  onComplete      {function} Called with the full value string when all boxes are filled
 *  onChange        {function} Called with the current partial/full value on every keystroke
 *  error           {boolean}  Adds error styling
 *  disabled        {boolean}  Disables all inputs
 *  autoFocus       {boolean}  Auto-focus the first box on mount
 *  placeholder     {string}   Single-char placeholder per box (default: "·")
 */

import { useRef, useState, useEffect, CSSProperties } from "react";

type InputType = "text" | "number" | "password";

interface BoxInputStyles {
  wrapper?: CSSProperties;
  box?: CSSProperties;
  boxFocused?: CSSProperties;
  boxFilled?: CSSProperties;
  boxError?: CSSProperties;
}

interface BoxInputProps {
  numberOfFields?: number;
  type?: InputType;
  styles?: BoxInputStyles;
  onComplete?: (value: string) => void;
  onChange?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

const DEFAULT_STYLES: Required<BoxInputStyles> = {
  wrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Mono', 'Fira Mono', 'Courier New', monospace",
  },
  box: {
    width: "52px",
    height: "60px",
    borderRadius: "12px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#d1d5db",
    background: "#f9fafb",
    fontSize: "1.6rem",
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease",
    cursor: "text",
    caretColor: "transparent",
  },
  boxFocused: {
    borderColor: "#6366f1",
    boxShadow: "0 0 0 3px rgba(99,102,241,0.18)",
    background: "#fff",
    transform: "translateY(-2px)",
  },
  boxFilled: {
    borderColor: "#6366f1",
    background: "#fff",
    color: "#4f46e5",
  },
  boxError: {
    borderColor: "#ef4444",
    boxShadow: "0 0 0 3px rgba(239,68,68,0.15)",
    color: "#dc2626",
  },
};

function mergeStyle(
  base: CSSProperties,
  override: CSSProperties | undefined
): CSSProperties {
  return override ? { ...base, ...override } : base;
}

export default function BoxInput({
  numberOfFields = 4,
  type = "text",
  styles = {},
  onComplete,
  onChange,
  error = false,
  disabled = false,
  autoFocus = true,
  placeholder = "·",
}: BoxInputProps) {
  const [values, setValues] = useState<string[]>(
    Array(numberOfFields).fill("")
  );
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, numberOfFields);
  }, [numberOfFields]);

  useEffect(() => {
    if (autoFocus) inputRefs.current[0]?.focus();
  }, [autoFocus]);

  const focusBox = (index: number): void => {
    if (index >= 0 && index < numberOfFields) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const raw = e.target.value;
    const filtered = type === "number" ? raw.replace(/\D/g, "") : raw;

    if (filtered.length > 1) {
      const chars = filtered.slice(0, numberOfFields - index).split("");
      const next = [...values];
      chars.forEach((ch, i) => {
        if (index + i < numberOfFields) next[index + i] = ch;
      });
      setValues(next);
      focusBox(Math.min(index + chars.length, numberOfFields - 1));
      const joined = next.join("");
      onChange?.(joined);
      if (next.every((v) => v !== "")) onComplete?.(joined);
      return;
    }

    const char = filtered.slice(-1);
    const next = [...values];
    next[index] = char;
    setValues(next);

    const joined = next.join("");
    onChange?.(joined);

    if (char && index < numberOfFields - 1) focusBox(index + 1);
    if (next.every((v) => v !== "")) onComplete?.(joined);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    switch (e.key) {
      case "Backspace":
        if (values[index]) {
          const next = [...values];
          next[index] = "";
          setValues(next);
          onChange?.(next.join(""));
        } else {
          focusBox(index - 1);
          if (index > 0) {
            const next = [...values];
            next[index - 1] = "";
            setValues(next);
            onChange?.(next.join(""));
          }
        }
        e.preventDefault();
        break;
      case "ArrowLeft":
        focusBox(index - 1);
        e.preventDefault();
        break;
      case "ArrowRight":
        focusBox(index + 1);
        e.preventDefault();
        break;
      case "Home":
        focusBox(0);
        e.preventDefault();
        break;
      case "End":
        focusBox(numberOfFields - 1);
        e.preventDefault();
        break;
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement>,
    index: number
  ): void => {
    setFocusedIndex(index);
    e.target.select();
  };

  const handleBlur = (): void => {
    setFocusedIndex(null);
  };

  const getBoxStyle = (index: number): CSSProperties => {
    const isFocused = focusedIndex === index;
    const isFilled = Boolean(values[index]);

    let style = mergeStyle(DEFAULT_STYLES.box, styles.box);
    if (isFilled)   style = { ...style, ...DEFAULT_STYLES.boxFilled,   ...styles.boxFilled };
    if (isFocused)  style = { ...style, ...DEFAULT_STYLES.boxFocused,  ...styles.boxFocused };
    if (error)      style = { ...style, ...DEFAULT_STYLES.boxError,    ...styles.boxError };
    if (disabled)   style = { ...style, opacity: 0.5, cursor: "not-allowed" };

    return style;
  };

  const inputType = type === "number" ? "tel" : type;

  return (
    <div style={mergeStyle(DEFAULT_STYLES.wrapper, styles.wrapper)}>
      {Array.from({ length: numberOfFields }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type={inputType}
          inputMode={type === "number" ? "numeric" : undefined}
          maxLength={1}
          value={values[index].toUpperCase()}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="one-time-code"
          aria-label={`Field ${index + 1} of ${numberOfFields}`}
          style={getBoxStyle(index)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => handleFocus(e, index)}
          onBlur={handleBlur}
        />
      ))}
    </div>
  );
}