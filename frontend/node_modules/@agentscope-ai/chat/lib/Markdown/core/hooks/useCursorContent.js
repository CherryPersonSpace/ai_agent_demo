import { useMemo } from "react";
export default function useCursorContent(props) {
  var cursor = props.cursor,
    content = props.content,
    animation = props.animation;
  var cursorContent = useMemo(function () {
    if (animation) return '';
    if (cursor) {
      if (cursor === 'dot') return ' :dot:';
      if (cursor === 'underline') return ' :underline:';
      return ' :dot:';
    }
    return '';
  }, [cursor, content]);
  return content + cursorContent;
}