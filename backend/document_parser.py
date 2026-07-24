"""
文档内容提取模块
支持格式: .txt .docx .xls .xlsx .pptx .pdf
"""
import os
from pathlib import Path

SUPPORTED_EXTENSIONS = {".txt", ".docx", ".xls", ".xlsx", ".pptx", ".pdf"}


# ────────────────────────────────────────────
# 1. TXT
# ────────────────────────────────────────────
def extract_text_from_txt(file_path: str) -> str:
    """直接读取纯文本文件，自动检测编码。"""
    # 尝试 utf-8，失败回退 gbk（常见于中文 Windows）
    for enc in ("utf-8", "gbk", "latin-1"):
        try:
            with open(file_path, "r", encoding=enc) as f:
                return f.read()
        except (UnicodeDecodeError, UnicodeError):
            continue
    raise ValueError(f"无法解码文本文件: {file_path}")


# ────────────────────────────────────────────
# 2. DOCX（复用已有的解析逻辑）
# ────────────────────────────────────────────
def extract_text_from_docx(file_path: str) -> str:
    """从 .docx 文件中提取纯文本（含表格）。"""
    from docx import Document
    from docx.oxml.ns import qn
    from docx.text.paragraph import Paragraph
    from docx.table import Table

    doc = Document(file_path)
    texts = []

    for child in doc.element.body:
        if child.tag == qn("w:p"):
            para = Paragraph(child, doc)
            text = para.text.strip()
            if text:
                texts.append(text)
        elif child.tag == qn("w:tbl"):
            table = Table(child, doc)
            table_lines = []
            for row_idx, row in enumerate(table.rows):
                cells = [cell.text.strip().replace("\n", " ") for cell in row.cells]
                row_text = " | ".join(cells)
                if row_text.strip():
                    table_lines.append(row_text)
                if row_idx == 0 and table_lines:
                    table_lines.append(" | ".join(["---"] * len(cells)))
            if table_lines:
                texts.append("[表格]\n" + "\n".join(table_lines))

    return "\n\n".join(texts)


# ────────────────────────────────────────────
# 3. XLS / XLSX
# ────────────────────────────────────────────
def extract_text_from_excel(file_path: str) -> str:
    """从 Excel 文件中提取所有工作表的文本内容。"""
    ext = Path(file_path).suffix.lower()

    if ext == ".xls":
        # 旧版二进制格式用 xlrd
        import xlrd
        wb = xlrd.open_workbook(file_path)
        sheets_text = []
        for sheet in wb.sheets():
            rows = []
            for row_idx in range(sheet.nrows):
                cells = [str(sheet.cell_value(row_idx, col)).strip()
                         for col in range(sheet.ncols)]
                row_text = " | ".join(cells)
                if row_text.strip(" |"):
                    rows.append(row_text)
            if rows:
                sheets_text.append(f"[工作表: {sheet.name}]\n" + "\n".join(rows))
        return "\n\n".join(sheets_text)
    else:
        # .xlsx 用 openpyxl
        import openpyxl
        wb = openpyxl.load_workbook(file_path, data_only=True)
        sheets_text = []
        for sheet in wb.worksheets:
            rows = []
            for row in sheet.iter_rows(values_only=True):
                cells = [str(c) if c is not None else "" for c in row]
                row_text = " | ".join(cells)
                if row_text.strip(" |"):
                    rows.append(row_text)
            if rows:
                sheets_text.append(f"[工作表: {sheet.title}]\n" + "\n".join(rows))
        return "\n\n".join(sheets_text)


# ────────────────────────────────────────────
# 4. PPTX
# ────────────────────────────────────────────
def extract_text_from_pptx(file_path: str) -> str:
    """从 PowerPoint (.pptx) 文件中提取所有幻灯片的文本。"""
    from pptx import Presentation

    prs = Presentation(file_path)
    slides_text = []
    for i, slide in enumerate(prs.slides, 1):
        texts = []
        for shape in slide.shapes:
            if shape.has_text_frame:
                for para in shape.text_frame.paragraphs:
                    t = para.text.strip()
                    if t:
                        texts.append(t)
            # 表格
            if shape.has_table:
                table = shape.table
                for row in table.rows:
                    cells = [cell.text.strip().replace("\n", " ") for cell in row.cells]
                    row_text = " | ".join(cells)
                    if row_text.strip(" |"):
                        texts.append(row_text)
        if texts:
            slides_text.append(f"[幻灯片 {i}]\n" + "\n".join(texts))
    return "\n\n".join(slides_text)


# ────────────────────────────────────────────
# 5. PDF
# ────────────────────────────────────────────
def extract_text_from_pdf(file_path: str) -> str:
    """从 PDF 文件中提取各页的文本内容。"""
    import fitz  # PyMuPDF

    doc = fitz.open(file_path)
    pages_text = []
    for i, page in enumerate(doc, 1):
        text = page.get_text().strip()
        if text:
            pages_text.append(f"[第 {i} 页]\n{text}")
    doc.close()
    return "\n\n".join(pages_text)


# ────────────────────────────────────────────
# 统一入口
# ────────────────────────────────────────────
_EXTRACTORS = {
    ".txt": extract_text_from_txt,
    ".docx": extract_text_from_docx,
    ".xls": extract_text_from_excel,
    ".xlsx": extract_text_from_excel,
    ".pptx": extract_text_from_pptx,
    ".pdf": extract_text_from_pdf,
}


def extract_document(file_path: str) -> str:
    """
    根据文件后缀自动选择合适的解析器，提取纯文本内容。

    Args:
        file_path: 文件的本地路径

    Returns:
        提取到的纯文本内容

    Raises:
        ValueError: 不支持的文件格式
        Exception: 解析过程中可能出现的其他错误
    """
    ext = Path(file_path).suffix.lower()
    extractor = _EXTRACTORS.get(ext)
    if extractor is None:
        supported = ", ".join(sorted(SUPPORTED_EXTENSIONS))
        raise ValueError(f"不支持的文件格式 '{ext}'，目前支持: {supported}")
    return extractor(file_path)
