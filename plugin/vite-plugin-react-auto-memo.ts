import parser from "@babel/parser";
import type { ParserOptions } from "@babel/parser";
import traverse from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import generate from "@babel/generator";
import type { GeneratorOptions } from "@babel/generator";
import * as t from "@babel/types";
import { createFilter } from "@rollup/pluginutils";
import type { FilterPattern } from "@rollup/pluginutils";

interface ReactAutoMemoOptions {
  include?: FilterPattern;
  exclude?: FilterPattern;
  ignoreComment?: string;
}

const reactAutoMemoPlugin = (options: ReactAutoMemoOptions = {}) => {
  const {
    include = /\.(j|t)sx$/,
    exclude = /node_modules/,
    ignoreComment = "@no-memo",
  } = options;

  const filter = createFilter(include, exclude);

  return {
    name: "vite-plugin-react-auto-memo",

    transform(code: string, id: string) {
      // 1. 过滤文件
      if (!filter(id)) return null;

      // 2. 检查跳过注释
      if (code.includes(ignoreComment)) return null;

      try {
        // 3. 解析 AST
        const parserOptions: ParserOptions = {
          sourceType: "module",
          plugins: ["jsx", "typescript", "classProperties"],
          ranges: true,
          tokens: true,
        };

        const ast = parser.parse(code, parserOptions);

        // 存储状态
        const componentNames: string[] = [];
        let hasMemoImport = false;

        // 4. 遍历 AST
        traverse(ast, {
          ImportDeclaration(path) {
            const source = path.node.source.value;
            if (source === "react") {
              path.node.specifiers.forEach((spec) => {
                if (t.isImportSpecifier(spec)) {
                  const importedName = t.isIdentifier(spec.imported)
                    ? spec.imported.name
                    : spec.imported.value;

                  if (importedName === "memo") {
                    hasMemoImport = true;
                  }
                }
              });
            }
          },

          FunctionDeclaration(path) {
            const node = path.node;
            if (node.id && /^[A-Z]/.test(node.id.name)) {
              if (!isWrappedByMemo(path)) {
                componentNames.push(node.id.name);
                wrapWithMemo(path);
              }
            }
          },

          VariableDeclarator(path) {
            const node = path.node;
            if (
              t.isIdentifier(node.id) &&
              /^[A-Z]/.test(node.id.name) &&
              node.init &&
              (t.isArrowFunctionExpression(node.init) ||
                t.isFunctionExpression(node.init))
            ) {
              if (!isWrappedByMemo(path)) {
                componentNames.push(node.id.name);
                wrapWithMemo(path);
              }
            }
          },
        });

        // 5. 注入 memo 导入
        if (componentNames.length > 0 && !hasMemoImport) {
          injectMemoImport(ast);
        }

        // 6. 生成代码
        const generateOptions: GeneratorOptions = {
          jsescOption: { minimal: true },
          retainLines: true,
          compact: false,
          sourceMaps: true,
        };

        const output = generate(ast, generateOptions, code);

        return {
          code: output.code,
          map: output.map,
        };
      } catch (error) {
        console.error(`[react-auto-memo] Error processing ${id}:`, error);
        return null;
      }
    },
  };

  // 辅助函数：检查是否已被 memo 包裹
  function isWrappedByMemo(
    path: NodePath<t.FunctionDeclaration | t.VariableDeclarator>,
  ): boolean {
    let currentPath: NodePath | null = path;

    for (let i = 0; i < 5 && currentPath; i++) {
      const parentPath: NodePath<t.Node> | null = currentPath.parentPath;
      if (!parentPath) break;

      const parentNode = parentPath.node;

      if (
        t.isCallExpression(parentNode) &&
        t.isIdentifier(parentNode.callee) &&
        parentNode.callee.name === "memo"
      ) {
        return true;
      }

      currentPath = parentPath;
    }

    return false;
  }

  // 辅助函数：包裹 memo
  function wrapWithMemo(
    path: NodePath<t.FunctionDeclaration | t.VariableDeclarator>,
  ): void {
    const node = path.node;
    const memoIdentifier = t.identifier("memo");

    if (t.isFunctionDeclaration(node) && node.id) {
      // 处理函数声明
      const funcExpr = t.functionExpression(
        node.id,
        node.params,
        node.body,
        node.generator,
        node.async,
      );

      const memoCall = t.callExpression(memoIdentifier, [funcExpr]);
      const varDecl = t.variableDeclaration("const", [
        t.variableDeclarator(node.id, memoCall),
      ]);

      path.replaceWith(varDecl);
    } else if (t.isVariableDeclarator(node) && node.init) {
      // 处理变量声明 - 使用类型断言
      const initPath = path.get("init") as NodePath<t.Expression>;
      const memoCall = t.callExpression(memoIdentifier, [node.init]);
      initPath.replaceWith(memoCall);
    }
  }

  // 辅助函数：注入 memo 导入
  function injectMemoImport(ast: t.File): void {
    const importSpecifier = t.importSpecifier(
      t.identifier("memo"),
      t.identifier("memo"),
    );

    const importDeclaration = t.importDeclaration(
      [importSpecifier],
      t.stringLiteral("react"),
    );

    const firstImportIndex = ast.program.body.findIndex((node) =>
      t.isImportDeclaration(node),
    );

    if (firstImportIndex !== -1) {
      ast.program.body.splice(firstImportIndex, 0, importDeclaration);
    } else {
      ast.program.body.unshift(importDeclaration);
    }
  }
};

export default reactAutoMemoPlugin;
