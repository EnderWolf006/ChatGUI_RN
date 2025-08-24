import { useTheme, useThemeMode } from '@rneui/themed';
import React from 'react';
import { Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';

// 简单的语法高亮组件
const SimpleCodeHighlight = ({ code, language, isDark, theme }: {
  code: string;
  language: string;
  isDark: boolean;
  theme: any;
}) => {
  // 语法高亮颜色
  const colors = isDark 
    ? {
        keyword: '#cc99cd',
        string: '#7ec699',
        comment: '#999',
        number: '#f99157',
        function: '#6cc8ff',
        default: '#ddd',
        variable: '#f8c555',
        operator: '#d19a66'
      }
    : {
        keyword: '#a626a4',
        string: '#50a14f',
        comment: '#a0a1a7',
        number: '#986801',
        function: '#4078f2',
        default: '#383a42',
        variable: '#e45649',
        operator: '#0184bc'
      };

  // 语言特定的关键词
  const getKeywords = (lang: string) => {
    const keywordMap: { [key: string]: string[] } = {
      javascript: ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'from', 'as', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'extends', 'static'],
      typescript: ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'from', 'as', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'extends', 'static', 'interface', 'type', 'enum', 'namespace', 'declare', 'abstract', 'implements'],
      python: ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False', 'pass', 'break', 'continue', 'global', 'nonlocal', 'assert', 'del', 'yield'],
      java: ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'if', 'else', 'for', 'while', 'return', 'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super', 'package', 'import', 'abstract', 'synchronized', 'volatile', 'transient', 'native', 'strictfp'],
      swift: ['func', 'var', 'let', 'class', 'struct', 'enum', 'protocol', 'if', 'else', 'for', 'while', 'return', 'import', 'try', 'catch', 'throw', 'throws', 'guard', 'defer', 'self', 'super', 'init', 'deinit', 'subscript', 'extension', 'associatedtype', 'typealias'],
      go: ['func', 'var', 'const', 'type', 'struct', 'interface', 'if', 'else', 'for', 'range', 'return', 'import', 'package', 'go', 'defer', 'chan', 'select', 'case', 'default', 'switch', 'fallthrough', 'break', 'continue', 'goto', 'map'],
      rust: ['fn', 'let', 'mut', 'const', 'struct', 'enum', 'trait', 'impl', 'if', 'else', 'for', 'while', 'loop', 'return', 'use', 'mod', 'pub', 'crate', 'self', 'super', 'unsafe', 'async', 'await', 'match', 'where', 'move', 'ref', 'static', 'extern'],
      dart: ['void', 'int', 'double', 'String', 'bool', 'var', 'final', 'const', 'dynamic', 'class', 'abstract', 'interface', 'mixin', 'extension', 'enum', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'rethrow', 'async', 'await', 'sync', 'yield', 'import', 'export', 'library', 'part', 'show', 'hide', 'as', 'deferred', 'factory', 'get', 'set', 'operator', 'external', 'static', 'override', 'new', 'this', 'super', 'null', 'true', 'false', 'is', 'as', 'required', 'covariant'],
      kotlin: ['fun', 'val', 'var', 'class', 'interface', 'object', 'enum', 'annotation', 'data', 'sealed', 'abstract', 'open', 'final', 'override', 'private', 'protected', 'public', 'internal', 'if', 'else', 'when', 'for', 'while', 'do', 'return', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'import', 'package', 'as', 'typealias', 'this', 'super', 'null', 'true', 'false', 'is', 'as', 'in', 'out', 'reified', 'inline', 'crossinline', 'noinline', 'suspend'],
      csharp: ['using', 'namespace', 'class', 'struct', 'interface', 'enum', 'delegate', 'event', 'public', 'private', 'protected', 'internal', 'static', 'readonly', 'const', 'virtual', 'override', 'abstract', 'sealed', 'partial', 'if', 'else', 'switch', 'case', 'default', 'for', 'foreach', 'while', 'do', 'return', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'base', 'null', 'true', 'false', 'is', 'as', 'typeof', 'sizeof', 'nameof', 'async', 'await', 'yield', 'var', 'dynamic'],
      cpp: ['int', 'float', 'double', 'char', 'bool', 'void', 'auto', 'class', 'struct', 'union', 'enum', 'namespace', 'template', 'typename', 'if', 'else', 'switch', 'case', 'default', 'for', 'while', 'do', 'return', 'break', 'continue', 'try', 'catch', 'throw', 'new', 'delete', 'this', 'public', 'private', 'protected', 'virtual', 'const', 'static', 'extern', 'inline', 'friend', 'operator', 'typedef', 'using', 'nullptr', 'constexpr', 'decltype', 'noexcept'],
      c: ['int', 'float', 'double', 'char', 'void', 'short', 'long', 'signed', 'unsigned', 'struct', 'union', 'enum', 'typedef', 'if', 'else', 'switch', 'case', 'default', 'for', 'while', 'do', 'return', 'break', 'continue', 'goto', 'sizeof', 'const', 'static', 'extern', 'register', 'auto', 'volatile', 'restrict'],
      php: ['<?php', 'class', 'interface', 'trait', 'namespace', 'use', 'function', 'const', 'var', 'public', 'private', 'protected', 'static', 'abstract', 'final', 'if', 'else', 'elseif', 'switch', 'case', 'default', 'for', 'foreach', 'while', 'do', 'return', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'clone', 'instanceof', 'extends', 'implements', 'parent', 'self', 'static', '$this', 'true', 'false', 'null', 'and', 'or', 'xor', 'as', 'array', 'callable', 'iterable', 'bool', 'int', 'float', 'string', 'object'],
      ruby: ['class', 'module', 'def', 'end', 'if', 'unless', 'else', 'elsif', 'case', 'when', 'then', 'for', 'while', 'until', 'do', 'break', 'next', 'redo', 'retry', 'return', 'yield', 'super', 'self', 'nil', 'true', 'false', 'and', 'or', 'not', 'begin', 'rescue', 'ensure', 'raise', 'include', 'extend', 'require', 'load', 'alias', 'undef', 'defined?', 'private', 'protected', 'public', 'attr_reader', 'attr_writer', 'attr_accessor'],
      scala: ['abstract', 'case', 'catch', 'class', 'def', 'do', 'else', 'extends', 'false', 'final', 'finally', 'for', 'forSome', 'if', 'implicit', 'import', 'lazy', 'match', 'new', 'null', 'object', 'override', 'package', 'private', 'protected', 'return', 'sealed', 'super', 'this', 'throw', 'trait', 'try', 'true', 'type', 'val', 'var', 'while', 'with', 'yield'],
      css: ['color', 'background', 'background-color', 'background-image', 'margin', 'padding', 'border', 'width', 'height', 'max-width', 'min-width', 'max-height', 'min-height', 'display', 'position', 'top', 'left', 'right', 'bottom', 'font', 'font-family', 'font-size', 'font-weight', 'text-align', 'line-height', 'z-index', 'opacity', 'visibility', 'overflow', 'float', 'clear', 'flex', 'grid', 'transform', 'transition', 'animation'],
      html: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'li', 'ol', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'form', 'input', 'button', 'select', 'option', 'textarea', 'label', 'section', 'article', 'header', 'footer', 'nav', 'main', 'aside', 'figure', 'figcaption', 'details', 'summary', 'dialog'],
      json: ['true', 'false', 'null'],
      sql: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX', 'DATABASE', 'SCHEMA', 'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT', 'UNIQUE', 'CHECK', 'DEFAULT', 'AUTO_INCREMENT', 'IDENTITY', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'UNION', 'GROUP', 'BY', 'HAVING', 'ORDER', 'ASC', 'DESC', 'LIMIT', 'OFFSET', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX'],
      jsx: ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'from', 'as', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'extends', 'static'],
      tsx: ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'from', 'as', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'extends', 'static', 'interface', 'type', 'enum'],
      bash: ['if', 'then', 'else', 'elif', 'fi', 'case', 'esac', 'for', 'while', 'until', 'do', 'done', 'function', 'return', 'exit', 'break', 'continue', 'local', 'readonly', 'declare', 'export', 'unset', 'shift', 'getopts', 'read', 'echo', 'printf', 'test', 'true', 'false'],
      powershell: ['function', 'param', 'begin', 'process', 'end', 'if', 'else', 'elseif', 'switch', 'for', 'foreach', 'while', 'do', 'until', 'return', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'class', 'enum', 'using', 'namespace', '$true', '$false', '$null'],
      yaml: ['true', 'false', 'null', 'yes', 'no', 'on', 'off'],
      xml: ['<?xml', 'version', 'encoding', 'xmlns', 'xsi', 'schemaLocation'],
      dockerfile: ['FROM', 'RUN', 'CMD', 'LABEL', 'EXPOSE', 'ENV', 'ADD', 'COPY', 'ENTRYPOINT', 'VOLUME', 'USER', 'WORKDIR', 'ARG', 'ONBUILD', 'STOPSIGNAL', 'HEALTHCHECK', 'SHELL']
    };
    return keywordMap[lang.toLowerCase()] || [];
  };

  const keywords = getKeywords(language);
  
  // 更智能的tokenization
  const tokenize = (text: string) => {
    // 保留空白字符的分割
    const tokens: Array<{ text: string; type: string }> = [];
    let current = '';
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let commentType = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];
      
      // 处理字符串
      if (!inComment && (char === '"' || char === "'" || char === '`')) {
        if (!inString) {
          if (current) {
            tokens.push({ text: current, type: 'default' });
            current = '';
          }
          inString = true;
          stringChar = char;
          current = char;
        } else if (char === stringChar) {
          current += char;
          tokens.push({ text: current, type: 'string' });
          current = '';
          inString = false;
          stringChar = '';
        } else {
          current += char;
        }
        continue;
      }
      
      if (inString) {
        current += char;
        continue;
      }
      
      // 处理注释
      if (!inComment && char === '/' && (next === '/' || next === '*')) {
        if (current) {
          tokens.push({ text: current, type: 'default' });
          current = '';
        }
        inComment = true;
        commentType = next === '/' ? 'line' : 'block';
        current = char + next;
        i++; // 跳过下一个字符
        continue;
      }
      
      // 处理 # 注释 (Python, Ruby, Bash, YAML, etc.)
      if (!inComment && char === '#' && (language === 'python' || language === 'ruby' || language === 'bash' || language === 'yaml' || language === 'powershell')) {
        if (current) {
          tokens.push({ text: current, type: 'default' });
          current = '';
        }
        inComment = true;
        commentType = 'line';
        current = char;
        continue;
      }
      
      // 处理 // 注释 (Dart, C#, etc.)
      if (!inComment && char === '/' && next === '/' && (language === 'dart' || language === 'csharp' || language === 'kotlin')) {
        if (current) {
          tokens.push({ text: current, type: 'default' });
          current = '';
        }
        inComment = true;
        commentType = 'line';
        current = char + next;
        i++; // 跳过下一个字符
        continue;
      }
      
      // 处理 <!-- --> 注释 (HTML, XML)
      if (!inComment && char === '<' && text.substr(i, 4) === '<!--' && (language === 'html' || language === 'xml')) {
        if (current) {
          tokens.push({ text: current, type: 'default' });
          current = '';
        }
        inComment = true;
        commentType = 'html';
        current = text.substr(i, 4);
        i += 3; // 跳过 '!--'
        continue;
      }
      
      if (inComment) {
        current += char;
        if ((commentType === 'line' && char === '\n') || 
            (commentType === 'block' && char === '/' && text[i-1] === '*') ||
            (commentType === 'html' && char === '>' && text.substr(i-2, 3) === '-->')) {
          tokens.push({ text: current, type: 'comment' });
          current = '';
          inComment = false;
          commentType = '';
        }
        continue;
      }
      
      // 处理普通字符
      if (/[\s\(\)\[\]{};,\.\+\-\*\/=<>!&|]/.test(char)) {
        if (current) {
          tokens.push({ text: current, type: 'default' });
          current = '';
        }
        if (char.trim()) {
          tokens.push({ text: char, type: 'operator' });
        } else {
          tokens.push({ text: char, type: 'whitespace' });
        }
      } else {
        current += char;
      }
    }
    
    if (current) {
      tokens.push({ 
        text: current, 
        type: inString ? 'string' : inComment ? 'comment' : 'default' 
      });
    }
    
    return tokens;
  };

  const getTokenColor = (token: { text: string; type: string }) => {
    if (token.type === 'string') return colors.string;
    if (token.type === 'comment') return colors.comment;
    if (token.type === 'whitespace') return colors.default;
    if (token.type === 'operator') return colors.operator;
    
    const text = token.text.trim();
    
    // 关键词
    if (keywords.includes(text)) return colors.keyword;
    
    // 数字
    if (/^\d+(\.\d+)?$/.test(text)) return colors.number;
    
    // 函数调用 (followed by parenthesis)
    if (/^[a-zA-Z_]\w*$/.test(text)) {
      // 这是一个标识符，可以是函数或变量
      return colors.variable;
    }
    
    return colors.default;
  };

  const tokens = tokenize(code);

  return (
    <Text style={{ fontSize: 13, lineHeight: 18, fontFamily: 'Courier' }} selectable>
      {tokens.map((token, index) => (
        <Text
          key={index}
          style={{ color: getTokenColor(token) }}
        >
          {token.text}
        </Text>
      ))}
    </Text>
  );
};

