const colorWords = (
  text: string,
  wordsToColor: string[],
  baseColor: string = "var(--text-gray-9)",
  customColor: string = "var(--cyan-7)"
): JSX.Element => {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          // Cannot use words position because of i18n
          style={{
            color: wordsToColor.includes(word) ? customColor : baseColor,
          }}
        >
          {word}{" "}
        </span>
      ))}
    </>
  );
};

export default colorWords;
