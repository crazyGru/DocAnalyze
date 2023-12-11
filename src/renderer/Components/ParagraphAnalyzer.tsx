import { FunctionComponent, useEffect, useRef } from 'react';

interface ParagraphComponentProps {
  index: number;
  text: string;
  updateParagraphs : (sepPgIndex : number, setStrIndex:number) => void;
}

export const ParagraphComponent: FunctionComponent<ParagraphComponentProps> = ({
  index,
  text,
  updateParagraphs,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const countWords = (inputString: string): number => {
    // Split the string by spaces and filter out empty strings
    const words = inputString.split(/\s+/).filter((word) => word.length > 0);
    return words.length;
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') {
      // Prevent all key presses except for Enter
      e.preventDefault();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      // Allow Enter key for line breaks, prevent default behavior if Shift is not held
      e.preventDefault();
      if (divRef.current) {
        // Insert a line break at the current cursor position
        document.execCommand('insertHTML', false, '<br>');
        const cursorPosition = getCaretIndex(divRef.current);
        updateParagraphs(index-1, cursorPosition);
      }
    }
  };

    const getCaretIndex = (element: HTMLElement) => {
        let position = 0;
        const selection = window.getSelection();
        if (selection && selection.rangeCount !== 0) {
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            position = preCaretRange.toString().length;
        }
        return position;
    };

    useEffect(() => {
        if (divRef.current) {
          divRef.current.innerHTML = formatText(text);
        }
      }, [text]);

      const formatText = (inputText: string): string => {
        const words = inputText.split(/\s+/);
        if (words.length > 200) {
          const normalText = words.slice(0, 200).join(" ");
          const italicText = words.slice(200).join(" ");
          return `${normalText} <span class="italic text-gray-500">${italicText}</span>`;
        }
        return inputText;
      };

  return (
    <div className="flex space-x-2">
      <div className="text-[10px] text-gray-800 text-justify font-inter font-normal leading-5 tracking-tighter custom-letter-spacing">
        {index}
      </div>
      <div
        className={`font-mono text-black text-justify text-xs font-normal leading-5 tracking-wide border p-2 w-full
        ${countWords(text) <= 210 ? '' : 'border-red-500'}`}
      >
        <div ref={divRef} onKeyDown={handleKeyDown} contentEditable></div>
        <br />
        <div className={`w-full flex justify-end ${countWords(text) <= 210 ? 'text-green-500' : 'text-red-500'}`}>
          {countWords(text)} words selected
        </div>
      </div>
    </div>
  );
};