interface MarkdownRendererProps {
  children: string;
  style?: any;
}

export function MarkdownRenderer({ children, style }: MarkdownRendererProps) {
  const { theme } = useTheme();
  const { mode } = useThemeMode();
  
  const isDarkMode = mode === 'dark';
  
  const markdownStyles = {
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.black,
      fontFamily: 'System',
      margin: 0,
      padding: 0,
    },
    heading1: {
      fontSize: 24,
      fontWeight: '700' as const,
      color: theme.colors.black,
      marginTop: 16,
      marginBottom: 12,
      lineHeight: 32,
    },
    heading2: {
      fontSize: 22,
      fontWeight: '600' as const,
      color: theme.colors.black,
      marginTop: 14,
      marginBottom: 10,
      lineHeight: 30,
    },
    heading3: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: theme.colors.black,
      marginTop: 12,
      marginBottom: 8,
      lineHeight: 28,
    },
    heading4: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: theme.colors.black,
      marginTop: 12,
      marginBottom: 6,
      lineHeight: 26,
    },
    heading5: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: theme.colors.black,
      marginTop: 10,
      marginBottom: 6,
      lineHeight: 24,
    },
    heading6: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: theme.colors.black,
      marginTop: 8,
      marginBottom: 4,
      lineHeight: 22,
    },
    paragraph: {
      marginBottom: 12,
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.black,
    },
    strong: {
      fontWeight: '700' as const,
      color: theme.colors.black,
    },
    em: {
      fontStyle: 'italic' as const,
      color: theme.colors.black,
    },
    link: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: theme.colors.primary,
      paddingVertical: 4,
      lineHeight: 26,
    },
    blockquote: {
      backgroundColor: isDarkMode ? theme.colors.grey0 : theme.colors.grey0,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginVertical: 12,
      borderRadius: 4,
    },
    list_item: {
      marginBottom: 6,
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.black,
    },
    bullet_list: {
      marginBottom: 12,
    },
    ordered_list: {
      marginBottom: 12,
    },
    code_inline: {
      backgroundColor: 'transparent',
      color: theme.colors.grey4,
      fontSize: 14,
      fontFamily: 'Courier',
      marginHorizontal: 2,
      paddingVertical: 0,
      borderRadius: 0,
    },
    fence: {
      backgroundColor: isDarkMode ? theme.colors.grey0 : theme.colors.grey0,
      borderRadius: 6,
      padding: 12,
      marginVertical: 12,
      overflow: 'hidden',
    },
    code_block: {
      backgroundColor: isDarkMode ? theme.colors.grey0 : theme.colors.grey0,
      borderRadius: 6,
      padding: 12,
      marginVertical: 12,
      fontSize: 14,
      fontFamily: 'Courier',
      color: theme.colors.black,
      lineHeight: 20,
    },
    table: {
      borderWidth: 1,
      borderColor: theme.colors.grey1,
      borderRadius: 6,
      marginVertical: 12,
      overflow: 'hidden',
    },
    thead: {
      backgroundColor: isDarkMode ? theme.colors.grey0 : theme.colors.grey0,
    },
    tbody: {},
    th: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRightWidth: 1,
      borderRightColor: theme.colors.grey1,
      fontSize: 14,
      fontWeight: '600' as const,
      color: theme.colors.black,
    },
    td: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRightWidth: 1,
      borderRightColor: theme.colors.grey1,
      fontSize: 14,
      color: theme.colors.black,
    },
    tr: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.grey1,
    },
    hr: {
      backgroundColor: theme.colors.grey1,
      height: 1,
      marginVertical: 16,
      borderWidth: 0,
    },
  };

  const rules = {
    fence: (node: any, children: any, parent: any, styles: any) => {
      const language = node.sourceInfo || 'text';
      const code = node.content || '';
      
      return (
        <View
          key={node.key}
          style={{
            backgroundColor: isDarkMode ? theme.colors.grey0 : theme.colors.grey0,
            borderRadius: 6,
            padding: 12,
            marginVertical: 12,
          }}
        >
          {language && language !== 'text' && (
            <Text 
              style={{
                fontSize: 12,
                color: theme.colors.grey3,
                marginBottom: 8,
                fontWeight: '600' as const,
              }}
              selectable
            >
              {language}
            </Text>
          )}
          <SimpleCodeHighlight 
            code={code}
            language={language}
            isDark={isDarkMode}
            theme={theme}
          />
        </View>
      );
    },
    code_block: (node: any, children: any, parent: any, styles: any) => {
      const code = node.content || '';
      
      return (
        <View
          key={node.key}
          style={{
            backgroundColor: isDarkMode ? theme.colors.grey0 : theme.colors.grey0,
            borderRadius: 6,
            padding: 12,
            marginVertical: 12,
          }}
        >
          <SimpleCodeHighlight 
            code={code}
            language="text"
            isDark={isDarkMode}
            theme={theme}
          />
        </View>
      );
    },
    paragraph: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          key={node.key} 
          style={markdownStyles.paragraph}
          selectable
        >
          {children}
        </Text>
      );
    },
    heading1: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          key={node.key} 
          style={markdownStyles.heading1}
          selectable
        >
          {children}
        </Text>
      );
    },
    heading2: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          key={node.key} 
          style={markdownStyles.heading2}
          selectable
        >
          {children}
        </Text>
      );
    },
    heading3: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          key={node.key} 
          style={markdownStyles.heading3}
          selectable
        >
          {children}
        </Text>
      );
    },
    heading4: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          key={node.key} 
          style={markdownStyles.heading4}
          selectable
        >
          {children}
        </Text>
      );
    },
    heading5: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          key={node.key} 
          style={markdownStyles.heading5}
          selectable
        >
          {children}
        </Text>
      );
    },
    heading6: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          key={node.key} 
          style={markdownStyles.heading6}
          selectable
        >
          {children}
        </Text>
      );
    },
    blockquote: (node: any, children: any, parent: any, styles: any) => {
      return (
        <View 
          key={node.key} 
          style={markdownStyles.blockquote}
        >
          <Text selectable>{children}</Text>
        </View>
      );
    },
    list_item: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          key={node.key} 
          style={markdownStyles.list_item}
          selectable
        >
          {children}
        </Text>
      );
    },
    text: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text selectable>
          {node.content}
        </Text>
      );
    },
    strong: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          style={markdownStyles.strong}
          selectable
        >
          {children}
        </Text>
      );
    },
    em: (node: any, children: any, parent: any, styles: any) => {
      return (
        <Text 
          style={markdownStyles.em}
          selectable
        >
          {children}
        </Text>
      );
    },
  };

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <Markdown
        style={markdownStyles as any}
        rules={rules}
      >
        {children}
      </Markdown>
    </View>
  );
}
