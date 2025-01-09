import { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

const defaultCode = `// Pine Script Example
//@version=5
indicator("My Custom Indicator", overlay=true)

// Input parameters
length = input(14, "RSI Length")
overbought = input(70, "Overbought Level")
oversold = input(30, "Oversold Level")

// Calculate RSI
rsi = ta.rsi(close, length)

// Plot
plot(rsi, "RSI", color=color.blue)
hline(overbought, "Overbought", color=color.red)
hline(oversold, "Oversold", color=color.green)

// Generate signals
buySignal = ta.crossover(rsi, oversold)
sellSignal = ta.crossunder(rsi, overbought)

plotshape(buySignal, "Buy", shape.triangleup, location.belowbar, color.green)
plotshape(sellSignal, "Sell", shape.triangledown, location.abovebar, color.red)`;

const pineLanguageConfig = {
  keywords: [
    'indicator', 'strategy', 'library',
    'study', 'plot', 'plotshape',
    'if', 'else', 'for', 'to',
    'var', 'varip', 'input',
    'true', 'false', 'na',
    'color', 'line', 'label',
    'crossover', 'crossunder',
  ],
  operators: [
    '=', '==', '!=', '>', '<',
    '>=', '<=', '+', '-', '*',
    '/', 'and', 'or', 'not',
  ],
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
};

export function PineEditor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Register Pine Script language
    monaco.languages.register({ id: 'pine' });

    // Configure syntax highlighting
    monaco.languages.setMonarchTokensProvider('pine', {
      keywords: pineLanguageConfig.keywords,
      operators: pineLanguageConfig.operators,
      symbols: pineLanguageConfig.symbols,

      tokenizer: {
        root: [
          [/\/\/.*$/, 'comment'],
          [/[a-zA-Z_]\w*/, {
            cases: {
              '@keywords': 'keyword',
              '@default': 'variable',
            },
          }],
          [/[0-9]+/, 'number'],
          [/".*?"/, 'string'],
          [/@symbols/, {
            cases: {
              '@operators': 'operator',
              '@default': 'symbol',
            },
          }],
        ],
      },
    });

    // Configure editor theme
    monaco.editor.defineTheme('pineTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'operator', foreground: 'D4D4D4' },
      ],
      colors: {
        'editor.background': '#1E1E1E',
      },
    });
  };

  return (
    <div className="h-screen bg-gray-900 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">Pine Script Editor</h1>
        <button
          onClick={() => {/* Add compile/run functionality */}}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Run Script
        </button>
      </div>
      <Editor
        height="calc(100vh - 80px)"
        defaultLanguage="pine"
        defaultValue={defaultCode}
        theme="pineTheme"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}