export { default as CitationComponent } from "./CitationComponent";
export function citationsExtension(citationsData) {
  return {
    name: 'citation',
    level: 'inline',
    tokenizer: function tokenizer(src) {
      // 使用负向前瞻确保不匹配 markdown 链接语法 [text](url)
      var match = src.match(/^\[([^\]]+)\](?!\()/);
      if (match) {
        var content = match[0].trim();
        var text = content === null || content === void 0 ? void 0 : content.replace(/^\[([^\]]+)\]/g, '$1');
        if (citationsData[text]) {
          return {
            type: 'citation',
            raw: content,
            text: content === null || content === void 0 ? void 0 : content.replace(/^\[([^\]]+)\]/g, '$1'),
            renderType: 'component'
          };
        }
      }
    },
    renderer: function renderer(token) {
      if (citationsData && Object.keys(citationsData).length === 0) return null;
      var text = token.text;
      var citation = citationsData === null || citationsData === void 0 ? void 0 : citationsData[text];
      if (!citation) return token.raw;
      return "<citation data-text=\"".concat(text, "\" data-url=\"").concat(citation.url, "\" data-title=\"").concat(citation.title, "\" data-content=\"").concat(citation.content, "\"></citation>");
    }
  };
}